"use client";

import { useEffect, useState } from "react";
import { Question } from "@/types";

export default function Game() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) window.location.href = "/login";

    fetch("/api/game/questions", { cache: "no-store" })
      .then(res => res.json())
      .then(setQuestions);
  }, []);

  const answer = (choice: string) => {
    const newScore =
      choice === questions[i].correct_answer ? score + 1 : score;

    if (choice === questions[i].correct_answer) {
      setScore(newScore);
    }

    if (i + 1 < questions.length) {
      setI(i + 1);
    } else {
      localStorage.setItem("score", newScore.toString());
      window.location.href = "/result";
    }
  };

  if (!questions.length) return <p className="text-white">Loading...</p>;

  const q = questions[i];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px] text-center">
      <h1 className="text-2xl font-bold mb-4">🎮 Quiz Game</h1>

      <p className="text-gray-600 mb-2">
        ข้อ {i + 1} / {questions.length}
      </p>

      <h2 className="text-lg font-semibold mb-4">{q.question}</h2>

      <div className="grid gap-3">
        {["A", "B", "C", "D"].map((opt) => (
          <button
            key={opt}
            onClick={() => answer(opt)}
            className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition"
          >
            {q[`option_${opt.toLowerCase()}` as keyof Question]}
          </button>
        ))}
      </div>

      <p className="mt-4 font-bold">คะแนน: {score}</p>

      <button
        className="mt-4 text-sm text-gray-500 underline"
        onClick={() => {
          localStorage.removeItem("userId");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}