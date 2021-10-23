import { DataTypes, Model } from "https://deno.land/x/denodb@v1.0.39/mod.ts";
import { nanoid } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { JwtConfig } from "../middleware/jwt.ts";
import { getNumericDate, Payload, create, Header } from "https://deno.land/x/djwt@v2.4/mod.ts";

/** 用户 */
export interface IUser {
    id: string;
    /** 姓名 */
    name: string;
    /** 手机号 */
    phone: string;
    /** 密码 */
    password: string;
    /** 角色 */
    role: 'ADMIN' | 'USER'
}

/** 用户 */
export class User extends Model {
    static table = 'users';
    static timestamps = true;

    static fields = {
        id: { primaryKey: true, type: DataTypes.STRING },
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.enum(['ADMIN', 'USER'])
    };

    static defaults = {
        id: nanoid(),
        role: 'USER'
    };

    static generateJwt(id: string) {
        // Create the payload with the expiration date (token have an expiry date) and the id of current user (you can add that you want)
        const payload: Payload = {
            id,
            exp: getNumericDate(new Date().getTime() + JwtConfig.expirationTime),
        };
        const header: Header = {
            alg: JwtConfig.alg as Header["alg"],
            typ: JwtConfig.type,
        };
        return create(header, payload, JwtConfig.secretKey);
    }

    static async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(8);
        return bcrypt.hash(password, salt);
    }
}