import { DataTypes } from 'sequelize';
import {
  AllowNull,
  Column,
  CreatedAt,
  Default,
  DeletedAt,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 } from 'uuid';

@Table({
  tableName: 'pokemons',
  underscored: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  paranoid: true,
})
export class PokemonEntity extends Model<PokemonEntity> {
  @PrimaryKey
  @IsUUID(4)
  @AllowNull(false)
  @Default(() => v4())
  @Column({ type: DataTypes.UUID })
  id: string;

  @AllowNull(false)
  @Column({ type: DataTypes.TEXT })
  name: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @DeletedAt
  @AllowNull
  @Default(null)
  @Column
  deletedAt?: Date;
}
