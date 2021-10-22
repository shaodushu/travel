import { Context, Status } from "https://deno.land/x/oak@v9.0.0/mod.ts";

export function BadRequest(ctx: Context<any>) {
    ctx.response.status = Status.BadRequest;
    ctx.response.body = { message: "Wrong params" };
    return;
}

export function NotFound(ctx: Context<any>) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { message: "Not found" };
    return;
}