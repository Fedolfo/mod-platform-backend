import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductModel } from '../models/products.model';

@Entity('products')
export class Product implements ProductModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  dimensions: string;

  @Column()
  lead_time: string;

  @Column({ default: '' })
  main_image_url: string;

  @Column('simple-array', { default: '' })
  gallery_images: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
