import {
    Application, etag,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import DBInit from "./config/config.dev.ts";
import router from './app/router.ts'
import Middleware from "./app/middleware/index.ts";

// 获取环境变量
const env = Deno.env.toObject();
const PORT = env.PORT || 3000;
const HOST = env.HOST || '0.0.0.0';

const app = new Application();

await DBInit()

app.use(etag.factory());

app.use(Middleware.logger);
app.use(Middleware.timing);
app.use(Middleware.error);


app.use(router.routes());
app.use(router.allowedMethods());

console.log(`🚀 Deno start ${HOST}:${PORT}!`);
await app.listen(`${HOST}:${PORT}`);