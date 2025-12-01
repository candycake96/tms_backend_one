import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY_Test', // เปลี่ยนเป็น secret จริง
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
