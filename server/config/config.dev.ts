import { Database, MySQLConnector, MySQLOptions } from "https://deno.land/x/denodb@v1.0.39/mod.ts";

const connector = new MySQLConnector(JSON.parse((Deno.env.get("DATABASE") || {}).toString()) as MySQLOptions);
export const database = new Database({
    connector,
    debug: (Deno.env.get("DATABASE_DEBUG") as unknown as boolean) || false
});