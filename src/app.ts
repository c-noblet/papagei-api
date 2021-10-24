import Koa from 'koa';

const app = new Koa();

app.use(async (ctx:Koa.Context) => {
  ctx.body = 'Hello World';
});

console.log('Listen on port 8083');

app.listen(8083);
