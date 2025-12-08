import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // เปิด ValidationPipe ให้ DTO ตรวจสอบได้จริง
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ลบ field ที่ไม่ได้ระบุใน DTO
      forbidNonWhitelisted: true, // ถ้ามี field แปลก → error ทันที
      transform: true, // แปลง type เช่น "123" → 123 (number)
    }),
  );

  // เปิด CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
