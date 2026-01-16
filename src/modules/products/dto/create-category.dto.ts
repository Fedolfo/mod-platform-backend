import { CreateCategorySchema } from '../schemes/create-category-schemes';
import { createZodDto } from 'nestjs-zod';

export class CreateCategoryDto extends createZodDto(CreateCategorySchema) {}
