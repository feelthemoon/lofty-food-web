import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {OrderModel} from "../models/order.model";

@Injectable()
export class OrdersService {
    constructor(@InjectModel(OrderModel) private readonly orders: typeof OrderModel) {}
    async find(id: number) {
        return await this.orders.findOne({where: {userId: id}});
    }

    async create(order, user) {
        const foundOrder = await this.orders.findOne({where: {userId: user.id}});

        const days_sum = foundOrder?.days_sum || new Array(5).fill(0);
        const orders = foundOrder?.food || [];
        let final_sum = foundOrder?.final_sum || 0;

        Object.keys(order).forEach((key) => {
            order[key].forEach((food) => {
                days_sum[+key - 1] += food.cost;
                final_sum += food.cost;
                // @ts-ignore
                orders.push(food);
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
        })
    }
}