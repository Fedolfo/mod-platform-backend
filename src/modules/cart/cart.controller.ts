import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import type { ICartService } from './interfaces/cart-service.interface';
import { CART_SERVICE_TOKEN } from './constants/cart.constants';
import { CartModel } from './models/cart.model';

@Controller('api/v1/cart')
export class CartController {
  constructor(
    @Inject(CART_SERVICE_TOKEN)
    private readonly cartService: ICartService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('userId') userId?: string) {
    const carts = await this.cartService.findAll(userId);
    if (carts.length === 0) {
      throw new NotFoundException('Carrinhos não encontrados');
    }
    return carts;
  }

  @Get('user/:userId')
  @HttpCode(HttpStatus.OK)
  async getCartWithItems(@Param('userId') userId: string): Promise<CartModel> {
    return await this.cartService.getCartWithItems(userId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.cartService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }

  // Rotas para gerenciar itens do carrinho (aggregate root)
  @Post('user/:userId/items')
  @HttpCode(HttpStatus.OK)
  async addItemToCart(
    @Param('userId') userId: string,
    @Body() addItemDto: AddItemToCartDto,
  ): Promise<CartModel> {
    return await this.cartService.addItemToCart(userId, addItemDto);
  }

  @Put('user/:userId/items/:productId')
  @HttpCode(HttpStatus.OK)
  async updateItemQuantity(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() updateItemDto: UpdateCartItemDto,
  ): Promise<CartModel> {
    return await this.cartService.updateItemQuantity(
      userId,
      productId,
      updateItemDto,
    );
  }

  @Delete('user/:userId/items/:productId')
  @HttpCode(HttpStatus.OK)
  async removeItemFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ): Promise<CartModel> {
    return await this.cartService.removeItemFromCart(userId, productId);
  }

  @Delete('user/:userId/items')
  @HttpCode(HttpStatus.OK)
  async clearCart(@Param('userId') userId: string): Promise<CartModel> {
    return await this.cartService.clearCart(userId);
  }
}
