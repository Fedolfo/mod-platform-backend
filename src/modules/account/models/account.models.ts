export class AccountModel {
  id?: string;
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  address?: string;
  cpf_cnpj?: string;

  constructor(data: AccountModel) {
    Object.assign(this, data);
  }
}
