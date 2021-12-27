import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from '../models/order.model';
// import { Cron } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
// import { writeFile } from 'fs';
// import { promisify } from 'util';
import { Op } from 'sequelize';

// const writeFilePromise = promisify(writeFile);

@Injectable()
export class OrdersService {
  // @Cron('0 00 10 * * FRI')
  // private async resetTableOrders() {
  //   await this.orders.destroy({
  //     where: {},
  //     truncate: true,
  //   });
  //   await writeFilePromise('./cron.log', `[${new Date()}] - Destroyed Table Orders`)
  // }
  constructor(
    @InjectModel(OrderModel) private readonly orders: typeof OrderModel,
    private readonly userService: UsersService,
  ) {}

  async getAll() {
    return await this.orders.findAll({ raw: true });
  }
  async create(order, user) {
    const foundOrder = await this.orders.findOne({
      where: {
        userId: user.id,
        createdAt: {
          [Op.lt]: new Date(),
          // @ts-ignore
          [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
        },
      },
    });
    const days_sum = foundOrder?.days_sum || new Array(5).fill(0);
    const orders = foundOrder?.food || [];
    let final_sum = foundOrder?.final_sum || 0;
    Object.keys(order).forEach((key) => {
      order[key].forEach((food) => {
        days_sum[+key - 1] += food.cost;
        final_sum += food.cost;
        // @ts-ignore
        orders.push({ day: key, food });
      });
    });
    if (foundOrder) {
      return this.orders.update(
        {
          final_sum,
          food: orders,
          days_sum,
        },
        {
          where: {
            id: foundOrder.id,
          },
        },
      );
    }
    // @ts-ignore
    return await this.orders.create({
      final_sum,
      food: orders,
      userId: user.id,
      days_sum,
    });
  }
  async getAllOrders() {
    const orders = await this.getAll();
    for (const order of orders) {
      order.user = await this.userService.find(order.userId);
    }
    return orders;
  }
}
