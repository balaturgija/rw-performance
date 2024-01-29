import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PokemonsModule } from './pokemons/pokemons.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    RedisModule,
    DatabaseModule,
    PokemonsModule,
  ],
})
export class AppModule {}
