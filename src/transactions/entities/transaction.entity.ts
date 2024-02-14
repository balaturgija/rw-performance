import { DataTypes } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  IsDecimal,
  IsInt,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { v4 } from 'uuid';

@Table({
  tableName: 'transactions',
  underscored: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})
export class TransactionEntity extends Model<TransactionEntity> {
  @PrimaryKey
  @IsUUID(4)
  @AllowNull(false)
  @Default(() => v4())
  @Column({
    type: DataTypes.UUID,
  })
  id: string;

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

  @ForeignKey(() => OrderEntity)
  @AllowNull(false)
  @IsUUID(4)
  @Column({
    type: DataTypes.UUID,
  })
  buyOrderId: string;

  @ForeignKey(() => OrderEntity)
  @AllowNull(false)
  @IsUUID(4)
  @Column({
    type: DataTypes.UUID,
  })
  sellOrderId: string;

  /** Assotiations */
  @BelongsTo(() => OrderEntity, 'buyOrderId')
  buyTransactions: OrderEntity[];

  @BelongsTo(() => OrderEntity, 'sellOrderId')
  sellTransactions: OrderEntity[];
}
