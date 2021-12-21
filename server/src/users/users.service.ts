import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import {OrdersService} from "../orders/orders.service";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private users: typeof User, private readonly orderService: OrdersService) {}

  decodeJWT(token) {
    return jwt.decode(token, {
      json: true,
    });
  }

  async create(token) {
    const decodedToken = this.decodeJWT(token);
    const user = await this.users.findOne({where: {
      slack_id: decodedToken["https://slack.com/user_id"]
    }});
    if (!user) {
      return await this.users.create({
        slack_id: decodedToken["https://slack.com/user_id"],
        email: decodedToken.email,
        name: decodedToken.name
      })
    }
    return user;
  }
  async getAllOrders () {
    const orders = await this.orderService.getAll()

    for (const order of orders) {
      // @ts-ignore
      order.user = {};
      order.user = await this.users.findOne({ where: {id: order.userId}});
    }
    return orders;
  }
}
