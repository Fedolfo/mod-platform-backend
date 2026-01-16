export class AddressModel {
  number: string;
  street: string;
  account_id: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  complement?: string;
  full_address?: string;

  constructor(data: AddressModel) {
    Object.assign(this, data);
  }
}
