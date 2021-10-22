import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { TableParser } from '../utils/table.parser';

@Module({
  controllers: [FoodController],
  providers: [FoodService, TableParser],
  imports: [SequelizeModule.forFeature([User]), HttpModule],
})
export class FoodModule {}
