// pages/api/auth/login.ts
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. อนุญาตเฉพาะ POST Request เท่านั้น
  if (req.method !== "POST") {
    return res.status(405).json({ msg: "Method Not Allowed" });
  }

  try {
    const { username, password } = req.body;

    // ตรวจสอบว่าส่งค่ามาครบไหม
    if (!username || !password) {
      return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    // 2. ดึงข้อมูล User จาก Database
    const [rows]: any = await db.execute(
      "SELECT * FROM users WHERE username=?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(400).json({ msg: "ไม่พบ user" });
    }

    const user = rows[0];

    // 3. ตรวจสอบรหัสผ่านกับค่า Hash
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "รหัสผ่านไม่ถูกต้อง" });
    }

    // 4. สร้าง Token (แนะนำให้ไปตั้งค่า JWT_SECRET ในหน้า Environment Variables ของ Vercel)
    // แล้วตั้งเวลาหมดอายุของ Token ด้วย เช่น 1 วัน ('1d')
    const secretKey = process.env.JWT_SECRET || "fallback_secret_for_dev";
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1d" });

    // ส่ง Token และ ID กลับไปให้ฝั่ง Frontend
    return res.status(200).json({ token, userId: user.id });

  } catch (error: any) {
    // 5. ดักจับ Error (ถ้า Railway ล่ม หรือเชื่อมต่อไม่ได้ จะฟ้องตรงนี้)
    console.error("Login Error:", error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}