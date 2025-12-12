export class AccountModel {
  id?: string;
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  address?: string;
  cpf_cnpj?: string;
  is_admin?: boolean;

  constructor(data: AccountModel) {
    Object.assign(this, data);
  }
}
