import { Account } from 'src/modules/account/entities/account.entity';
import { Product } from '../../modules/products/entities/product.entity';
import { Category } from '../../modules/products/entities/category.entity';

/**
 * Exporta todas as entidades do sistema
 * Adicione novas entidades aqui conforme o projeto cresce
 */
export const entities = [Product, Category, Account];

export { Product, Category };
