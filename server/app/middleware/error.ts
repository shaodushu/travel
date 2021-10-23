import { Context, Status } from "https://deno.land/x/oak@v9.0.0/mod.ts";

class _ErrorHandler extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export default async (ctx: Context, next: () => Promise<unknown>) => {
    try {
        await next();
    } catch (err) {
        const error = err as _ErrorHandler;
        ctx.response.status = error.status || Status.InternalServerError;
        ctx.response.body = error.message;
    }
}