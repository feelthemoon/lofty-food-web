import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderModel } from '../models/order.model';
import { UsersService } from '../users/users.service';
import { Op } from 'sequelize';

interface IOrder {
  id: number;
  title: string;
  category: string;
  cost: number;
  price: number;
  weight: number;
  count: number;
}
interface IFood {
  day: number | string;
  food: IOrder;
}
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModel) private readonly orders: typeof OrderModel,
    private readonly userService: UsersService,
  ) {}

  async getAll(page) {
    const count = await this.orders.count()
    const orders = await this.orders.findAll({ raw: true, order: [['createdAt', 'DESC']], offset: (page - 1) * 15, limit: 15 });
    return {orders, count};
  }
  async create(order, user) {
    const foundOrder = await this.orders.findOne({
      where: {
        userId: user.id,
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
      },
    });
    const days_sum = foundOrder?.days_sum || new Array(5).fill(0);
    const orders: IFood[] = foundOrder?.food || [];
    let final_sum = foundOrder?.final_sum || 0;

    Object.keys(order).forEach((key) => {
      order[key].forEach((food) => {
        days_sum[+key - 1] += food.cost;
        final_sum += food.cost;

        const foundIndexFood = orders.findIndex(
          (f) => f.food?.id === food.id && +f.day === food.day,
        );
        if (~foundIndexFood) {
          orders[foundIndexFood].food.cost += food.cost;
          orders[foundIndexFood].food.count += food.count;
          return;
        }

        orders.push({ day: key, food });
      });
    });
    if (foundOrder) {
      return this.orders.update(
        {
          final_sum,
          food: JSON.parse(JSON.stringify(orders)),
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
      food: JSON.parse(JSON.stringify(orders)),
      userId: user.id,
      days_sum,
    });
  }
  async getAllOrders(page: string | number) {
    const {orders, count} = await this.getAll(page);
    for (const order of orders) {
      order.user = await this.userService.find(order.userId);
    }
    return {orders, totalCount: count};
  }
}
