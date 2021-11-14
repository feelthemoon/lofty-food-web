import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

interface IUser {
  id: string;
  name: string;
  email: string;
  orders: any;
  final_sum: number;
  days_sum: any;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, IUser> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.ARRAY(DataTypes.JSON), allowNull: false })
  orders: any;
  @Column({ type: DataType.INTEGER, allowNull: false })
  final_sum: number;
  @Column({ type: DataType.ARRAY(DataTypes.JSON), allowNull: false })
  days_sum: any;
}
