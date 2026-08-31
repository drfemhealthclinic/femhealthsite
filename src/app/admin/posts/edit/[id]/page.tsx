"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PostEditorForm from "@/components/admin/PostEditorForm";
import { BlogPost } from "@/lib/blog-fallback";
import { getPostById } from "@/lib/supabase";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        const found = await getPostById(id);
        if (found) {
          setPost(found);
        } else {
          router.push("/admin/posts");
        }
      } catch (err) {
        console.error("Failed to load post for editing:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3">
        <div className="w-8 h-8 border-3 border-[#7B5A7E] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#878787] uppercase tracking-wider font-semibold">
          Loading article data...
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-[#CFC3CC]/40 text-center space-y-4 max-w-md mx-auto my-12">
        <h2 className="text-xl font-serif-display font-bold text-[#4E3953]">
          Article Not Found
        </h2>
        <p className="text-xs text-[#878787]">
          The article you requested could not be retrieved from the database.
        </p>
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 bg-[#7B5A7E] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
        >
          Back to Articles
        </Link>
      </div>
    );
  }

  return <PostEditorForm initialData={post} isEditing={true} />;
}
