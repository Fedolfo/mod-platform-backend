import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, DataSource } from 'typeorm';
import { CartEntity } from '../entities/cart.entity';
import { CartItemEntity } from '../entities/cart-items.entity';
import { CreateCartDto } from '../dto/create-cart.dto';
import { ICartRepository } from '../interfaces/cart-repository.interface';
import { CartItemsModel } from '../models/cart-items.model';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
    private readonly dataSource: DataSource,
  ) {}

  create(createCartDto: CreateCartDto): CartEntity {
    return this.cartRepository.create({
      ...createCartDto,
      status: createCartDto.status || 'active',
    });
  }

  async save(cart: CartEntity): Promise<CartEntity> {
    return await this.cartRepository.save(cart);
  }

  async findAll(): Promise<CartEntity[]> {
    return await this.cartRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, includeItems = false): Promise<CartEntity | null> {
    const options: FindOneOptions<CartEntity> = { where: { id } };
    if (includeItems) {
      options.relations = ['items'];
    }
    return await this.cartRepository.findOne(options);
  }

  async findByUserId(
    userId: string,
    includeItems = false,
  ): Promise<CartEntity | null> {
    const options: FindOneOptions<CartEntity> = { where: { user_id: userId } };
    if (includeItems) {
      options.relations = ['items'];
    }
    return await this.cartRepository.findOne(options);
  }

  async findByStatus(
    status: 'active' | 'converted' | 'abandoned',
  ): Promise<CartEntity[]> {
    return await this.cartRepository.find({
      where: { status },
      order: { createdAt: 'DESC' },
    });
  }

  async remove(cart: CartEntity): Promise<CartEntity> {
    return await this.cartRepository.remove(cart);
  }

  async findCartItemByProduct(
    cartId: string,
    productId: string,
  ): Promise<CartItemEntity | null> {
    return await this.cartItemRepository.findOne({
      where: { cart_id: cartId, product_id: productId },
    });
  }

  async saveCartItem(item: CartItemsModel): Promise<CartItemEntity> {
    const cartItem = this.cartItemRepository.create({
      cart_id: item.cart_id,
      product_id: item.product_id,
      quantity: item.quantity,
      unitPriceSnapshot: item.unitPriceSnapshot,
    });
    return await this.cartItemRepository.save(cartItem);
  }

  async removeCartItem(itemId: string): Promise<void> {
    await this.cartItemRepository.delete(itemId);
  }

  async removeAllCartItems(cartId: string): Promise<void> {
    await this.cartItemRepository.delete({ cart_id: cartId });
  }

  async saveCartItemWithTransaction(
    item: CartItemsModel,
  ): Promise<CartItemEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cartItem = this.cartItemRepository.create({
        cart_id: item.cart_id,
        product_id: item.product_id,
        quantity: item.quantity,
        unitPriceSnapshot: item.unitPriceSnapshot,
      });
      const savedItem = await queryRunner.manager.save(cartItem);
      await queryRunner.commitTransaction();
      return savedItem;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async removeCartItemWithTransaction(itemId: string): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(CartItemEntity, itemId);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
