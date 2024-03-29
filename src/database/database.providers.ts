import { join } from 'path';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration-lts';
import { StockEntity } from 'src/stocks/entities/stock.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        models: [StockEntity],
        define: {
          underscored: true,
          paranoid: true,
        },
        transactionType: Transaction.TYPES.DEFERRED,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
      await SequelizeTypescriptMigration.makeMigration(sequelize, {
        outDir: join(process.cwd(), '/src/database/migrations'),
        migrationName: 'migration',
        preview: false,
        useSnakeCase: true,
      });
      try {
        await sequelize.authenticate();
        return sequelize;
      } catch (error) {
        throw new Error(error.name);
      }
    },
  },
];
