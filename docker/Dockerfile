# to make the container : docker build -t api-container -f Dockerfile .

FROM node:16

ENV PROJECT_ROOT=/monorepo/

COPY ./ ./monorepo

WORKDIR /monorepo

RUN yarn add lerna && yarn setup
