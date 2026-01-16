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
import { Category } from './category.entity';

@Entity('products')
export class Product implements ProductModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'categoryId' })
  categoryId: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  originalPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountPercent: number;

  @Column({ default: '' })
  dimensions: string;

  @Column({ default: '' })
  leadTime: string;

  @Column({ default: '' })
  mainImageUrl: string;

  @Column('simple-array', { default: '' })
  galleryImages: string[];

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @Column({ default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
