import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { AddItemToCartDto } from '../dto/add-item-to-cart.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import { CartModel } from '../models/cart.model';

export interface ICartService {
  // Operações básicas do carrinho
  create(createCartDto: CreateCartDto): Promise<CartModel>;
  findAll(userId?: string): Promise<CartModel[]>;
  findOne(id: string): Promise<CartModel>;
  findByUserId(userId: string): Promise<CartModel | null>;
  getCartWithItems(userId: string): Promise<CartModel>;
  update(id: string, updateCartDto: UpdateCartDto): Promise<CartModel>;
  remove(id: string): Promise<void>;
  // Operações de itens do carrinho (aggregate root)
  addItemToCart(
    userId: string,
    addItemDto: AddItemToCartDto,
  ): Promise<CartModel>;
  updateItemQuantity(
    userId: string,
    productId: string,
    updateItemDto: UpdateCartItemDto,
  ): Promise<CartModel>;
  removeItemFromCart(userId: string, productId: string): Promise<CartModel>;
  clearCart(userId: string): Promise<CartModel>;
}
