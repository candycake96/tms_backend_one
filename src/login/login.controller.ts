import { Controller, Get } from '@nestjs/common';
import { LoginService } from 'src/login/login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}  // เปลี่ยนชื่อ

    @Get()
    getLogin(): string {
        return this.loginService.getLogin();  // เรียกตามชื่อ property
    }
}
