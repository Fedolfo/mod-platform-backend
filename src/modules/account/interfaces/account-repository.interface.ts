import { AccountModel } from '../models/account.models';

export interface IAccountRepository {
  create(account: AccountModel): Promise<{ id: string; email: string }>;
  findOne(id: string): Promise<AccountModel | null>;
  findByEmail(email: string): Promise<AccountModel | null>;
  remove(id: string): Promise<void>;
  update(id: string, account: Partial<AccountModel>): Promise<AccountModel>;
}
