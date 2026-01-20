import { CreateCartDto } from '../dto/create-cart.dto';
import { CartModel } from '../models/cart.model';
import { CartItemsModel } from '../models/cart-items.model';

export interface ICartRepository {
  create(createCartDto: CreateCartDto): CartModel;
  save(cart: CartModel): Promise<CartModel>;
  findAll(): Promise<CartModel[]>;
  findById(id: string, includeItems?: boolean): Promise<CartModel | null>;
  findByUserId(
    userId: string,
    includeItems?: boolean,
  ): Promise<CartModel | null>;
  findByStatus(
    status: 'active' | 'converted' | 'abandoned',
  ): Promise<CartModel[]>;
  remove(cart: CartModel): Promise<CartModel>;
  // Métodos para gerenciar items do carrinho
  findCartItemByProduct(
    cartId: string,
    productId: string,
  ): Promise<CartItemsModel | null>;
  saveCartItem(item: CartItemsModel): Promise<CartItemsModel>;
  removeCartItem(itemId: string): Promise<void>;
  removeAllCartItems(cartId: string): Promise<void>;
  // Métodos transacionais
  saveCartItemWithTransaction(item: CartItemsModel): Promise<CartItemsModel>;
  removeCartItemWithTransaction(itemId: string): Promise<void>;
}
