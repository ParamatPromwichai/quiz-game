"use client";

import { useState } from "react";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ username: u, password: p })
    });

    const data = await res.json();

    if (data.userId) {
      localStorage.setItem("userId", data.userId);
      window.location.href = "/";
    } else {
      alert("ล็อกอินไม่สำเร็จ");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px]">
      <h1 className="text-2xl font-bold text-center mb-5">🔐 Login</h1>

      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Username"
        onChange={(e)=>setU(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-2 border rounded mb-3"
        placeholder="Password"
        onChange={(e)=>setP(e.target.value)}
      />

      <button
        onClick={login}
        className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
      >
        Login
      </button>

      <p className="text-center mt-3 text-sm">
        ไม่มีบัญชี? <a href="/register" className="text-blue-500">สมัคร</a>
      </p>
    </div>
  );
}