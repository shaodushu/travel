import {
    Application,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { DatabaseController } from "./config/config.dev.ts";
import router from './app/router.ts'
import { logger } from "./app/middleware/logger.ts";

// 获取环境变量
const env = Deno.env.toObject();
const PORT = env.PORT || 3000;
const HOST = env.HOST || '0.0.0.0';

const app = new Application();
// Logger
app.use(logger);

await new DatabaseController().init();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`🚀 Deno start ${HOST}:${PORT}!`);
await app.listen(`${HOST}:${PORT}`);