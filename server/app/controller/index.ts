import { FlightController } from "./flight.ts";
import { UserController } from "./user.ts";

const flightController = new FlightController();
const userController = new UserController();

const controller = {
    flight: flightController,
    user: userController
}

export default controller