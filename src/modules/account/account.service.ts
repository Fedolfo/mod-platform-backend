import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type {
  IAccountService,
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
      throw new NotFoundException('Account not found');
    }
    const isPasswordValid = await this.bcryptRepository.compare(
      password,
      account.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ id: account.id });
    return {
      token,
    };
  }

  async create(createAccountDto: CreateAccountDto): Promise<ILoginResponse> {
    const hashedPassword = await this.bcryptRepository.hash(
      createAccountDto.password,
    );
    const account = await this.accountRepository.create({
      ...createAccountDto,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: account.id });
    return {
      token,
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
