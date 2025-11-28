import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as sql from 'mssql';
import * as dotenv from 'dotenv';

dotenv.config();

// Type สำหรับ param ของ SQL
export type QueryParam = { type: sql.ISqlTypeFactoryWithNoParams; value: any } | string | number;

// Type สำหรับ params object
export type Params = Record<string, QueryParam>;

// Generic สำหรับผลลัพธ์ DB
export type DBResult<T> = T[];

@Injectable()
export class DatabaseService implements OnModuleDestroy {
    private pool: sql.ConnectionPool;

    private config: sql.config = {
        server: process.env.DB_SERVER!,
        database: process.env.DB_NAME!,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        options: {
            encrypt: false,
            trustServerCertificate: true,
            enableArithAbort: true,
        },
        pool: {
            max: 10,
            min: 2,
            idleTimeoutMillis: 30000,
        },
    };

    // สร้าง Connection Pool
    async getPool(): Promise<sql.ConnectionPool> {
        if (!this.pool || !this.pool.connected) {
            try {
                console.log('🔗 Connecting to SQL Server...');
                this.pool = await sql.connect(this.config);
                console.log('✅ SQL Server connected successfully');
            } catch (error) {
                console.error('❌ Failed to connect to SQL Server:', error);
                throw error;
            }
        }
        return this.pool;
    }

    // ฟังก์ชัน executeQuery แบบ generic
    async executeQuery<T>(query: string, params: Params = {}): Promise<DBResult<T>> {
        const pool = await this.getPool();
        const request = pool.request();

        // Add input parameters
        for (const [key, param] of Object.entries(params)) {
            if (typeof param === 'object' && 'type' in param && 'value' in param) {
                request.input(key, param.type, param.value);
            } else {
                request.input(key, param);
            }
        }

        try {
            console.log('📝 Executing query:', query);
            const result = await request.query(query);
            console.log(`✅ Query executed successfully, ${result.rowsAffected[0] || 0} rows affected`);
            return result.recordset as T[];
        } catch (error) {
            console.error('❌ SQL query error:', { query, params, error });
            throw error;
        }
    }

    // ปิด connection เมื่อ module ถูก destroy
    async onModuleDestroy() {
        if (this.pool) {
            await this.pool.close();
            console.log('🔒 SQL connection pool closed');
        }
    }
}
