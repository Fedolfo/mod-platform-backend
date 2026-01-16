import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { CategoryModel } from '../models/category.model';

@Entity('categories')
export class Category implements CategoryModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @OneToMany(() => Product, (product) => product.category_id)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
