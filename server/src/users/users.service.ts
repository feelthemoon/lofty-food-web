import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as jwt from 'jsonwebtoken';

import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private users: typeof User) {}

  decodeJWT(token) {
    return jwt.decode(token, {
      json: true,
    });
  }
  async find(id: number) {
    return await this.users.findOne({ where: { id } });
  }
  async create(token) {
    const decodedToken = this.decodeJWT(token);
    const user = await this.users.findOne({
      where: {
        slack_id: decodedToken['https://slack.com/user_id'],
      },
    });
    if (!user) {
      return await this.users.create({
        slack_id: decodedToken['https://slack.com/user_id'],
        email: decodedToken.email,
        name: decodedToken.name,
      });
    }
    return user;
  }
}
