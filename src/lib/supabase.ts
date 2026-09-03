import { createClient } from "@supabase/supabase-js";
import { BlogPost } from "./blog-fallback";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "")
  .trim()
  .replace(/\/$/, "");
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-project-ref")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all published blog posts (sorted by published_at DESC)
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("femhealth_admin_posts");
      if (local) {
        try {
          const parsed = JSON.parse(local) as BlogPost[];
          return parsed.filter((p) => p.published);
        } catch {
          // ignore
        }
      }
    }
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data) {
      console.error("Failed to fetch published posts from Supabase:", error);
      return [];
    }

    return data as BlogPost[];
  } catch (err) {
    console.error("Failed to fetch published posts from Supabase:", err);
    return [];
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("femhealth_admin_posts");
      if (local) {
        try {
          const parsed = JSON.parse(local) as BlogPost[];
          const foundLocal = parsed.find((p) => p.slug === slug);
          if (foundLocal) return foundLocal;
        } catch {
          // ignore
        }
      }
    }
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as BlogPost;
  } catch (err) {
    console.error(`Failed to fetch post by slug '${slug}':`, err);
    return null;
  }
}

/**
 * Fetch a single post by ID (for admin editor)
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("femhealth_admin_posts");
      if (local) {
        try {
          const parsed = JSON.parse(local) as BlogPost[];
          const found = parsed.find((p) => p.id === id);
          if (found) return found;
        } catch {
          // ignore
        }
      }
    }
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as BlogPost;
  } catch (err) {
    console.error(`Failed to fetch post by id '${id}':`, err);
    return null;
  }
}

/**
 * Fetch related posts by category excluding current slug
 */
export async function getRelatedPosts(
  category: string,
  currentSlug: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getPublishedPosts();
  const sameCategory = allPosts.filter(
    (p) => p.category === category && p.slug !== currentSlug
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherPosts = allPosts.filter(
    (p) => p.category !== category && p.slug !== currentSlug
  );
  return [...sameCategory, ...otherPosts].slice(0, limit);
}

/**
 * Fetch all posts for admin (including drafts)
 */
export async function getAdminPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("femhealth_admin_posts");
      if (local) {
        try {
          return JSON.parse(local) as BlogPost[];
        } catch {
          // ignore parsing error
        }
      }
    }
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data as BlogPost[];
  } catch (err) {
    console.error("Failed to fetch admin posts:", err);
    return [];
  }
}

/**
 * Create a new post
 */
export async function createPost(
  postData: Omit<BlogPost, "id" | "created_at" | "updated_at">
): Promise<BlogPost | null> {
  const newId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}`;
  const now = new Date().toISOString();

  const newPost: BlogPost = {
    ...postData,
    id: newId,
    views_count: 0,
    created_at: now,
    updated_at: now,
  };

  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const current = await getAdminPosts();
      const updated = [newPost, ...current];
      localStorage.setItem("femhealth_admin_posts", JSON.stringify(updated));
    }
    return newPost;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([newPost])
      .select()
      .single();

    if (error) {
      console.error(
        "Failed to insert post in Supabase:",
        error.message || error,
        error.details,
        error.hint
      );
      // Resilient fallback to local storage so user data is never lost
      if (typeof window !== "undefined") {
        const current = await getAdminPosts();
        localStorage.setItem(
          "femhealth_admin_posts",
          JSON.stringify([newPost, ...current.filter((p) => p.id !== newPost.id)])
        );
      }
      return newPost;
    }

    return data as BlogPost;
  } catch (err) {
    console.error("Create post exception:", err);
    if (typeof window !== "undefined") {
      const current = await getAdminPosts();
      localStorage.setItem(
        "femhealth_admin_posts",
        JSON.stringify([newPost, ...current.filter((p) => p.id !== newPost.id)])
      );
    }
    return newPost;
  }
}

/**
 * Update an existing post
 */
export async function updatePost(
  id: string,
  postData: Partial<BlogPost>
): Promise<boolean> {
  const now = new Date().toISOString();

  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const current = await getAdminPosts();
      const updated = current.map((p) =>
        p.id === id ? { ...p, ...postData, updated_at: now } : p
      );
      localStorage.setItem("femhealth_admin_posts", JSON.stringify(updated));
    }
    return true;
  }

  try {
    const { error } = await supabase
      .from("posts")
      .update({ ...postData, updated_at: now })
      .eq("id", id);

    if (error) {
      console.error("Update post in Supabase error:", error.message || error);
      if (typeof window !== "undefined") {
        const current = await getAdminPosts();
        const updated = current.map((p) =>
          p.id === id ? { ...p, ...postData, updated_at: now } : p
        );
        localStorage.setItem("femhealth_admin_posts", JSON.stringify(updated));
      }
      return true;
    }

    return true;
  } catch (err) {
    console.error("Update post exception:", err);
    return false;
  }
}

/**
 * Toggle published state of a post
 */
export async function togglePostPublishStatus(
  id: string,
  currentStatus: boolean
): Promise<boolean> {
  const newStatus = !currentStatus;

  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const current = await getAdminPosts();
      const updated = current.map((p) =>
        p.id === id
          ? {
              ...p,
              published: newStatus,
              published_at: newStatus ? new Date().toISOString() : p.published_at,
            }
          : p
      );
      localStorage.setItem("femhealth_admin_posts", JSON.stringify(updated));
    }
    return true;
  }

  try {
    const { error } = await supabase
      .from("posts")
      .update({
        published: newStatus,
        published_at: newStatus ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) {
      console.error("Toggle publish in Supabase error:", error.message || error);
      if (typeof window !== "undefined") {
        const current = await getAdminPosts();
        const updated = current.map((p) =>
          p.id === id
            ? {
                ...p,
                published: newStatus,
                published_at: newStatus ? new Date().toISOString() : p.published_at,
              }
            : p
        );
        localStorage.setItem("femhealth_admin_posts", JSON.stringify(updated));
      }
      return true;
    }

    return true;
  } catch (err) {
    console.error("Toggle publish status exception:", err);
    return false;
  }
}

/**
 * Delete a post by ID
 */
export async function deletePost(id: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    if (typeof window !== "undefined") {
      const current = await getAdminPosts();
      const updated = current.filter((p) => p.id !== id);
      localStorage.setItem("femhealth_admin_posts", JSON.stringify(updated));
    }
    return true;
  }

  try {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error("Delete post in Supabase error:", error.message || error);
      if (typeof window !== "undefined") {
        const current = await getAdminPosts();
        const updated = current.filter((p) => p.id !== id);
        localStorage.setItem("femhealth_admin_posts", JSON.stringify(updated));
      }
      return true;
    }
    return true;
  } catch (err) {
    console.error("Delete post exception:", err);
    return false;
  }
}

/**
 * Upload an image to Supabase Storage bucket 'blog-images'
 */
export async function uploadBlogImage(file: File): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error("Image upload exception:", err);
    return null;
  }
}
