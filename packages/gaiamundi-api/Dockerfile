FROM node:16-alpine as common-build-stage

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1

ARG NODE_ENV=production
ARG STRAPI_URL
ARG STRAPI_ADMIN_URL

ENV NODE_ENV=${NODE_ENV}
ENV STRAPI_URL=${STRAPI_URL}
ENV STRAPI_ADMIN_URL=${STRAPI_ADMIN_URL}

WORKDIR /app/

COPY ./package.json ./yarn.lock ./

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn config set network-timeout 600000 -g && yarn install --production

COPY ./ .

RUN yarn build

EXPOSE 1337

FROM common-build-stage as development-build-stage

CMD ["yarn", "develop"]

FROM common-build-stage as production-build-stage

CMD ["yarn", "start"]

# docker build --target development-build-stage --build-arg NODE_ENV=development -t gaiamundi-api -f Dockerfile .

