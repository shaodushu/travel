
import { Status } from "https://deno.land/std@0.105.0/http/http_status.ts";
import { RouterContext } from "https://deno.land/x/oak@v9.0.0/router.ts";
import { BadRequest, NotFound } from "../extend/helper.ts";
import { IUser } from "../models/user.ts";
import { UserService } from "../service/user.ts";

const service = new UserService();

export class UserController {
    async create(ctx: RouterContext) {
        if (!ctx.request.hasBody) {
            return BadRequest(ctx);
        }
        const { value } = await ctx.request.body();
        const user = await service.create(await value)
        if (user) {
            ctx.response.status = Status.Accepted;
            ctx.response.body = user;
            return;
        }
        return NotFound(ctx)
    }
    async getOne(ctx: RouterContext) {
        if (!ctx.params.id) {
            return BadRequest(ctx)
        }
        const user = await service.getOne(ctx.params.id)

        if (user) {
            ctx.response.status = Status.OK;
            ctx.response.body = {
                msg: 'account create ok'
            };
            return
        }
        return NotFound(ctx)
    }
    async getAll(ctx: RouterContext) {
        const users = await service.getAll()
        if (users) {
            ctx.response.status = Status.OK;
            ctx.response.body = users
        } else {
            ctx.response.status = Status.NotFound;
            ctx.response.body = []
        }

    }
    async login(ctx: RouterContext) {
        if (!ctx.request.hasBody) {
            return BadRequest(ctx);
        }
        const value: IUser = await ctx.request.body().value;
        const jwt = await service.login(value.phone, value.password);
        if (!jwt) {
            return BadRequest(ctx);
        }

        ctx.response.status = Status.OK;
        ctx.response.body = { jwt };
    }
}