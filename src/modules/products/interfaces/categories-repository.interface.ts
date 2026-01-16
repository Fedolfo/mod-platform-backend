import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryModel } from '../models/category.model';

export interface ICategoriesRepository {
  create(createCategoryDto: CreateCategoryDto): CategoryModel;
  save(category: CategoryModel): Promise<CategoryModel>;
  find(options?: {
    order?: { [key: string]: 'ASC' | 'DESC' };
  }): Promise<CategoryModel[]>;
  findOne(options: { where: { id: string } }): Promise<CategoryModel | null>;
  remove(category: CategoryModel): Promise<CategoryModel>;
}
