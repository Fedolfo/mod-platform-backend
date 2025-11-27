import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './repositories/products.repository';
import {
  PRODUCTS_REPOSITORY_TOKEN,
  PRODUCTS_SERVICE_TOKEN,
} from './constants/products.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    // Opção 1: Injeção automática (quando injeta classe concreta)
    ProductsRepository, // Instância concreta necessária para o TypeORM
    ProductsService,

    // Opção 2: Injeção com token (quando injeta interface)
    {
      provide: PRODUCTS_REPOSITORY_TOKEN, // Token (chave)
      useClass: ProductsRepository, // Classe que implementa (valor)
    },
    {
      provide: PRODUCTS_SERVICE_TOKEN,
      useClass: ProductsService,
    },
  ],
  exports: [ProductsService, PRODUCTS_SERVICE_TOKEN],
})
export class ProductsModule {}
