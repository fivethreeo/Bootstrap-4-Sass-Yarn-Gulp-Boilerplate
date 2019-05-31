FROM node:8-alpine as base
# Creating working directory
RUN mkdir /code
WORKDIR /code

COPY . /code/

RUN apk add --no-cache --virtual .build-deps \
    build-base gcc linux-headers musl-dev \
    libpng-dev libpng-utils \
    jpeg-dev libjpeg-turbo-utils zlib-dev \
    && yarn global add gulp \
    && yarn install \
    && cp yarn.lock yarn_run.lock \
    && ln -sf /usr/bin/jpegtran /code/node_modules/imagemin-jpegtran/node_modules/jpegtran-bin/vendor/jpegtran \
    && cp -R node_modules node_modules_run \
    && yarn install --dev \
    && runDeps="$( \
        scanelf --needed --nobanner --recursive /usr/local \
                | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
                | sort -u \
                | xargs -r apk info --installed \
                | sort -u \
    )" \
    && apk add --virtual .rundeps $runDeps

# Uncomment after creating your docker-entrypoint.sh
# ENTRYPOINT ["/code/docker-entrypoint.sh"]

FROM base as dev

RUN rm -rf node_modules_run && rm yarn_run.lock

# Start server 
CMD ["gulp", "serve"]

FROM base as build

RUN gulp \
    && rm -rf node_modules \
    && rm yarn.lock \
    && mv node_modules_run node_modules \
    && mv yarn_run.lock yarn.lock \
    && apk del .build-deps

FROM nginx:stable-alpine as prod

COPY --from=build /code/public/ /usr/share/nginx/html
