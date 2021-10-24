import {
    Router,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { database } from "../config/config.dev.ts";
import controller from "./controller/index.ts";
import Middleware from "./middleware/index.ts";

// 构建一个 oak 应用
const router = new Router();
const authRouter = new Router();

router.get("/dbinit", async () => {
    // 模型同步到数据库并初始化
    await database.sync({ drop: true });
})
router.post("/login", controller.user.login)

authRouter.post("/flight", controller.flight.create);
authRouter.get("/flight/:id", controller.flight.getOne);
authRouter.get("/flight", controller.flight.getAll);

authRouter.get("/users", controller.user.getAll);
authRouter.get("/user/:id", controller.user.getOne);
router.post("/user", controller.user.create);


router.use(Middleware.jwtAuth, authRouter.routes(), authRouter.allowedMethods())

export default router