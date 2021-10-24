git pull
yarn run build
yarn run test
docker exec papagei-api npx pm2 reload all
