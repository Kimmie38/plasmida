"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiLock, FiMail } from "react-icons/fi";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-white via-sky-50 to-white overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-36 top-6 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-36 bottom-6 h-80 w-80 rounded-full bg-sky-100/40 blur-3xl" />

      <section className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:underline">
            <FiArrowLeft className="text-base" aria-hidden />
            Back to sign in
          </Link>
        </div>

        <div className="mx-auto my-4 w-fit rounded-full bg-white p-2 ring-1 ring-slate-200 shadow-sm">
          <Image src="/images/logo.png" alt="PLASMIDA crest" width={68} height={68} className="rounded-full" priority />
        </div>

        <h2 className="text-lg font-semibold text-slate-800 mb-2">Create your account</h2>

        <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
          <div className="text-left">
            <span className="text-sm text-slate-500 mb-2 inline-block">Email</span>
            <div className="mt-1">
              <div className="flex h-11 items-center gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 px-3">
                <FiMail className="text-slate-400 text-lg" aria-hidden />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  autoComplete="email"
                  aria-label="Email"
                />
              </div>
            </div>
          </div>

          <div className="text-left">
            <span className="text-sm text-slate-500 mb-2 inline-block">Password</span>
            <div className="mt-1">
              <div className="flex h-11 items-center gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 px-3">
                <FiLock className="text-slate-400 text-lg" aria-hidden />
                <input
                  type="password"
                  placeholder="Choose a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  autoComplete="new-password"
                  aria-label="Password"
                />
              </div>
            </div>
          </div>

          <div className="text-left">
            <span className="text-sm text-slate-500 mb-2 inline-block">Confirm Password</span>
            <div className="mt-1">
              <div className="flex h-11 items-center gap-3 rounded-xl bg-white ring-1 ring-slate-200 px-3">
                <FiLock className="text-slate-300 text-lg" aria-hidden />
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  autoComplete="new-password"
                  aria-label="Confirm Password"
                />
              </div>
            </div>
          </div>

          <button className="w-full h-11 bg-slate-900 text-white rounded-xl font-semibold hover:bg-black transition">Create account</button>
        </form>
      </section>
    </main>
  );
}
