"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signInAdmin } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("femhealthclinic@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await signInAdmin(email, password);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMessage(res.error || "Authentication failed. Please try again.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#FAF7F9] via-[#FDFBFC] to-[#F3EEF5] px-5 py-12">
      {/* Back to site link */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#7B5A7E] hover:text-[#4E3953] transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Main Site</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#CFC3CC]/50 shadow-2xl shadow-[#7B5A7E]/10 space-y-8"
      >
        {/* Header / Logo */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <Image
              src="/logo-desktop.png"
              alt="FemHealth Clinic"
              width={160}
              height={50}
              style={{ height: "auto" }}
              className="h-auto object-contain"
            />
          </div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#7B5A7E]/10 text-[#7B5A7E] text-[11px] font-bold uppercase tracking-widest">
            Admin Portal
          </div>
          <h1 className="text-2xl font-serif-display font-bold text-[#4E3953]">
            Doctor &amp; Staff Login
          </h1>
          <p className="text-xs text-[#878787] font-light">
            Sign in to manage patient education guides, articles, and clinical updates.
          </p>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-[#FDF2F4] border border-[#D46789]/30 text-[#A03055] text-xs leading-relaxed flex items-start gap-2.5"
          >
            <span className="material-symbols-outlined text-base shrink-0 mt-0.5">
              error
            </span>
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#4E3953] uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@femhealthclinic.in"
                className="w-full px-4 py-3 pl-10 rounded-xl border border-[#CFC3CC]/70 text-[#464647] text-sm focus:outline-none focus:border-[#7B5A7E] focus:ring-2 focus:ring-[#7B5A7E]/20 transition-all bg-white"
              />
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#878787] text-lg">
                mail
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#4E3953] uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pl-10 pr-10 rounded-xl border border-[#CFC3CC]/70 text-[#464647] text-sm focus:outline-none focus:border-[#7B5A7E] focus:ring-2 focus:ring-[#7B5A7E]/20 transition-all bg-white"
              />
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#878787] text-lg">
                lock
              </span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#878787] text-lg hover:text-[#4E3953]"
              >
                {showPassword ? "visibility_off" : "visibility"}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#7B5A7E] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#4E3953] transition-all shadow-md shadow-[#7B5A7E]/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Database Status Footer Info */}
        <div className="pt-4 border-t border-[#CFC3CC]/30 text-center">
          <p className="text-[11px] text-[#878787] flex items-center justify-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isSupabaseConfigured ? "bg-green-500" : "bg-amber-500"
              }`}
            />
            <span>
              {isSupabaseConfigured
                ? "Connected to Supabase Production"
                : "Development Mode (Local Session Ready)"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
