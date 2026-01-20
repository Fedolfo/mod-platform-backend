import { createZodDto } from 'nestjs-zod';
import { CartItemSchema } from '../schemes/create-cart-items-schemes';

export class CreateCartItemsDto extends createZodDto(CartItemSchema) {}
