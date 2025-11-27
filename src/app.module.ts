import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    // Configuração global (variáveis de ambiente)
    ConfigModule,
    // Configuração do banco de dados
    DatabaseModule,
    // Módulos de negócio
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
