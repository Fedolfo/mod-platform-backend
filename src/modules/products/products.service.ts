import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductsService } from './interfaces/products-service.interface';
import type { IProductsRepository } from './interfaces/products-repository.interface';
import { PRODUCTS_REPOSITORY_TOKEN } from './constants/products.constants';
import { ProductModel } from './models/products.model';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    // Usando token para injetar a interface
    @Inject(PRODUCTS_REPOSITORY_TOKEN)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductModel> {
    const product = this.productsRepository.create({
      ...createProductDto,
      main_image_url: createProductDto.main_image_url || '',
      gallery_images: createProductDto.gallery_images || [],
    });
    return await this.productsRepository.save(product);
  }

  async findAll(): Promise<ProductModel[]> {
    return await this.productsRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ProductModel> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductModel> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }
}
