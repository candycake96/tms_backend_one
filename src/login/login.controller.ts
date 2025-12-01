import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Get()
    getLogin(): string {
        return this.loginService.getLogin();
    }

    @Post()
    postLogin(@Body() body: { username: string; password: string }): string {
        const { username, password } = body;
        return this.loginService.postLogin(username, password);
    }
}
