export class AddressModel {
  number: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement?: string;
  fullAddress?: string;

  constructor(data: AddressModel) {
    Object.assign(this, data);
  }
}
