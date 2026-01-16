export class LoginAccountModel {
  email: string;
  password: string;

  constructor(data: LoginAccountModel) {
    Object.assign(this, data);
  }
}
