import {
  Injectable,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { ICartService } from './interfaces/cart-service.interface';
import type { ICartRepository } from './interfaces/cart-repository.interface';
import { CART_REPOSITORY_TOKEN } from './constants/cart.constants';
import { PRODUCTS_SERVICE_TOKEN } from '../products/constants/products.constants';
import type { IProductsService } from '../products/interfaces/products-service.interface';
import { CartModel } from './models/cart.model';
import { CartItemsModel } from './models/cart-items.model';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject(CART_REPOSITORY_TOKEN)
    private readonly cartRepository: ICartRepository,
    @Inject(PRODUCTS_SERVICE_TOKEN)
    private readonly productsService: IProductsService,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<CartModel> {
    // Verifica se já existe um carrinho ativo para o usuário
    const existingCart = await this.cartRepository.findByUserId(
      createCartDto.user_id,
    );
    if (existingCart && existingCart.status === 'active') {
      throw new BadRequestException(
        'Usuário já possui um carrinho ativo. Use o carrinho existente ou finalize-o antes de criar um novo.',
      );
    }

    const cart = this.cartRepository.create({
      ...createCartDto,
      status: createCartDto.status || 'active',
    });
    return await this.cartRepository.save(cart);
  }

  async findAll(userId?: string): Promise<CartModel[]> {
    if (userId) {
      const cart = await this.cartRepository.findByUserId(userId);
      return cart ? [cart] : [];
    }
    return await this.cartRepository.findAll();
  }

  async findOne(id: string): Promise<CartModel> {
    const cart = await this.cartRepository.findById(id, true);
    if (!cart) {
      throw new NotFoundException(`Carrinho com ID ${id} não encontrado`);
    }
    return cart;
  }

  async findByUserId(userId: string): Promise<CartModel | null> {
    return await this.cartRepository.findByUserId(userId, true);
  }

  async getCartWithItems(userId: string): Promise<CartModel> {
    let cart = await this.cartRepository.findByUserId(userId, true);

    // Se não existe carrinho ativo, cria um novo
    if (!cart || cart.status !== 'active') {
      cart = await this.create({
        user_id: userId,
        status: 'active',
        items: [],
      });
    }

    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto): Promise<CartModel> {
    const cart = await this.findOne(id);
    Object.assign(cart, updateCartDto);
    return await this.cartRepository.save(cart);
  }

  async remove(id: string): Promise<void> {
    const cart = await this.findOne(id);
    await this.cartRepository.remove(cart);
  }

  async addItemToCart(
    userId: string,
    addItemDto: AddItemToCartDto,
  ): Promise<CartModel> {
    await this.productsService.findOne(addItemDto.productId);

    const cart = await this.getCartWithItems(userId);

    const existingItem = await this.cartRepository.findCartItemByProduct(
      cart.id,
      addItemDto.productId,
    );

    if (existingItem && existingItem.id) {
      const updatedItem: CartItemsModel = {
        cart_id: existingItem.cart_id,
        product_id: existingItem.product_id,
        quantity: existingItem.quantity + addItemDto.quantity,
        unitPriceSnapshot: existingItem.unitPriceSnapshot,
      };
      await this.cartRepository.saveCartItemWithTransaction(updatedItem);
    } else {
      await this.cartRepository.saveCartItemWithTransaction({
        cart_id: cart.id,
        product_id: addItemDto.productId,
        quantity: addItemDto.quantity,
        unitPriceSnapshot: addItemDto.unitPriceSnapshot ?? undefined,
      });
    }

    // Retorna o carrinho atualizado (otimizado: busca apenas uma vez)
    const updatedCart = await this.cartRepository.findById(cart.id, true);
    if (!updatedCart) {
      throw new NotFoundException('Carrinho não encontrado após atualização');
    }
    return updatedCart;
  }

  async updateItemQuantity(
    userId: string,
    productId: string,
    updateItemDto: UpdateCartItemDto,
  ): Promise<CartModel> {
    const cart = await this.getCartWithItems(userId);

    const item = await this.cartRepository.findCartItemByProduct(
      cart.id,
      productId,
    );

    if (!item) {
      throw new NotFoundException('Produto não encontrado no carrinho');
    }

    const updatedItem: CartItemsModel = {
      cart_id: item.cart_id,
      product_id: item.product_id,
      quantity: updateItemDto.quantity,
      unitPriceSnapshot: item.unitPriceSnapshot ?? undefined,
    };
    await this.cartRepository.saveCartItemWithTransaction(updatedItem);

    // Retorna o carrinho atualizado (otimizado)
    const updatedCart = await this.cartRepository.findById(cart.id, true);
    if (!updatedCart) {
      throw new NotFoundException('Carrinho não encontrado após atualização');
    }
    return updatedCart;
  }

  async removeItemFromCart(
    userId: string,
    productId: string,
  ): Promise<CartModel> {
    const cart = await this.getCartWithItems(userId);

    const item = await this.cartRepository.findCartItemByProduct(
      cart.id,
      productId,
    );

    if (!item) {
      throw new NotFoundException('Produto não encontrado no carrinho');
    }

    if (!item.id) {
      throw new BadRequestException('Item não possui ID válido');
    }

    await this.cartRepository.removeCartItemWithTransaction(item.id);

    // Retorna o carrinho atualizado (otimizado)
    const updatedCart = await this.cartRepository.findById(cart.id, true);
    if (!updatedCart) {
      throw new NotFoundException('Carrinho não encontrado após remoção');
    }
    return updatedCart;
  }

  async clearCart(userId: string): Promise<CartModel> {
    const cart = await this.getCartWithItems(userId);
    await this.cartRepository.removeAllCartItems(cart.id);
    // Retorna o carrinho atualizado (otimizado)
    const updatedCart = await this.cartRepository.findById(cart.id, true);
    if (!updatedCart) {
      throw new NotFoundException('Carrinho não encontrado após limpeza');
    }
    return updatedCart;
  }
}
