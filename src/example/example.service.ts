import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ExampleService {
  constructor(private readonly dbService: DatabaseService) {}

  async getUsers() {
    const pool = await this.dbService.getPool();
    const result = await pool.request().query('SELECT * FROM company');
    return result.recordset;
  }
}
