"use client";

import { useEffect, useState } from "react";

export default function Result() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) window.location.href = "/login";

    const s = localStorage.getItem("score");
    setScore(Number(s));
  }, []);

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
      <h1 className="text-3xl font-bold">🎉 จบเกม</h1>

      <p className="text-xl mt-4">คะแนนของคุณ</p>
      <p className="text-4xl font-bold text-indigo-600">{score}</p>

      <a
        href="/"
        className="block mt-6 bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
      >
        เล่นใหม่
      </a>
    </div>
  );
}