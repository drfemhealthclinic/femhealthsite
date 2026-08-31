"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { BlogPost, FALLBACK_POSTS } from "@/lib/blog-fallback";
import { getPublishedPosts } from "@/lib/supabase";

export default function PatientEducation() {
  const [posts, setPosts] = useState<BlogPost[]>(FALLBACK_POSTS.slice(0, 3));

  useEffect(() => {
    async function loadLatest() {
      try {
        const published = await getPublishedPosts();
        if (published && published.length > 0) {
          setPosts(published.slice(0, 3));
        }
      } catch (e) {
        console.error("Failed to load home blog preview:", e);
      }
    }
    loadLatest();
  }, []);

  return (
    <section className="px-5 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
      <FadeIn direction="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#7B5A7E] font-bold">
              Learn &amp; Empower
            </span>
            <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953]">
              Patient Education &amp; Insights
            </h2>
            <p className="text-sm md:text-base text-[#464647] max-w-xl">
              Evidence-based clinical guides and articles by Dr. Pooja Wadgaonkar Patil to empower you at every stage of your health journey.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#7B5A7E] hover:text-[#4E3953] transition-colors group self-start md:self-auto"
          >
            <span>View All Articles</span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.1}>
        {posts.map((post) => (
          <StaggerItem key={post.id}>
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-white rounded-2xl overflow-hidden border border-[#CFC3CC]/40 organic-shadow hover:shadow-xl hover:border-[#7B5A7E]/40 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative w-full h-48 bg-[#F3EEF5] overflow-hidden">
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#7B5A7E]/40">
                      <span className="material-symbols-outlined text-5xl">menu_book</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-[#FDFBFC]/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#7B5A7E] uppercase tracking-wider shadow-sm">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-xs text-[#878787]">
                      <span>{new Date(post.published_at || post.created_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>•</span>
                      <span>{post.reading_time}</span>
                    </div>
                    <h3 className="text-lg font-serif-display font-semibold text-[#4E3953] group-hover:text-[#7B5A7E] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#464647] leading-relaxed line-clamp-3 font-light">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#CFC3CC]/20 flex items-center justify-between text-xs font-semibold text-[#7B5A7E]">
                    <span>Read Guide</span>
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1.5 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
