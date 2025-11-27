import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { IProductsRepository } from '../interfaces/products-repository.interface';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly typeOrmRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Product {
    return this.typeOrmRepository.create({
      ...createProductDto,
      main_image_url: createProductDto.main_image_url || '',
      gallery_images: createProductDto.gallery_images || [],
    });
  }

  async save(product: Product): Promise<Product> {
    return await this.typeOrmRepository.save(product);
  }

  async find(options?: {
    order?: { [key: string]: 'ASC' | 'DESC' };
  }): Promise<Product[]> {
    return await this.typeOrmRepository.find(options);
  }

  async findOne(options: { where: { id: string } }): Promise<Product | null> {
    return await this.typeOrmRepository.findOne(options);
  }

  async remove(product: Product): Promise<Product> {
    return await this.typeOrmRepository.remove(product);
  }
}
