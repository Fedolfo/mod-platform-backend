import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryModel } from '../models/category.model';

export interface ICategoriesService {
  create(createCategoryDto: CreateCategoryDto): Promise<CategoryModel>;
  findAll(): Promise<CategoryModel[]>;
  findOne(id: string): Promise<CategoryModel>;
  update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryModel>;
  remove(id: string): Promise<void>;
}
