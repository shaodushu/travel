import { Context, Status } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { verify } from "https://deno.land/x/djwt@v2.4/mod.ts";

const secretKey = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"],
  );

/**
 * Create a default configuration
 */
export const JwtConfig = {
    header: "Authorization",
    schema: "Bearer",
    secretKey,
    expirationTime: 60000,
    type: "JWT",
    alg: "HS256",
};

export async function jwtAuth(
    ctx: Context,
    next: () => Promise<unknown>
) {
    // Get the token from the request
    const token = ctx.request.headers
        .get(JwtConfig.header)
        ?.replace(`${JwtConfig.schema} `, "");

    // reject request if token was not provide
    if (!token) {
        ctx.response.status = Status.Unauthorized;
        ctx.response.body = { message: "Unauthorized" };
        return;
    }

    // check the validity of the token
    if (
        !(await verify(token, JwtConfig.secretKey))
    ) {
        ctx.response.status = Status.Unauthorized;
        ctx.response.body = { message: "Wrong Token" };
        return;
    }

    // JWT is correct, so continue and call the private route
    next();
}