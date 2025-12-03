import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // เปิด CORS
  app.enableCors({
    origin: 'http://localhost:5173', // อนุญาตเฉพาะ frontend ของคุณ
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // ถ้าต้องใช้ cookie หรือ Authorization header
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
