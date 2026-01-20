import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { CartModel } from '../models/cart.model';
import { CartItemEntity } from './cart-items.entity';

@Entity('carts')
export class CartEntity implements CartModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ default: 'active' })
  status: 'active' | 'converted' | 'abandoned';

  @OneToMany(() => CartItemEntity, (item) => item.cart, {
    cascade: true,
  })
  items: CartItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
