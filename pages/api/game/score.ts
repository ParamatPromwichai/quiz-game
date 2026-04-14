// pages/api/game/score.ts
import { db } from "@/lib/db";

export default async function handler(req: any, res: any) {
  const { userId, score } = req.body;

  await db.execute(
    "INSERT INTO scores (user_id, score) VALUES (?,?)",
    [userId, score]
  );

  res.json({ message: "บันทึกแล้ว" });
}