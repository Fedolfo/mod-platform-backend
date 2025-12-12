import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type {
  IAccountService,
  ICreateAccountResponse,
  ILoginResponse,
} from './interfaces/account-service.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ACCOUNT_REPOSITORY_TOKEN } from './constants/account.constants';
import type { IAccountRepository } from './interfaces/account-repository.interface';
import { AccountModel } from './models/account.models';
import { BCRYPT_REPOSITORY_TOKEN } from './constants/bcrypt.constats';
import type { IBcryptRepository } from './interfaces/bcrypt-respository.inteface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY_TOKEN)
    private readonly accountRepository: IAccountRepository,
    @Inject(BCRYPT_REPOSITORY_TOKEN)
    private readonly bcryptRepository: IBcryptRepository,
    private readonly jwtService: JwtService,
  ) {}
  async login(email: string, password: string): Promise<ILoginResponse> {
    const account = await this.accountRepository.findByEmail(email);
    if (!account) {
      throw new BadRequestException('Registre o seu email para continuar');
    }
    const isPasswordValid = await this.bcryptRepository.compare(
      password,
      account.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha Incorreta');
    }
    const token = this.jwtService.sign({ id: account.id });
    return {
      token,
      email: account.email,
      full_name: account.full_name,
      is_admin: account.is_admin,
    };
  }

  async create(
    createAccountDto: CreateAccountDto,
  ): Promise<ICreateAccountResponse> {
    const accountAlreadyExists = await this.accountRepository.findByEmail(
      createAccountDto.email,
    );

    if (accountAlreadyExists) {
      throw new BadRequestException('Este email já está cadastrado');
    }

    const hashedPassword = await this.bcryptRepository.hash(
      createAccountDto.password,
    );

    const newAccount = await this.accountRepository.create({
      ...createAccountDto,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: newAccount.id });

    return {
      token,
      email: newAccount.email,
      full_name: newAccount.full_name,
    };
  }
  findOne(id: string): Promise<AccountModel | null> {
    return this.accountRepository.findOne(id);
  }
  findByEmail(email: string): Promise<AccountModel | null> {
    return this.accountRepository.findByEmail(email);
  }
  update(id: string, account: UpdateAccountDto): Promise<AccountModel> {
    return this.accountRepository.update(id, account);
  }
  remove(id: string): Promise<void> {
    return this.accountRepository.remove(id);
  }
}
