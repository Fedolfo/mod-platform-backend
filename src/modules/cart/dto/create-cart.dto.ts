import { CreateCartSchema } from '../schemes/create-cart-schemes';
import { createZodDto } from 'nestjs-zod';

export class CreateCartDto extends createZodDto(CreateCartSchema) {}
