// pages/api/auth/login.ts
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req: any, res: any) {
  const { username, password } = req.body;

  const [rows]: any = await db.execute(
    "SELECT * FROM users WHERE username=?",
    [username]
  );

  if (rows.length === 0) return res.status(400).json({ msg: "ไม่พบ user" });

  const user = rows[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "รหัสผิด" });

  const token = jwt.sign({ id: user.id }, "secret");

  res.json({ token, userId: user.id });
}