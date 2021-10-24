FROM node:16-alpine

WORKDIR /home/node/papagei-api/

COPY . .
VOLUME /home/node/papagei-api/dist

EXPOSE 8080

RUN apk update
RUN yarn install

USER node

CMD [ "npx", "pm2-runtime", "start", "dist/app.js" ]
