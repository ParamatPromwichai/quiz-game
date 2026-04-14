import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  // เพิ่ม 3 บรรทัดนี้เพื่อช่วยจัดการ Connection ใน Serverless
  waitForConnections: true,
  connectionLimit: 5, // ปรับลงมาเป็น 5-10 เพื่อไม่ให้ Railway โหลดหนักเกินไป
  queueLimit: 0,
});