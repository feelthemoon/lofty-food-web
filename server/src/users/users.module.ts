import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { OrderModel } from '../models/order.model';
import { OrdersService } from '../orders/orders.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [UsersController],
  providers: [UsersService, OrdersService],
  imports: [SequelizeModule.forFeature([User, OrderModel]), HttpModule],
})
export class UsersModule {}
