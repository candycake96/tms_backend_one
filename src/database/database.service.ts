import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class DatabaseService {
  private pools: Record<string, sql.ConnectionPool> = {};

  // ใช้ชื่อ DB เพื่อเลือก configuration
  private dbConfig: Record<string, sql.config> = {
    transport: {
      server: process.env.DB_SERVER!,
      database: process.env.DB_NAME!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    },
    access: {
      server: process.env.DB2_SERVER!,
      database: process.env.DB2_NAME!,
      user: process.env.DB2_USER!,
      password: process.env.DB2_PASSWORD!,
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    }
  };

  // ดึง connection pool ตามชื่อฐานข้อมูล
  async getPool(dbName: 'transport' | 'access'): Promise<sql.ConnectionPool> {
    if (!this.pools[dbName] || !this.pools[dbName].connected) {
      this.pools[dbName] = await new sql.ConnectionPool(this.dbConfig[dbName]).connect();
      console.log(`✅ Connected to DB: ${dbName}`);
    }
    return this.pools[dbName];
  }

  async executeQuery<T>(
  queryOrDb: any,
  queryOrParams?: any,
  params: any = {}
): Promise<T[]> {
  let dbName: 'transport' | 'access' = 'transport';
  let query: string;

  // ถ้าผู้ใช้ส่ง dbName มาเอง (แบบใหม่)
  if (queryOrDb === 'transport' || queryOrDb === 'access') {
    dbName = queryOrDb;
    query = queryOrParams;
    params = params;
  } 
  // ถ้าใช้รูปแบบเดิม (ส่ง query มาเลย)
  else {
    query = queryOrDb;
    params = queryOrParams || {};
  }

  const pool = await this.getPool(dbName);
  const request = pool.request();

  for (const [key, val] of Object.entries(params)) {
    request.input(key, val);
  }

  const result = await request.query(query);
  return result.recordset as T[];
}

}
