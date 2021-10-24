
import { database } from "../../config/config.dev.ts";
import { Flight, IFlight } from "../models/flight.ts";

export class FlightService {
    constructor() {
        database.link([Flight])
    }
    create(values: IFlight[]) {
        return Flight.create(values as any);
    }
    getOne(id: string) {
        return Flight.find(id)
    }
    getAll() {
        return Flight.all();
    }
}