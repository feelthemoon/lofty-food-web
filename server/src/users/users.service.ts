import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import {OrderModel} from "../models/order.model";
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
    const users = await this.users.findAll({raw: true})

    for (const user of users) {
      user.orders = [];
      const order = await this.orderService.find(user.id);
      // @ts-ignore
      user.orders.push(order);
    }
    return users;
  }
}
