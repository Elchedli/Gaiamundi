FROM node:16-alpine
WORKDIR /app
COPY . .
RUN apk update && yarn install
ENV NODE_ENV production
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "develop"]
# docker build -t image-gaiamundi-web .