import { Database, MySQLConnector } from "https://deno.land/x/denodb@v1.0.39/mod.ts";
import { Flight } from "../app/models/flight.ts";

export class DatabaseController {
    client!: Database;
    constructor() {
        const connector = new MySQLConnector({
            database: 'travel',
            host: '127.0.0.1',
            username: 'debian-sys-maint',
            password: 'sgVTWwD9IPhgUJQn',
            port: 3306, // optional
        });
        const db = new Database(connector);
        this.client = db
    }
    init() {
        this.client.link([Flight]);
        return this.client.sync({ drop: true });
    }
}