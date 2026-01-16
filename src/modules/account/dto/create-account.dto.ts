import { createZodDto } from 'nestjs-zod';
import { CreateAccountSchema } from '../schemes/create-account-scheme';

export class CreateAccountDto extends createZodDto(CreateAccountSchema) {}
