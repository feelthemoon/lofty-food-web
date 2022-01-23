import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderModel } from '../models/order.model';
import { User } from '../models/user.model';
import { UsersService } from '../users/users.service';
import { OrdersController } from './orders.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [SequelizeModule.forFeature([OrderModel, User]), HttpModule],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService],
})
export class OrdersModule {}
