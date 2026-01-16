import { createZodDto } from 'nestjs-zod';
import { AddressAccountSchema } from '../schemes/address-account-scheme';

export class CreateAddressDto extends createZodDto(AddressAccountSchema) {}
