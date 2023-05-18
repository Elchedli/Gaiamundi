FROM node:16
WORKDIR /app
COPY . .
RUN apt-get update && yarn install
ENV NODE_ENV production
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start"]
# docker build -t image-gaiamundi-web .