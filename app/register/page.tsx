"use client";

import { useState } from "react";

export default function Register() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  const register = async () => {
    await fetch("/api/auth/register", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ username: u, password: p })
    });

    alert("สมัครสำเร็จ");
    window.location.href = "/login";
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px]">
      <h1 className="text-2xl font-bold text-center mb-5">📝 Register</h1>

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
        onClick={register}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        สมัครสมาชิก
      </button>
    </div>
  );
}