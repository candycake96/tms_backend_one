import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import { LoginDto } from './dto/login.dto';

interface User {
    id_emp: number;
    email: string;
    fname: string;
    lname: string;
    nickname: string;
    gender: string;
    date_job: string;
    id_branch: number;
    id_department: number;
    id_position: number;
    identification_number: string;
    phone: string;
    status: string;
    password: string;
    company_id: number;
    name_position: string;
    name_department: string;
    roles: string;
}

@Injectable()
export class LoginService {
    constructor(
        private readonly db: DatabaseService,
        private readonly jwtService: JwtService
    ) {}

    getLogin(): string {
        return 'Hello Login!';
    }

    async postLogin(loginDto: LoginDto): Promise<any> {
        const { email, password } = loginDto;

        const userQuery = `
            SELECT 
                e.id_emp, e.email, e.fname, e.lname, e.nickname, e.gender, 
                e.date_job, e.id_branch, e.id_department, e.id_position, 
                e.identification_number, e.phone, e.status, p.password, 
                e.company_id, p1.name_position, d.name_department,
                STRING_AGG(er.role_id, ',') AS roles
            FROM employees e
            JOIN password p ON e.id_emp = p.id_emp
            JOIN employee_roles er ON e.id_emp = er.id_emp
            JOIN positions p1 ON p1.id_position = e.id_position
            JOIN departments d ON d.id_department = e.id_department
            WHERE e.email = @email
            GROUP BY 
                e.id_emp, e.email, e.fname, e.lname, e.nickname, e.gender,
                e.date_job, e.id_branch, e.id_department, e.id_position,
                e.identification_number, e.phone, e.status, p.password,
                e.company_id, p1.name_position, d.name_department
        `;

        const users: User[] = await this.db.executeQuery(userQuery, { email });

        if (users.length === 0) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const user = users[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // ---- สร้าง JWT token ----
        const payload = {
            id: user.id_emp,
            email: user.email,
            roles: user.roles.split(',').map((r) => Number(r)),
        };

        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
        });

        return {
            message: 'Login success',
            token,
            user: {
                id: user.id_emp,
                email: user.email,
                fname: user.fname,
                lname: user.lname, 
                roles: payload.roles,
            },
        };
    }
}
