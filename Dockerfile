FROM node:16-alpine

WORKDIR /home/node/papagei-api/

COPY . .

EXPOSE 8080

RUN apk update
RUN apk add ffmpeg
RUN yarn install
RUN yarn run build

USER node

CMD yarn run start
