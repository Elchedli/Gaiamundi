FROM node:16-alpine as common-build-stage

WORKDIR /app

COPY . .

ENV PATH /app/node_modules/.bin:$PATH

RUN apk update

ARG NODE_ENV=production
ARG REACT_APP_API_URL
ARG REACT_APP_PUBLIC_URL

ENV NODE_ENV=${NODE_ENV}
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_PUBLIC_URL=${REACT_APP_PUBLIC_URL}

RUN yarn install

FROM common-build-stage as development-build-stage

CMD ["yarn", "start"]

FROM common-build-stage as production-build-stage

RUN DISABLE_ESLINT_PLUGIN=true yarn build
RUN yarn global add serve
CMD serve -s build