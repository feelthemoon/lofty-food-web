import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { OrderModel } from './order.model';


interface IUser {
  slack_id: string;
  name: string;
  email: string;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, IUser> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({ type: DataType.STRING, unique: true })
  slack_id: string;
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => OrderModel)
  orders: [];
}
