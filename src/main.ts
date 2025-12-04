import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const corsConfig = configService.cors as {
    origin: string | string[];
    methods: string[];
    allowedHeaders: string[];
    credentials: boolean;
  };

  app.enableCors(corsConfig);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // Throw an error if a property is not in the DTO
      transform: true, // Transform the payload to the DTO type
      whitelist: true, // Remove properties that are not in the DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
}
void bootstrap();
