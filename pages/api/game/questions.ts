// pages/api/game/questions.ts
import { db } from "@/lib/db";

export default async function handler(req: any, res: any) {
  const [rows] = await db.execute("SELECT * FROM questions ORDER BY RAND()");
  res.json(rows);
}