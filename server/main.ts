import {
    Application, etag,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import "https://deno.land/x/dotenv@v3.0.0/load.ts";
import DBInit from "./config/config.dev.ts";
import router from './app/router.ts'
import Middleware from "./app/middleware/index.ts";

// 获取环境变量
const server = (JSON.parse((Deno.env.get("SERVER") || {}).toString())) as { [index: string]: string };;
const HOST = server.host;
const PORT = server.port;

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