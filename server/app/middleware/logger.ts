import { Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";

export default async (ctx: Context, next: () => Promise<unknown>) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
}