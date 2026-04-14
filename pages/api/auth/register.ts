// pages/api/auth/register.ts
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function handler(req: any, res: any) {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await db.execute(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [username, hash]
  );

  res.json({ message: "สมัครสำเร็จ" });
}