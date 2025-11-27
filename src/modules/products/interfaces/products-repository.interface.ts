import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

export interface IProductsRepository {
  create(createProductDto: CreateProductDto): Product;
  save(product: Product): Promise<Product>;
  find(options?: {
    order?: { [key: string]: 'ASC' | 'DESC' };
  }): Promise<Product[]>;
  findOne(options: { where: { id: string } }): Promise<Product | null>;
  remove(product: Product): Promise<Product>;
}
