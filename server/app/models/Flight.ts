import { DataTypes, Model } from "https://deno.land/x/denodb@v1.0.39/mod.ts";

/** 航班 */
export interface IFlight {
    id: number;
    /** 启程 */
    departure: string;
    /** 目的地 */
    destination: string;
    /** 飞行时长 */
    flightDuration: number;
}

export class Flight extends Model {
    static table = 'flights';
    static timestamps = true;

    static fields = {
        id: { primaryKey: true, autoIncrement: true },
        departure: DataTypes.STRING,
        destination: DataTypes.STRING,
        flightDuration: DataTypes.FLOAT,
    };

    static defaults = {
        flightDuration: 2.5,
    };
}