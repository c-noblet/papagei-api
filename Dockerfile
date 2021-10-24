FROM node:16-alpine

WORKDIR /home/node/papagei-api/

COPY . .

EXPOSE 80

RUN apk update
RUN yarn install
RUN yarn run build

ENTRYPOINT yarn run start
