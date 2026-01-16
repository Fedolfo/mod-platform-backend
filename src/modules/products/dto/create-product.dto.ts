import { CreateProductSchema } from '../schemes/create-product-schemes';

import { createZodDto } from 'nestjs-zod';
export class CreateProductDto extends createZodDto(CreateProductSchema) {}
