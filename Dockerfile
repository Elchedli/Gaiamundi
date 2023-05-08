FROM node:16-ubuntu

WORKDIR /packages

npm install yarn

RUN yarn setup

EXPOSE 3000,1337

CMD ["yarn",'start:api']