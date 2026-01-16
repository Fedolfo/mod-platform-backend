import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ICategoriesRepository } from '../interfaces/categories-repository.interface';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly typeOrmRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): Category {
    return this.typeOrmRepository.create(createCategoryDto);
  }

  async save(category: Category): Promise<Category> {
    return await this.typeOrmRepository.save(category);
  }

  async find(options?: {
    order?: { [key: string]: 'ASC' | 'DESC' };
  }): Promise<Category[]> {
    return await this.typeOrmRepository.find(options);
  }

  async findOne(options: { where: { id: string } }): Promise<Category | null> {
    return await this.typeOrmRepository.findOne(options);
  }

  async remove(category: Category): Promise<Category> {
    return await this.typeOrmRepository.remove(category);
  }
}
