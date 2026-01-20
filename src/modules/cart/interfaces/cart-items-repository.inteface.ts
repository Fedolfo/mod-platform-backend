import { CreateCartItemsDto } from '../dto/create-cart-items.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { CartItemsModel } from '../models/cart-items.model';

export interface ICartItemsRepository {
  create(createCartItemsDto: CreateCartItemsDto): Promise<CartItemsModel>;
  update(id: string, updateCartDto: UpdateCartDto): Promise<CartItemsModel>;
  remove(id: string): Promise<void>;
}
