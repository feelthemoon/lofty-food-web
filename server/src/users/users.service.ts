import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as jwt from 'jsonwebtoken';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private users: typeof User) {}

  decodeJWT(token) {
    return jwt.decode(token);
  }
}
