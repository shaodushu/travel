import { Router } from "https://deno.land/x/oak@v9.0.0/router.ts";

export interface Controller<T> {
    getOne?(id: string): Promise<T>;
    getAll?(): Promise<T[]>;
    update?(id: string, values: T): Promise<T>;
    delete?(id: string): Promise<void>;
    create?(values: T): Router;
}