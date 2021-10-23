import { Database, MySQLConnector } from "https://deno.land/x/denodb@v1.0.39/mod.ts";
import { Flight, User } from "../app/models/index.ts";

export default async () => {
    const connector = new MySQLConnector({
        database: 'travel',
        host: '127.0.0.1',
        username: 'debian-sys-maint',
        password: 'sgVTWwD9IPhgUJQn',
        port: 3306, // optional
    });
    const db = new Database(connector);
    db.link([Flight, User]);
    await db.sync({ drop: true });
}