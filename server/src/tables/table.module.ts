import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { UsersService } from '../users/users.service';
import {OrderModel} from "../models/order.model";
import {OrdersService} from "../orders/orders.service";

@Module({
  controllers: [TableController],
  providers: [TableService, UsersService, OrdersService],
  imports: [SequelizeModule.forFeature([User, OrderModel]), HttpModule],
})
export class TableModule {}
