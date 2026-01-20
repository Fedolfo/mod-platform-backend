import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartEntity } from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-items.entity';
import { CartRepository } from './repositories/cart.repository';
import { ProductsModule } from '../products/products.module';
import {
  CART_REPOSITORY_TOKEN,
  CART_SERVICE_TOKEN,
} from './constants/cart.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    ProductsModule,
  ],
  controllers: [CartController],
  providers: [
    CartRepository,
    CartService,
    {
      provide: CART_REPOSITORY_TOKEN,
      useClass: CartRepository,
    },
    {
      provide: CART_SERVICE_TOKEN,
      useClass: CartService,
    },
  ],
  exports: [CartService, CART_SERVICE_TOKEN],
})
export class CartModule {}
