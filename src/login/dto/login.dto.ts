import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class ForgotPassword {
    @IsString()
    emp_code: string;
    
    @IsEmail()
    email: string;
}
