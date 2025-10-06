"use client";

import Image from "next/image";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiLock, FiMail } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo.png" // replace with your actual logo file in public/
            alt="PLASMIDA Logo"
            width={90}
            height={90}
            className="rounded-full"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome to PLASMIDA TrainMaster
        </h1>
        <p className="text-gray-500 mb-6">Sign in to continue</p>

        {/* Google Login */}
        <button className="flex items-center justify-center w-full gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-300 rounded-lg mb-4 px-3">
          <FiMail className="text-gray-400 text-lg" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-2 py-2 outline-none text-gray-700"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border border-gray-300 rounded-lg mb-6 px-3">
          <FiLock className="text-gray-400 text-lg" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-2 py-2 outline-none text-gray-700"
          />
        </div>

        {/* Submit */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Sign In
        </button>
      </div>
    </main>
  );
}
