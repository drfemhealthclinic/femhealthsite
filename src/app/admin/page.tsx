"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/blog-fallback";
import { getAdminPosts, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAdminPosts();
        setPosts(data || []);
      } catch (err) {
        console.error("Error loading admin stats:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.published).length;
  const draftPosts = posts.filter((p) => !p.published).length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views_count || 0), 0);

  const stats = [
    {
      title: "Total Articles",
      value: totalPosts,
      icon: "article",
      color: "text-[#7B5A7E]",
      bg: "bg-[#7B5A7E]/10",
    },
    {
      title: "Published Online",
      value: publishedPosts,
      icon: "check_circle",
      color: "text-[#2E7D32]",
      bg: "bg-[#E8F5E9]",
    },
    {
      title: "Drafts in Progress",
      value: draftPosts,
      icon: "edit_note",
      color: "text-[#E65100]",
      bg: "bg-[#FFF3E0]",
    },
    {
      title: "Estimated Patient Views",
      value: totalViews.toLocaleString(),
      icon: "visibility",
      color: "text-[#0288D1]",
      bg: "bg-[#E1F5FE]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#CFC3CC]/40 organic-shadow">
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D46789]">
            Overview Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#4E3953]">
            Welcome, Dr. Pooja Wadgaonkar Patil
          </h1>
          <p className="text-xs sm:text-sm text-[#878787] font-light">
            Manage medical educational guides, high-risk maternity advice, and patient resources.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-[#7B5A7E] text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#4E3953] transition-all shadow-md shadow-[#7B5A7E]/20 active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-6 rounded-2xl border border-[#CFC3CC]/40 organic-shadow flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}
            >
              <span className="material-symbols-outlined text-2xl">
                {stat.icon}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#878787] uppercase tracking-wider">
                {stat.title}
              </p>
              <p className="text-2xl font-serif-display font-bold text-[#4E3953] mt-0.5">
                {loading ? "..." : stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Articles Section */}
      <div className="bg-white rounded-3xl border border-[#CFC3CC]/40 organic-shadow overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-[#CFC3CC]/30 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif-display font-bold text-[#4E3953]">
              Recent Articles
            </h2>
            <p className="text-xs text-[#878787]">
              Latest published and drafted patient education content.
            </p>
          </div>
          <Link
            href="/admin/posts"
            className="text-xs font-bold text-[#7B5A7E] hover:underline flex items-center gap-1"
          >
            <span>View All ({totalPosts})</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F9] text-[#878787] text-[11px] font-bold uppercase tracking-wider border-b border-[#CFC3CC]/30">
                <th className="py-3.5 px-6">Article Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CFC3CC]/20 text-xs">
              {posts.slice(0, 5).map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-[#FAF7F9]/50 transition-colors"
                >
                  <td className="py-4 px-6 font-semibold text-[#4E3953]">
                    <div className="max-w-md line-clamp-1">{post.title}</div>
                    <span className="text-[11px] text-[#878787] font-normal">
                      /{post.slug}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#7B5A7E] font-medium whitespace-nowrap">
                    {post.category}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        post.published
                          ? "bg-[#E8F5E9] text-[#2E7D32]"
                          : "bg-[#FFF3E0] text-[#E65100]"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#878787] whitespace-nowrap">
                    {new Date(post.published_at || post.created_at).toLocaleDateString(
                      "en-IN",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/edit/${post.id}`}
                        className="px-3 py-1.5 rounded-lg border border-[#CFC3CC]/60 text-[#7B5A7E] hover:bg-[#7B5A7E] hover:text-white transition-all font-semibold"
                      >
                        Edit
                      </Link>
                      {post.published && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-[#878787] hover:text-[#7B5A7E] transition-colors"
                          title="View Live"
                        >
                          <span className="material-symbols-outlined text-lg">
                            visibility
                          </span>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Database Integration Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-white to-[#FAF7F9] border border-[#CFC3CC]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isSupabaseConfigured
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            <span className="material-symbols-outlined text-xl">
              {isSupabaseConfigured ? "cloud_done" : "cloud_sync"}
            </span>
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#4E3953] uppercase tracking-wider">
              {isSupabaseConfigured
                ? "Supabase Database Live"
                : "Local Fallback Environment Active"}
            </h3>
            <p className="text-xs text-[#878787]">
              {isSupabaseConfigured
                ? "Articles and image assets are synchronizing in real time with PostgreSQL."
                : "To link cloud storage, add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"}
            </p>
          </div>
        </div>
        <Link
          href="/admin/posts/new"
          className="text-xs font-bold text-[#7B5A7E] hover:underline shrink-0"
        >
          Write New Guide →
        </Link>
      </div>
    </div>
  );
}
