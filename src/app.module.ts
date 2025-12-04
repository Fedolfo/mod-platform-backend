import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ProductsModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
