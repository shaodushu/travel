import { Context, Status } from "https://deno.land/x/oak@v9.0.0/mod.ts";

export default async (ctx: Context, next: () => Promise<unknown>) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.status || Status.InternalServerError;
        ctx.response.body = { msg: err.message };
    }
}