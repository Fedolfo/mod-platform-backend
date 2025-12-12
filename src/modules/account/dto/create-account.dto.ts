import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { AccountModel } from '../models/account.models';

export class CreateAccountDto implements AccountModel {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Matches(/^\d{11}$|^\d{14}$/, {
    // CPF (11) ou CNPJ (14)
    message: 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos',
  })
  cpf_cnpj: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsBoolean()
  @IsOptional()
  is_admin?: boolean;
}
