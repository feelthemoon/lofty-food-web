import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class FoodService {
  constructor(@InjectModel(User) private users: typeof User) {}
}
