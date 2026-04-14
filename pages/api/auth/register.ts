// pages/api/auth/register.ts
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. อนุญาตให้เข้ามาผ่าน POST เท่านั้น
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { username, password } = req.body;

    // 2. ตรวจสอบว่ากรอกข้อมูลมาครบไหม
    if (!username || !password) {
      return res.status(400).json({ message: "กรุณากรอก Username และ Password" });
    }

    // 3. (ทางเลือก) ตรวจสอบว่ารหัสผ่านสั้นไปไหม
    if (password.length < 6) {
      return res.status(400).json({ message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" });
    }

    // เข้ารหัสผ่าน
    const hash = await bcrypt.hash(password, 10);

    // 4. นำข้อมูลลงฐานข้อมูล
    await db.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hash]
    );

    // ส่งสถานะ 201 (Created) กลับไปเมื่อสร้างสำเร็จ
    return res.status(201).json({ message: "สมัครสมาชิกสำเร็จ" });

  } catch (error: any) {
    // 5. ดักจับ Error แจ้งเตือนกรณี Username ซ้ำ หรือ Database ล่ม
    console.error("Register Error:", error.message);

    // เช็ก Error Code ของ MySQL กรณีที่มีคนใช้ Username นี้ไปแล้ว (ต้องตั้งค่าให้คอลัมน์ username เป็น UNIQUE)
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Username นี้มีผู้ใช้งานแล้ว" });
    }

    // ถ้าเป็น Error อื่นๆ จาก Database ให้ส่ง 500 กลับไปทันที จะได้ไม่ค้าง 10 วินาที
    return res.status(500).json({ message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ (Internal Server Error)" });
  }
}