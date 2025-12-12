import { Injectable, NotFoundException } from '@nestjs/common';
import { IAccountRepository } from '../interfaces/account-repository.interface';
import { Account } from '../entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountModel } from '../models/account.models';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly typeOrmRepository: Repository<Account>,
  ) {}

  async remove(id: string): Promise<void> {
    await this.typeOrmRepository.softDelete(id);
  }

  async findOne(id: string): Promise<AccountModel | null> {
    return await this.typeOrmRepository.findOne({ where: { id } });
  }
  async findByEmail(email: string): Promise<AccountModel | null> {
    return await this.typeOrmRepository.findOne({ where: { email } });
  }

  async create(
    account: AccountModel,
  ): Promise<{ id: string; email: string; full_name: string }> {
    const newAccount = this.typeOrmRepository.create(account);
    await this.typeOrmRepository.save(newAccount);

    return {
      id: newAccount.id,
      email: newAccount.email,
      full_name: newAccount.full_name,
    };
  }

  async update(
    id: string,
    account: Partial<AccountModel>,
  ): Promise<AccountModel> {
    const foundAccount = await this.findOne(id);

    if (!foundAccount) {
      throw new NotFoundException('Account not found');
    }

    Object.assign(foundAccount, account);

    return await this.typeOrmRepository.save(foundAccount);
  }
}
