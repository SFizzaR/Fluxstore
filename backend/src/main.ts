import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  dotenv.config();
  app.enableCors(
    {
      origin: 'http://localhost:4200', // or '*' for development
      credentials: true
    }
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


