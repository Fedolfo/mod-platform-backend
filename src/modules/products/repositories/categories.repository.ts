import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ICategoriesRepository } from '../interfaces/categories-repository.interface';

@Injectable()
export class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly typeOrmRepository: Repository<CategoryEntity>,
  ) {}

  create(createCategoryDto: CreateCategoryDto): CategoryEntity {
    return this.typeOrmRepository.create(createCategoryDto);
  }

  async save(category: CategoryEntity): Promise<CategoryEntity> {
    return await this.typeOrmRepository.save(category);
  }

  async find(options?: {
    order?: { [key: string]: 'ASC' | 'DESC' };
  }): Promise<CategoryEntity[]> {
    return await this.typeOrmRepository.find(options);
  }

  async findOne(options: {
    where: { id: string };
  }): Promise<CategoryEntity | null> {
    return await this.typeOrmRepository.findOne(options);
  }

  async remove(category: CategoryEntity): Promise<CategoryEntity> {
    return await this.typeOrmRepository.remove(category);
  }
}
