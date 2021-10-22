
import { Status } from "https://deno.land/std@0.105.0/http/http_status.ts";
import { Context } from "https://deno.land/x/oak@v9.0.0/context.ts";
import { RouteParams, RouterContext } from "https://deno.land/x/oak@v9.0.0/router.ts";
import { BadRequest, NotFound } from "../extend/helper.ts";
import { FlightService } from "../service/flight.ts";

const service = new FlightService();

export class FlightController {
    async create(ctx: RouterContext<RouteParams, Record<string, any>>) {
        if (!ctx.request.hasBody) {
            return BadRequest(ctx);
        }
        const { value } = await ctx.request.body();
        const res = await service.create(value)
        ctx.response.status = Status.Accepted;
        ctx.response.body = res
    }
    async getOne(ctx: RouterContext<RouteParams, Record<string, any>>) {
        if (!ctx.params.id) {
            return BadRequest(ctx)
        }
        const flight = await service.getOne(ctx.params.id)

        if (flight) {
            ctx.response.status = Status.OK;
            ctx.response.body = flight;
            return
        }
        return NotFound(ctx)
    }
    async getAll(ctx: Context) {
        const res = await service.getAll()
        ctx.response.status = Status.OK;
        ctx.response.body = res
    }
}