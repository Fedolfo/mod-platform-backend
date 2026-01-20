import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductEntity } from './entities/product.entity';
import { ProductsRepository } from './repositories/products.repository';
import {
  PRODUCTS_REPOSITORY_TOKEN,
  PRODUCTS_SERVICE_TOKEN,
} from './constants/products.constants';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesRepository } from './repositories/categories.repository';
import {
  CATEGORIES_REPOSITORY_TOKEN,
  CATEGORIES_SERVICE_TOKEN,
} from './constants/categories.constants';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
  controllers: [ProductsController, CategoriesController],
  providers: [
    // Products
    ProductsRepository,
    ProductsService,
    {
      provide: PRODUCTS_REPOSITORY_TOKEN,
      useClass: ProductsRepository,
    },
    {
      provide: PRODUCTS_SERVICE_TOKEN,
      useClass: ProductsService,
    },
    // Categories
    CategoriesRepository,
    CategoriesService,
    {
      provide: CATEGORIES_REPOSITORY_TOKEN,
      useClass: CategoriesRepository,
    },
    {
      provide: CATEGORIES_SERVICE_TOKEN,
      useClass: CategoriesService,
    },
  ],
  exports: [
    ProductsService,
    PRODUCTS_SERVICE_TOKEN,
    CategoriesService,
    CATEGORIES_SERVICE_TOKEN,
  ],
})
export class ProductsModule {}
