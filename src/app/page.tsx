"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FiLock, FiMail } from "react-icons/fi";

export default function HomeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://plasmida.onrender.com/api/v1/plasmida/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend sends 500 when email or password is invalid
        setErrorMessage(data.message || "Invalid email or password");
        setLoading(false);
        return; // 🚫 Stop navigation
      }

      // ✅ Success
      console.log("Login successful:", data);

      // (Optional) Save token if available
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Navigate after success only
      router.push("/repository");

    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-white via-sky-50 to-white overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-36 top-6 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-36 bottom-6 h-80 w-80 rounded-full bg-sky-100/40 blur-3xl" />

      <section className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-sm bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-center mx-4">
        <div className="mx-auto mb-4 w-fit rounded-full bg-white p-2 ring-1 ring-slate-200 shadow-sm">
          <Image src="/images/logo.png" alt="PLASMIDA crest" width={84} height={84} className="rounded-full" priority />
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-0">Welcome to PLASMIDA TrainMaster</h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">Sign in to continue</p>

        <button
          type="button"
          className="flex h-11 items-center justify-center w-full gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
        >
          <FcGoogle className="text-xl" aria-hidden />
          <span className="text-sm font-medium text-slate-700">Continue with Google</span>
        </button>

        <div className="flex items-center my-5">
          <hr className="flex-1 border-slate-200" />
          <span className="px-3 text-slate-400 text-xs">OR</span>
          <hr className="flex-1 border-slate-200" />
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-center">
            <span className="text-sm text-slate-500 mb-2 inline-block">Email</span>
            <div className="mx-auto max-w-full">
              <div className="flex h-11 items-center gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 px-3">
                <FiMail className="text-slate-400 text-lg" aria-hidden />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  autoComplete="email"
                  required
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className="text-sm text-slate-500 mb-2 inline-block">Password</span>
            <div className="mx-auto max-w-full">
              <div className="flex h-11 items-center gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 px-3">
                <FiLock className="text-slate-400 text-lg" aria-hidden />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 rounded-xl font-semibold text-white transition ${
              loading ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-black"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
            <a href="#" className="hover:underline text-slate-600">Forgot password?</a>
            <p className="text-slate-600">
              Need an account?{" "}
              <Link href="/signup" className="font-medium text-slate-900 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
