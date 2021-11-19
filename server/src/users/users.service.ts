import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import {Cron} from "@nestjs/schedule";


@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private users: typeof User) {}

  @Cron('0 00 05 * * */4')
  private async resetUsersDaysSum() {
    const users = await this.users.findAll({
      raw: true
    })
    for (const user of users) {
      await this.users.update({
        days_sum: [0, 0, 0, 0, 0],
        final_sum: 0,
        orders: [],
      }, {
        where: {
          id: user.id
        }
      });
    }
  }

  decodeJWT(token) {
    return jwt.decode(token, {
      json: true,
    });
  }

  async setUserOrders(token, order) {
    const user = await this.users.findOne(this.decodeJWT(token).email);
    const days_sum = user?.days_sum || new Array(5).fill(0);
    const orders = user?.orders || [];
    let final_sum = user?.final_sum || 0;

    Object.keys(order).forEach((key) => {
      order[key].forEach((food) => {
        days_sum[+key - 1] += food.cost;
        final_sum += food.cost;
        orders.push(food);
      });
    });

    if (user) {
      return this.users.update(
        {
          final_sum,
          orders,
          days_sum,
        },
        {
          where: {
            id: user.id,
          },
        },
      );
    }

    return  this.users.create({
      id: this.decodeJWT(token).sub,
      email: this.decodeJWT(token).email,
      name: this.decodeJWT(token).name,
      final_sum,
      days_sum,
      orders,
    });
  }

  async getAllUsers() {
    return this.users.findAll({
      raw: true
    });
  }
}
