export class AccountModel {
  id?: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  cpfCnpj: string;

  constructor(data: AccountModel) {
    Object.assign(this, data);
  }
}
