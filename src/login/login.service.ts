import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
    getLogin(): string {
        return 'Hello Login!';
    }

    postLogin(username: string, password: string): string {
        if (username === 'admin' && password === '1234') {
            return 'Login success';
        }
        return 'Login failed';
    }

}
