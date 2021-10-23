
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { User, IUser } from "../models/user.ts";

export class UserService {
    async create(values: IUser) {
        const password = await User.hashPassword(values.password);
        const user = {
            ...values,
            password,
        };
        await User.create(user);
        return values
    }
    getOne(id: string) {
        return User.find(id)
    }
    getAll() {
        return User.all();
    }
    async login(phone: string, password: string) {
        const user = await User.where("phone", phone).first();
        if (!user || !(await bcrypt.compare(password, user.password as string))) {
            return false;
        }

        return User.generateJwt(user.id as string);
    }
}