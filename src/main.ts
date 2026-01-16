import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  if (configService.app.nodeEnv === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Products API')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  app.useGlobalPipes(new ZodValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
}
void bootstrap();
