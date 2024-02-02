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
import { Generation } from '../types/generation';
import { PokemonType } from '../types/pokemon-type';

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

  @AllowNull(false)
  @Column({ type: DataTypes.ENUM(Generation.First, Generation.Second) })
  generation: Generation;

  @AllowNull(false)
  @Column({
    type: DataTypes.ENUM(
      PokemonType.Bug,
      PokemonType.Dark,
      PokemonType.Dragon,
      PokemonType.Electric,
      PokemonType.Fairy,
      PokemonType.Fighting,
      PokemonType.Fire,
      PokemonType.Flying,
      PokemonType.Ghost,
      PokemonType.Grass,
      PokemonType.Ground,
      PokemonType.Ice,
      PokemonType.Normal,
      PokemonType.Poison,
      PokemonType.Psychic,
      PokemonType.Rock,
      PokemonType.Steel,
      PokemonType.Water,
    ),
  })
  type: PokemonType;

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
