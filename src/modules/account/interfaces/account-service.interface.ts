import { AccountModel } from '../models/account.models';

export interface ILoginResponse {
  token: string;
}

export interface IAccountService {
  login(email: string, password: string): Promise<ILoginResponse>;
  create(account: AccountModel): Promise<ILoginResponse>;
  findOne(id: string): Promise<AccountModel | null>;
  findByEmail(email: string): Promise<AccountModel | null>;
  update(id: string, account: Partial<AccountModel>): Promise<AccountModel>;
  remove(id: string): Promise<void>;
}
