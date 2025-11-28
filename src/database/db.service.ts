import sql, { ConnectionPool } from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: { encrypt: false, enableArithAbort: true },
};

let pool: ConnectionPool;

export async function getPool(): Promise<ConnectionPool> {
  if (pool) return pool; // ถ้ามี pool อยู่แล้ว → return เลย
  pool = await sql.connect(config);
  return pool;
}
