import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

interface IUser {
  id: string;
  username: string;
  orders: DataTypes.ArrayDataType<any>;
  final_sum: number;
  days_sum: DataTypes.ArrayDataType<any>;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, IUser> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;
  @Column({ type: DataType.STRING, allowNull: false })
  username: string;
  @Column({ type: DataType.ARRAY(DataTypes.JSON), allowNull: false })
  orders: DataTypes.ArrayDataType<any>;
  @Column({ type: DataType.INTEGER, allowNull: false })
  final_sum: number;
  @Column({ type: DataType.ARRAY(DataTypes.JSON), allowNull: false })
  days_sum: DataTypes.ArrayDataType<any>;
}
