import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { IProductsRepository } from '../interfaces/products-repository.interface';

@Injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly typeOrmRepository: Repository<ProductEntity>,
  ) {}

  create(createProductDto: CreateProductDto): ProductEntity {
    return this.typeOrmRepository.create({
      ...createProductDto,
      main_image_url: createProductDto.main_image_url || '',
      gallery_images: createProductDto.gallery_images || [],
    });
  }

  async save(product: ProductEntity): Promise<ProductEntity> {
    return await this.typeOrmRepository.save(product);
  }

  async find(options?: {
    order?: { [key: string]: 'ASC' | 'DESC' };
  }): Promise<ProductEntity[]> {
    return await this.typeOrmRepository.find(options);
  }

  async findOne(options: {
    where: { id: string };
  }): Promise<ProductEntity | null> {
    return await this.typeOrmRepository.findOne(options);
  }

  async remove(product: ProductEntity): Promise<ProductEntity> {
    return await this.typeOrmRepository.remove(product);
  }
}
