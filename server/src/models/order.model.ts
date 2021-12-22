import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.model';
import { DataTypes } from 'sequelize';

interface IOrder {
  id: number;
  food: [];
  final_sum: number;
  days_sum: [];
  userId: number;
}
@Table({ tableName: 'Orders' })
export class OrderModel extends Model<OrderModel, IOrder> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.ARRAY(DataTypes.JSON) })
  food: [];

  @Column({ type: DataType.INTEGER, allowNull: false })
  final_sum: number;

  @Column({ type: DataType.ARRAY(DataTypes.JSON), allowNull: false })
  days_sum: any;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
