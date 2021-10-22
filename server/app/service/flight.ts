
import { Flight, IFlight } from "../models/Flight.ts";
import { BaseService } from "./base.ts";

// [
//     {
//         departure: 'Paris',
//         destination: 'Tokyo',
//     },
//     {
//         departure: 'London',
//         destination: 'San Francisco',
//     },
// ]
export class FlightService implements BaseService<IFlight>{
    create(values: IFlight[]) {
        return Flight.create(values);
    }
    getOne(id: number) {
        return Flight.find(id)
    }
    getAll() {
        return Flight.all();
    }
}