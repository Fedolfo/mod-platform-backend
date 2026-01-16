import { LoginAccountSchema } from '../schemes/login-account-scheme';
import { createZodDto } from 'nestjs-zod';

export class LoginAccountDto extends createZodDto(LoginAccountSchema) {}
