"use client";

import Image from "next/image";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiLock, FiMail } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gray-50 overflow-hidden">
      {/* Decorative background blobs */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-lg shadow-slate-200/60 p-8 md:p-10 text-center">
        {/* Logo */}
        <div className="mx-auto mb-4 w-fit rounded-full bg-white p-2 ring-1 ring-slate-200 shadow-sm">
          <Image
            src="/globe.svg"
            alt="PLASMIDA Logo"
            width={88}
            height={88}
            className="rounded-full"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-1">
          Welcome to PLASMIDA TrainMaster
        </h1>
        <p className="text-gray-500 mb-6">Sign in to continue</p>

        {/* Google Login */}
        <button className="flex h-11 items-center justify-center w-full gap-2 rounded-xl border border-gray-300 ring-1 ring-slate-200 hover:bg-gray-100 transition-colors">
          <FcGoogle className="text-xl" aria-hidden />
          <span className="text-sm font-medium text-gray-700">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400 text-xs">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Email */}
        <label className="block text-left">
          <span className="sr-only">Email</span>
          <div className="flex h-11 items-center gap-2 rounded-xl bg-gray-50 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500 px-3 mb-4">
            <FiMail className="text-gray-400 text-lg" aria-hidden />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              autoComplete="email"
              aria-label="Email"
            />
          </div>
        </label>

        {/* Password */}
        <label className="block text-left">
          <span className="sr-only">Password</span>
          <div className="flex h-11 items-center gap-2 rounded-xl bg-gray-50 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500 px-3 mb-6">
            <FiLock className="text-gray-400 text-lg" aria-hidden />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              autoComplete="current-password"
              aria-label="Password"
            />
          </div>
        </label>

        {/* Submit */}
        <button className="w-full h-11 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm">
          Sign In
        </button>
      </div>
    </main>
  );
}
