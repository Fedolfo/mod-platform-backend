import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductModel } from '../models/products.model';

export interface IProductsService {
  create(createProductDto: CreateProductDto): Promise<ProductModel>;
  findAll(): Promise<ProductModel[]>;
  findOne(id: string): Promise<ProductModel>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<ProductModel>;
  remove(id: string): Promise<void>;
}
