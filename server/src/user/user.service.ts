import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
    constructor() {}
    decodeJWT(token) {
        return jwt.decode(token);
    }
}
