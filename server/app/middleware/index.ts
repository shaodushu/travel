import logger from "./logger.ts";
import error from "./error.ts";
import { jwtAuth } from "./jwt.ts";
import timing from "./timing.ts";

const Middleware = {
    logger,
    error,
    jwtAuth,
    timing
}

export default Middleware