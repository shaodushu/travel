import { Database, MySQLConnector, MySQLOptions } from "https://deno.land/x/denodb@v1.0.39/mod.ts";
import { Flight, User } from "../app/models/index.ts";

export default async () => {
    const connector = new MySQLConnector(JSON.parse((Deno.env.get("DATABASE") || {}).toString()) as MySQLOptions);
    const db = new Database(connector);
    db.link([Flight, User]);
    await db.sync({ drop: true });
}