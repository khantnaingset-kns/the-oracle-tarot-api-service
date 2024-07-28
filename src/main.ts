import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { otelSDK } from './instrumentation';
import chalk from 'chalk';

async function bootstrap() {
  await otelSDK.start();

  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tarot Service API')
    .setDescription('API for drawing the Tarot cards')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(configService.get<number>('port'), `0.0.0.0`);

  process.on('SIGTERM', async () => {
    await Promise.all([otelSDK.shutdown(), app.close()]);
    console.log(chalk.green('App and SDK shutdown successfully'));
  });
}
bootstrap();
