import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get database() {
    return {
      type: this.configService.get<string>('DB_TYPE', 'postgres'),
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 5432),
      username: this.configService.get<string>(
        'DB_USERNAME',
        'postgres-design-furniture',
      ),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE', true),
      logging: this.configService.get<boolean>('DB_LOGGING', false),
    };
  }

  get app() {
    return {
      port: this.configService.get<number>('PORT', 3000),
      nodeEnv: this.configService.get<string>('NODE_ENV', 'development'),
    };
  }
  get jwt() {
    return {
      secret: this.configService.get<string>(
        'JWT_SECRET',
        'secret-key-change-in-production-for-jwt',
      ),
      expiresIn: this.configService.get<number>('JWT_EXPIRES_IN', 24 * 60 * 60),
    };
  }
}
