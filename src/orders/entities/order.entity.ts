import { DataTypes } from 'sequelize';
import {
  AllowNull,
  Column,
  Default,
  IsDecimal,
  IsInt,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 } from 'uuid';

import { OrderStatus } from '../types/order-status';
import { OrderType } from '../types/order-type';

@Table({
  tableName: 'orders',
  underscored: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})
export class OrderEntity extends Model<OrderEntity> {
  @PrimaryKey
  @IsUUID(4)
  @AllowNull(false)
  @Default(() => v4())
  @Column({
    type: DataTypes.UUID,
  })
  id: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(...Object.values(OrderType)),
  })
  type: OrderType;

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM(...Object.values(OrderStatus)) })
  status: OrderStatus;

  @AllowNull(false)
  @IsInt
  @Column({
    type: DataTypes.INTEGER,
  })
  quantity: number;

  @AllowNull(false)
  @IsDecimal
  @Column({
    type: DataTypes.DECIMAL(12, 2),
  })
  price: number;
}
