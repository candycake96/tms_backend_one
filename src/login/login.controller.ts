import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    getLogin(): string {
        return this.loginService.getLogin();
    }

    @Post()
    async postLogin(@Body() loginDto: LoginDto): Promise<string> {
        return await this.loginService.postLogin(loginDto);
    }
}
