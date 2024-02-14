import { DataTypes } from 'sequelize';
import {
  AllowNull,
  Column,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 } from 'uuid';

@Table({
  tableName: 'stocks',
  underscored: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})
export class StockEntity extends Model<StockEntity> {
  @PrimaryKey
  @IsUUID(4)
  @AllowNull(false)
  @Default(() => v4())
  @Column({
    type: DataTypes.UUID,
  })
  id: string;

  @AllowNull(false)
  @Column({ type: DataTypes.TEXT })
  names: string;
}
