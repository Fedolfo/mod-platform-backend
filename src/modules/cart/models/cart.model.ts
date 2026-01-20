import { CartItemsModel } from './cart-items.model';

export interface CartModel {
  id: string;
  user_id: string;
  status: 'active' | 'converted' | 'abandoned';
  items: CartItemsModel[];
}
