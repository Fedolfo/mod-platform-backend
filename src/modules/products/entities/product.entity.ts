import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductModel } from '../models/products.model';
import { CategoryEntity } from './category.entity';

@Entity('products')
export class ProductEntity implements ProductModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({ name: 'categoryId' })
  category_id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  original_price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount_percent: number;

  @Column({ default: '' })
  dimensions: string;

  @Column({ default: '' })
  lead_time: string;

  @Column({ default: '' })
  main_image_url: string;

  @Column('simple-array', { default: '' })
  gallery_images: string[];

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @Column({ default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
