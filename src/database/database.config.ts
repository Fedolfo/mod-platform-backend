import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { entities } from './entities';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const dbConfig = configService.database;

  const baseConfig = {
    entities,
    synchronize: dbConfig.synchronize,
    logging: dbConfig.logging,
  };

  if (dbConfig.type === 'sqlite') {
    return {
      ...baseConfig,
      type: 'sqlite',
      database: dbConfig.database,
    } as TypeOrmModuleOptions;
  }

  if (dbConfig.type === 'postgres') {
    return {
      ...baseConfig,
      type: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
    } as TypeOrmModuleOptions;
  }

  if (dbConfig.type === 'mysql') {
    return {
      ...baseConfig,
      type: 'mysql',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
    } as TypeOrmModuleOptions;
  }

  throw new Error(`Tipo de banco de dados não suportado: ${dbConfig.type}`);
};
