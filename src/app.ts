import Koa from 'koa';

const app = new Koa();

app.use(async (ctx:Koa.Context) => {
  ctx.body = 'Hello World';
});

app.listen(80);
