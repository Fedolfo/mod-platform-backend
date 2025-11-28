import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from './entities/account.entity';
import { AccountRepository } from './repositories/account.respository';
import {
  ACCOUNT_REPOSITORY_TOKEN,
  ACCOUNT_SERVICE_TOKEN,
} from './constants/account.constants';
import { Module } from '@nestjs/common';
import { BcryptRepository } from './repositories/bcrypt.repository';
import { BCRYPT_REPOSITORY_TOKEN } from './constants/bcrypt.constats';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.jwt.secret,
        signOptions: { expiresIn: configService.jwt.expiresIn },
      }),
    }),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountRepository,
    BcryptRepository,

    {
      provide: BCRYPT_REPOSITORY_TOKEN,
      useClass: BcryptRepository,
    },
    {
      provide: ACCOUNT_REPOSITORY_TOKEN,
      useClass: AccountRepository,
    },
    {
      provide: ACCOUNT_SERVICE_TOKEN,
      useClass: AccountService,
    },
  ],
  exports: [AccountService, ACCOUNT_SERVICE_TOKEN],
})
export class AccountModule {}
