"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BlogPost,
  BLOG_CATEGORIES,
} from "@/lib/blog-fallback";
import {
  getAdminPosts,
  togglePostPublishStatus,
  deletePost,
} from "@/lib/supabase";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Deletion modal state
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    try {
      const data = await getAdminPosts();
      setPosts(data || []);
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTogglePublish = async (post: BlogPost) => {
    const originalStatus = post.published;
    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, published: !originalStatus } : p))
    );

    const success = await togglePostPublishStatus(post.id, originalStatus);
    if (success) {
      showToast(
        `Article "${post.title.substring(0, 30)}..." marked as ${
          !originalStatus ? "Published" : "Draft"
        }.`
      );
    } else {
      // Revert on error
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, published: originalStatus } : p))
      );
      showToast("Failed to update status.");
    }
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);

    try {
      const success = await deletePost(postToDelete.id);
      if (success) {
        setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
        showToast("Article deleted successfully.");
      } else {
        showToast("Failed to delete article.");
      }
    } catch {
      showToast("An error occurred during deletion.");
    } finally {
      setIsDeleting(false);
      setPostToDelete(null);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && post.published) ||
        (statusFilter === "draft" && !post.published);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [posts, selectedCategory, statusFilter, searchQuery]);

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-[#4E3953] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base text-[#D46789]">
              info
            </span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#CFC3CC]/40 organic-shadow">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7B5A7E]">
            Content Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#4E3953]">
            All Educational Articles
          </h1>
          <p className="text-xs text-[#878787] font-light">
            Search, edit, toggle publish status, and manage patient articles.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 bg-[#7B5A7E] text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#4E3953] transition-all shadow-md shadow-[#7B5A7E]/20 active:scale-95 shrink-0"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Create New Article</span>
        </Link>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#CFC3CC]/40 organic-shadow flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, keyword, slug..."
            className="w-full px-4 py-2.5 pl-10 rounded-xl border border-[#CFC3CC]/60 text-xs text-[#464647] focus:outline-none focus:border-[#7B5A7E] focus:ring-2 focus:ring-[#7B5A7E]/20 transition-all bg-white"
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#878787] text-base">
            search
          </span>
        </div>

        {/* Category & Status Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-[#CFC3CC]/60 text-xs text-[#464647] font-medium bg-white focus:outline-none focus:border-[#7B5A7E]"
          >
            {BLOG_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>

          {/* Status Tabs */}
          <div className="inline-flex rounded-xl p-1 bg-[#FAF7F9] border border-[#CFC3CC]/40 text-xs font-semibold">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === "all"
                  ? "bg-white text-[#7B5A7E] shadow-xs font-bold"
                  : "text-[#878787] hover:text-[#4E3953]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === "published"
                  ? "bg-white text-[#2E7D32] shadow-xs font-bold"
                  : "text-[#878787] hover:text-[#4E3953]"
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                statusFilter === "draft"
                  ? "bg-white text-[#E65100] shadow-xs font-bold"
                  : "text-[#878787] hover:text-[#4E3953]"
              }`}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-3xl border border-[#CFC3CC]/40 organic-shadow overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#878787]">
            Loading articles...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-12 text-center space-y-3 p-6">
            <span className="material-symbols-outlined text-4xl text-[#C0A8C9]">
              search_off
            </span>
            <h3 className="text-base font-serif-display font-semibold text-[#4E3953]">
              No matching articles found
            </h3>
            <p className="text-xs text-[#878787]">
              Try adjusting your search keywords or active filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF7F9] text-[#878787] text-[11px] font-bold uppercase tracking-wider border-b border-[#CFC3CC]/30">
                  <th className="py-4 px-6">Article</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Status &amp; Toggle</th>
                  <th className="py-4 px-4">Views</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CFC3CC]/20 text-xs">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-[#FAF7F9]/60 transition-colors"
                  >
                    {/* Article Details + Image */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-xl bg-[#F3EEF5] overflow-hidden shrink-0 border border-[#CFC3CC]/30">
                          {post.cover_image ? (
                            <Image
                              src={post.cover_image}
                              alt={post.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#7B5A7E]/40">
                              <span className="material-symbols-outlined text-xl">
                                menu_book
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-0.5 max-w-sm">
                          <Link
                            href={`/admin/posts/edit/${post.id}`}
                            className="font-semibold text-[#4E3953] hover:text-[#7B5A7E] transition-colors line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          <p className="text-[11px] text-[#878787] truncate font-light">
                            /{post.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 text-[#7B5A7E] font-medium whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-[#7B5A7E]/10 text-[11px]">
                        {post.category}
                      </span>
                    </td>

                    {/* Status & 1-Click Toggle */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePublish(post)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            post.published ? "bg-[#2E7D32]" : "bg-[#CFC3CC]"
                          }`}
                          title={`Click to switch to ${
                            post.published ? "Draft" : "Published"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              post.published ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider ${
                            post.published ? "text-[#2E7D32]" : "text-[#E65100]"
                          }`}
                        >
                          {post.published ? "Live" : "Draft"}
                        </span>
                      </div>
                    </td>

                    {/* Views */}
                    <td className="py-4 px-4 text-[#878787] whitespace-nowrap font-medium">
                      {post.views_count || 0}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-[#878787] whitespace-nowrap">
                      {new Date(post.published_at || post.created_at).toLocaleDateString(
                        "en-IN",
                        { month: "short", day: "numeric", year: "numeric" }
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/posts/edit/${post.id}`}
                          className="p-2 text-[#7B5A7E] hover:bg-[#7B5A7E]/10 rounded-lg transition-colors"
                          title="Edit Article"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </Link>
                        {post.published && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 text-[#878787] hover:text-[#7B5A7E] hover:bg-[#FAF7F9] rounded-lg transition-colors"
                            title="View Public Page"
                          >
                            <span className="material-symbols-outlined text-lg">
                              visibility
                            </span>
                          </Link>
                        )}
                        <button
                          onClick={() => setPostToDelete(post)}
                          className="p-2 text-[#D46789] hover:text-[#A03055] hover:bg-[#FDF2F4] rounded-lg transition-colors"
                          title="Delete Article"
                        >
                          <span className="material-symbols-outlined text-lg">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {postToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#CFC3CC]/50 shadow-2xl space-y-6"
            >
              <div className="w-12 h-12 rounded-full bg-[#FDF2F4] text-[#A03055] flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-serif-display font-bold text-[#4E3953]">
                  Delete Article?
                </h3>
                <p className="text-xs text-[#878787] leading-relaxed">
                  Are you sure you want to permanently delete{" "}
                  <strong className="text-[#4E3953]">&ldquo;{postToDelete.title}&rdquo;</strong>?
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPostToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 py-3 rounded-xl border border-[#CFC3CC]/60 text-[#464647] font-semibold text-xs uppercase tracking-wider hover:bg-[#FAF7F9] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 rounded-xl bg-[#A03055] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#852544] transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isDeleting ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
