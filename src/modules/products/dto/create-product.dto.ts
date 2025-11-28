import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { ProductModel } from '../models/products.model';

export class CreateProductDto implements ProductModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  dimensions: string;

  @IsString()
  @IsNotEmpty()
  lead_time: string;

  @IsString()
  @IsNotEmpty()
  main_image_url: string;

  @IsArray()
  @IsString({ each: true })
  gallery_images: string[];
}
