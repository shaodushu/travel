import {
    Router, Status,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import controller from "./controller/index.ts";

// 构建一个 oak 应用
const router = new Router();

router.post("/flight", controller.flight.create);
router.get("/flight/:id", controller.flight.getOne);
router.get("/flight", controller.flight.getAll);

export default router