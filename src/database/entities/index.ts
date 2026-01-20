import { Account } from 'src/modules/account/entities/account.entity';
import { ProductEntity } from '../../modules/products/entities/product.entity';
import { CategoryEntity } from '../../modules/products/entities/category.entity';
import { CartEntity } from '../../modules/cart/entities/cart.entity';
import { CartItemEntity } from '../../modules/cart/entities/cart-items.entity';

/**
 * Exporta todas as entidades do sistema
 * Adicione novas entidades aqui conforme o projeto cresce
 */
export const entities = [
  ProductEntity,
  CategoryEntity,
  Account,
  CartEntity,
  CartItemEntity,
];

export { ProductEntity, CategoryEntity, CartEntity, CartItemEntity };
