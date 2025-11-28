import { Injectable } from '@nestjs/common';
import sql, { ConnectionPool } from 'mssql';
import * as dotenv from 'dotenv';

// โหลด .env
dotenv.config();

const config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER!,
  database: process.env.DB_NAME!,
  options: { encrypt: false, enableArithAbort: true },
};

@Injectable()
export class DatabaseService {
  private pool: ConnectionPool;

  async getPool(): Promise<ConnectionPool> {
    if (!this.pool) {
      console.log('Connecting to SQL Server with config:', config);
      this.pool = await sql.connect(config);
    }
    return this.pool;
  }
}
