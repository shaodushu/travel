import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";

export default async (ctx: Context, next: () => Promise<unknown>) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
}