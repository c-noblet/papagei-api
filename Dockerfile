FROM node:16-alpine

WORKDIR /home/node/papagei-api/

COPY . .

EXPOSE 8080

RUN apk update
RUN yarn install

ENTRYPOINT yarn run start
