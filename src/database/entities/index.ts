import { Account } from 'src/modules/account/entities/account.entity';
import { Product } from '../../modules/products/entities/product.entity';

/**
 * Exporta todas as entidades do sistema
 * Adicione novas entidades aqui conforme o projeto cresce
 */
export const entities = [Product, Account];

export { Product };
