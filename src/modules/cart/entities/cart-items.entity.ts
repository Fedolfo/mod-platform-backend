import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItemsModel } from '../models/cart-items.model';
import { CartEntity } from './cart.entity';
import { ProductEntity } from 'src/modules/products/entities/product.entity';

@Entity('cart_items')
export class CartItemEntity implements CartItemsModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CartEntity, (cart) => cart.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @Column()
  cart_id: string;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column()
  product_id: string;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  unitPriceSnapshot?: number;
}
