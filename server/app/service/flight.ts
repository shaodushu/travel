
import { Flight, IFlight } from "../models/flight.ts";

export class FlightService{
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