"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { checkAdminSession, signOutAdmin } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    async function verifyAuth() {
      if (isLoginPage) {
        setIsAuthenticated(true);
        return;
      }

      const session = await checkAdminSession();
      if (!session) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    }

    verifyAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await signOutAdmin();
    router.push("/admin/login");
  };

  // If on login page, render directly
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while checking session
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F9]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#7B5A7E] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-[#7B5A7E] uppercase tracking-wider">
            Loading Admin Portal...
          </span>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "dashboard" },
    { name: "All Articles", href: "/admin/posts", icon: "article" },
    { name: "New Article", href: "/admin/posts/new", icon: "edit_document" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8F6F8]">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex md:w-64 flex-col justify-between bg-white border-r border-[#CFC3CC]/50 p-6 z-20 shrink-0">
        <div className="space-y-8">
          {/* Brand Logo */}
          <Link href="/admin" className="block">
            <Image
              src="/logo-desktop.png"
              alt="FemHealth Clinic"
              width={150}
              height={45}
              style={{ height: "auto" }}
              className="h-auto object-contain"
            />
            <div className="mt-2 text-[10px] uppercase font-bold tracking-widest text-[#D46789]">
              Admin Control Center
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-[#7B5A7E] text-white shadow-md shadow-[#7B5A7E]/20"
                      : "text-[#464647] hover:bg-[#FAF7F9] hover:text-[#7B5A7E]"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* External Quick Links */}
          <div className="pt-6 border-t border-[#CFC3CC]/30 space-y-2">
            <span className="text-[10px] font-bold text-[#878787] uppercase tracking-wider px-4">
              Website Links
            </span>
            <Link
              href="/blog"
              target="_blank"
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold text-[#464647] hover:text-[#7B5A7E] hover:bg-[#FAF7F9] transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-base text-[#7B5A7E]">
                  open_in_new
                </span>
                <span>View Public Blog</span>
              </span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold text-[#464647] hover:text-[#7B5A7E] hover:bg-[#FAF7F9] transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-base text-[#7B5A7E]">
                  home
                </span>
                <span>Main Website</span>
              </span>
            </Link>
          </div>
        </div>

        {/* User Profile & Logout */}
        <div className="pt-6 border-t border-[#CFC3CC]/40 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#D46789]/30 shadow-sm bg-[#F3EEF5]">
              <Image
                src="/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"
                alt="Dr. Pooja Wadgaonkar"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#4E3953] truncate">
                Dr. Pooja Wadgaonkar
              </p>
              <p className="text-[10px] text-[#878787] truncate">
                Clinic Administrator
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#D46789]/30 text-[#A03055] hover:bg-[#FDF2F4] text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-[#CFC3CC]/50 px-5 py-4 flex items-center justify-between z-30 sticky top-0">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo-desktop.png"
            alt="FemHealth Clinic"
            width={120}
            height={36}
            style={{ height: "auto" }}
            className="h-auto object-contain"
          />
          <span className="text-[10px] font-bold text-[#7B5A7E] uppercase">
            Admin
          </span>
        </Link>

        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="text-[#7B5A7E] p-1.5 focus:outline-none"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileNavOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-[#CFC3CC]/50 p-5 space-y-3 shadow-lg z-20"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileNavOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                pathname === item.href
                  ? "bg-[#7B5A7E] text-white"
                  : "text-[#464647]"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          ))}

          <div className="pt-3 border-t border-[#CFC3CC]/30 flex items-center justify-between">
            <Link
              href="/blog"
              target="_blank"
              className="text-xs font-semibold text-[#7B5A7E]"
            >
              Public Blog ↗
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-[#A03055]"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
