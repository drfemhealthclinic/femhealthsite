"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/ui/Motion";
import {
  BlogPost,
  BLOG_CATEGORIES,
  BlogCategory,
} from "@/lib/blog-fallback";
import { getPublishedPosts } from "@/lib/supabase";
import { CLINIC } from "@/lib/clinic";

export default function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fetched = await getPublishedPosts();
        setPosts(fetched || []);
      } catch (err) {
        console.error("Error loading blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    // Read initial URL params (?category=..., ?tag=..., ?q=...)
    function readUrlParams() {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      const tagParam = params.get("tag");
      const qParam = params.get("q");

      if (catParam) {
        const matched = BLOG_CATEGORIES.find(
          (c) => c.toLowerCase() === catParam.trim().toLowerCase()
        );
        if (matched) {
          setSelectedCategory(matched);
        } else {
          setSearchQuery(catParam);
        }
      }

      if (tagParam) {
        setSearchQuery(tagParam);
      } else if (qParam) {
        setSearchQuery(qParam);
      }
    }

    readUrlParams();
    window.addEventListener("popstate", readUrlParams);
    return () => window.removeEventListener("popstate", readUrlParams);
  }, []);

  const handleSelectCategory = (cat: BlogCategory) => {
    setSelectedCategory(cat);
    if (typeof window !== "undefined") {
      const url = cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`;
      window.history.replaceState(null, "", url);
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/blog?tag=${encodeURIComponent(tag)}`);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/blog");
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (post.category || "").trim().toLowerCase() ===
        selectedCategory.trim().toLowerCase();

      const rawQ = searchQuery.toLowerCase().trim();
      if (!rawQ) return matchesCategory;

      const qClean = rawQ.replace(/^#/, "").trim();
      const tags = Array.isArray(post.tags) ? post.tags : [];

      // Check exact query or clean query against all key fields including full body content
      const searchBlob = [
        post.title || "",
        post.excerpt || "",
        post.content || "",
        post.category || "",
        ...tags,
      ]
        .join(" ")
        .toLowerCase();

      // Check if entire query matches, or each individual term matches
      const terms = qClean.split(/\s+/).filter(Boolean);
      const matchesSearch =
        searchBlob.includes(rawQ) ||
        searchBlob.includes(qClean) ||
        (terms.length > 1 && terms.every((t) => searchBlob.includes(t)));

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFCFD]">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        {/* Hero Section */}
        <section className="px-5 md:px-12 py-12 md:py-16 max-w-7xl mx-auto text-center space-y-5">
          <FadeIn direction="up">
            <span className="text-xs uppercase tracking-widest text-[#D46789] font-bold">
              Evidence-Based Women&apos;s Health
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display text-[#4E3953] max-w-4xl mx-auto leading-tight font-semibold">
              Medical Insights &amp; Patient Education
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-[#464647] max-w-2xl mx-auto leading-relaxed font-light">
              Clear, compassionate, and doctor-authored guides on maternity, fertility, laparoscopic surgery, and hormonal health by Dr. Pooja Wadgaonkar Patil.
            </p>
          </FadeIn>

          {/* Search & Category Filter Controls */}
          <FadeIn direction="up" delay={0.3}>
            <div className="pt-6 max-w-2xl mx-auto space-y-5">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by topic, condition, or keyword..."
                  className="w-full px-5 py-3.5 pl-12 rounded-full border border-[#CFC3CC]/60 bg-white text-[#464647] placeholder:text-[#878787] text-sm focus:outline-none focus:border-[#7B5A7E] focus:ring-2 focus:ring-[#7B5A7E]/20 shadow-sm transition-all"
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#7B5A7E]/70 text-xl">
                  search
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#878787] hover:text-[#4E3953] bg-[#EFEDEE] px-2 py-0.5 rounded-full cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {BLOG_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleSelectCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${isSelected
                          ? "bg-[#7B5A7E] text-white shadow-md shadow-[#7B5A7E]/20 scale-105"
                          : "bg-white border border-[#CFC3CC]/50 text-[#464647] hover:border-[#7B5A7E] hover:text-[#7B5A7E]"
                        }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Active Filter Indicators */}
              {(searchQuery || selectedCategory !== "All") && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
                  <span className="text-[#878787]">Active filter:</span>
                  {selectedCategory !== "All" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7B5A7E]/10 text-[#7B5A7E] font-semibold">
                      <span>Category: {selectedCategory}</span>
                      <button
                        type="button"
                        onClick={() => handleSelectCategory("All")}
                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                        aria-label="Clear category filter"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D46789]/10 text-[#D46789] font-semibold">
                      <span>Tag: #{searchQuery}</span>
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                        aria-label="Clear search filter"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-[11px] text-[#878787] hover:text-[#4E3953] underline ml-1 cursor-pointer"
                  >
                    Reset all
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
        </section>

        {/* Featured Spotlight (Only if No Search Query and "All" category is selected) */}
        {!searchQuery && selectedCategory === "All" && featuredPost && (
          <section className="px-5 md:px-12 max-w-7xl mx-auto mb-16">
            <FadeIn direction="up">
              <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <div className="bg-white rounded-3xl overflow-hidden border border-[#CFC3CC]/50 organic-shadow hover:shadow-2xl hover:border-[#D46789]/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left Column: Image */}
                  <div className="lg:col-span-7 relative h-72 lg:h-[420px] bg-[#F3EEF5] overflow-hidden">
                    {featuredPost.cover_image && (
                      <Image
                        src={featuredPost.cover_image}
                        alt={featuredPost.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute top-5 left-5 bg-[#7B5A7E] text-white px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      Featured Guide
                    </div>
                  </div>

                  {/* Right Column: Details */}
                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6 bg-gradient-to-br from-white to-[#FDFBFC]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs text-[#878787] font-medium">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const matched = BLOG_CATEGORIES.find(
                              (c) => c.toLowerCase() === (featuredPost.category || "").trim().toLowerCase()
                            );
                            if (matched) handleSelectCategory(matched);
                            else handleTagClick(featuredPost.category);
                          }}
                          className="text-[#D46789] hover:underline font-bold uppercase tracking-wider cursor-pointer"
                        >
                          {featuredPost.category}
                        </button>
                        <span>•</span>
                        <span>{featuredPost.reading_time}</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-serif-display font-bold text-[#4E3953] group-hover:text-[#7B5A7E] transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-sm lg:text-base text-[#464647] font-light leading-relaxed">
                        {featuredPost.excerpt}
                      </p>

                      {/* Featured Tags */}
                      {featuredPost.tags && featuredPost.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {featuredPost.tags.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleTagClick(t);
                              }}
                              className="text-xs px-3 py-1 rounded-full bg-[#F3EEF5] hover:bg-[#7B5A7E] hover:text-white text-[#7B5A7E] font-medium transition-colors cursor-pointer"
                            >
                              #{t}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-[#CFC3CC]/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#D46789]/30 shadow-xs bg-[#F3EEF5]">
                          <Image
                            src="/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"
                            alt={featuredPost.author_name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#4E3953]">
                            {featuredPost.author_name}
                          </p>
                          <p className="text-[10px] text-[#878787]">
                            Consultant Gynaecologist
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B5A7E] group-hover:translate-x-1 transition-transform">
                        Read Full Article
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </section>
        )}

        {/* Articles Grid */}
        <section className="px-5 md:px-12 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#CFC3CC]/30">
            <h2 className="text-xl font-serif-display font-semibold text-[#4E3953]">
              {selectedCategory === "All" ? "All Educational Articles" : `${selectedCategory} Articles`}
              <span className="ml-2 text-xs font-normal text-[#878787]">
                ({filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"})
              </span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#CFC3CC]/30 p-8 space-y-4">
              <span className="material-symbols-outlined text-5xl text-[#C0A8C9]">
                article_shortcut
              </span>
              <h3 className="text-xl font-serif-display text-[#4E3953]">
                No articles found
              </h3>
              <p className="text-sm text-[#878787] max-w-md mx-auto font-light">
                We couldn&apos;t find any articles matching your search criteria. Try adjusting your keywords or clearing the category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-2 inline-flex items-center gap-2 bg-[#7B5A7E] text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#4E3953] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <article className="bg-white rounded-2xl overflow-hidden border border-[#CFC3CC]/40 organic-shadow hover:shadow-xl hover:border-[#D46789]/40 transition-all duration-300 flex flex-col h-full hover:-translate-y-1.5">
                        {/* Image Container */}
                        <div className="relative w-full h-52 bg-[#F3EEF5] overflow-hidden">
                          {post.cover_image ? (
                            <Image
                              src={post.cover_image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#7B5A7E]/40">
                              <span className="material-symbols-outlined text-5xl">menu_book</span>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const matched = BLOG_CATEGORIES.find(
                                (c) => c.toLowerCase() === (post.category || "").trim().toLowerCase()
                              );
                              if (matched) handleSelectCategory(matched);
                              else handleTagClick(post.category);
                            }}
                            className="absolute top-3 left-3 bg-[#FDFBFC]/95 hover:bg-[#7B5A7E] hover:text-white backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#D46789] uppercase tracking-wider shadow-sm transition-colors cursor-pointer z-10"
                          >
                            {post.category}
                          </button>
                        </div>

                        {/* Content Details */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-3 text-xs text-[#878787]">
                              <span>
                                {new Date(post.published_at || post.created_at).toLocaleDateString("en-IN", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                              <span>•</span>
                              <span>{post.reading_time}</span>
                            </div>
                            <h3 className="text-lg font-serif-display font-semibold text-[#4E3953] group-hover:text-[#7B5A7E] transition-colors leading-snug line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#464647] leading-relaxed line-clamp-3 font-light">
                              {post.excerpt}
                            </p>

                            {/* Clickable Tags on Card */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {post.tags.slice(0, 3).map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleTagClick(t);
                                    }}
                                    className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F3EEF5] hover:bg-[#7B5A7E] hover:text-white text-[#7B5A7E] font-medium transition-colors cursor-pointer"
                                  >
                                    #{t}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Footer tags and link */}
                          <div className="pt-4 border-t border-[#CFC3CC]/20 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-[#D46789]/30 bg-[#F3EEF5]">
                                <Image
                                  src="/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"
                                  alt={post.author_name}
                                  fill
                                  className="object-cover object-top"
                                />
                              </div>
                              <span className="text-[11px] font-semibold text-[#878787]">
                                By {post.author_name}
                              </span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7B5A7E] group-hover:translate-x-1 transition-transform">
                              <span>Read</span>
                              <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* Consultation Call to Action */}
        <section className="px-5 md:px-12 max-w-7xl mx-auto mt-24">
          <FadeIn direction="up">
            <div className="rounded-3xl bg-gradient-to-br from-[#4E3953] to-[#7B5A7E] text-white p-8 md:p-14 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-center md:text-left z-10">
                <span className="text-xs uppercase tracking-widest text-[#E6C2D6] font-bold">
                  Personalised Care
                </span>
                <h3 className="text-2xl md:text-4xl font-serif-display font-bold leading-tight">
                  Have questions about your specific condition?
                </h3>
                <p className="text-sm md:text-base text-[#FDFBFC]/90 font-light leading-relaxed">
                  Book a confidential, one-on-one consultation with Dr. Pooja Wadgaonkar Patil at FemHealth Clinic Hinjawadi or partner hospitals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 z-10 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto text-center bg-white text-[#7B5A7E] hover:bg-[#FAF7F9] px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95"
                >
                  Book Appointment
                </Link>
                <a
                  href={`${CLINIC.whatsappHref}?text=${encodeURIComponent("Hello Dr. Pooja, I would like to inquire about a consultation")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center border border-white/40 hover:bg-white/10 text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                >
                  WhatsApp Clinic
                </a>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  );
}
