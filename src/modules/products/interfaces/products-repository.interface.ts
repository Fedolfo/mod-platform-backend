import { CreateProductDto } from '../dto/create-product.dto';
import { ProductModel } from '../models/products.model';

export interface IProductsRepository {
  create(createProductDto: CreateProductDto): ProductModel;
  save(product: ProductModel): Promise<ProductModel>;
  find(options?: {
    order?: { [key: string]: 'ASC' | 'DESC' };
  }): Promise<ProductModel[]>;
  findOne(options: { where: { id: string } }): Promise<ProductModel | null>;
  remove(product: ProductModel): Promise<ProductModel>;
}
