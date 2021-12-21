import {Module} from "@nestjs/common";
import {OrdersService} from "./orders.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {OrderModel} from "../models/order.model";
import {User} from "../models/user.model";

@Module({
    imports: [SequelizeModule.forFeature([OrderModel, User])],
    providers: [OrdersService],
})
export class OrdersModule {}