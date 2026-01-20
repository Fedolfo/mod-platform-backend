import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { CategoryModel } from '../models/category.model';

@Entity('categories')
export class CategoryEntity implements CategoryModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ default: 'active' })
  status: 'active' | 'inactive';

  @OneToMany(() => ProductEntity, (product) => product.category_id)
  products: ProductEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
