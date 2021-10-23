
import { Status } from "https://deno.land/std@0.105.0/http/http_status.ts";
import { RouteParams, RouterContext } from "https://deno.land/x/oak@v9.0.0/router.ts";
import { BadRequest, NotFound } from "../extend/helper.ts";
import { FlightService } from "../service/flight.ts";

const service = new FlightService();

type ControllerType = RouterContext<RouteParams, Record<string, any>>

export class FlightController {
    async create(ctx: ControllerType) {
        if (!ctx.request.hasBody) {
            return BadRequest(ctx);
        }
        const { value } = await ctx.request.body();
        const body = await service.create(await value)
        ctx.response.status = Status.Accepted;
        ctx.response.body = body
    }
    async getOne(ctx: ControllerType) {
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
    async getAll(ctx: ControllerType) {
        const res = await service.getAll()
        ctx.response.status = Status.OK;
        ctx.response.body = res
    }
}