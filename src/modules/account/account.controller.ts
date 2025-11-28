import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import type {
  IAccountService,
  ILoginResponse,
} from './interfaces/account-service.interface';
import { AccountModel } from './models/account.models';
import { UpdateAccountDto } from './dto/update-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
import { ACCOUNT_SERVICE_TOKEN } from './constants/account.constants';

@Controller('account')
export class AccountController {
  constructor(
    @Inject(ACCOUNT_SERVICE_TOKEN)
    private readonly accountService: IAccountService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginAccountDto): Promise<ILoginResponse> {
    return await this.accountService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<ILoginResponse> {
    const accountAlreadyExists = await this.accountService.findByEmail(
      createAccountDto.email,
    );
    if (accountAlreadyExists) {
      throw new BadRequestException('Account already exists');
    }
    return await this.accountService.create(createAccountDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<AccountModel> {
    const account = await this.accountService.findOne(id);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<AccountModel> {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.accountService.remove(id);
  }
}
