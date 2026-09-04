"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost, BLOG_CATEGORIES } from "@/lib/blog-fallback";
import { createPost, updatePost, uploadBlogImage } from "@/lib/supabase";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface PostEditorFormProps {
  initialData?: BlogPost;
  isEditing?: boolean;
}

/** One content section the doctor fills in. */
interface Section {
  id: string;
  type: "paragraph" | "bullets" | "doctorTip";
  heading: string;
  body: string; // plain text — bullets are one-per-line
}

/* ─────────────────────────────────────────────
   Photo presets
   ───────────────────────────────────────────── */

const PHOTO_PRESETS = [
  {
    label: "Maternity",
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Surgery",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Wellness",
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
  },
  {
    label: "Fertility",
    url: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=1200&auto=format&fit=crop",
  },
];

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */

let _idCounter = 0;
function uid() {
  return `s-${Date.now()}-${++_idCounter}`;
}

/** Parse existing HTML content back into structured sections for editing. */
function parseContentToSections(html: string): Section[] {
  if (!html || !html.trim()) return defaultSections();

  const sections: Section[] = [];
  // Very simple tag-based parser — no DOM needed
  const parts = html.split(/<h2>(.*?)<\/h2>/gi);

  // parts[0] = text before first h2 (usually empty / whitespace)
  // parts[1] = first h2 text, parts[2] = body until next h2, ...
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i]?.trim() || "";
    const bodyHtml = parts[i + 1] || "";

    // Check for clinical-callout
    const calloutMatch = bodyHtml.match(
      /<div class="clinical-callout"[^>]*>[\s\S]*?<strong>.*?<\/strong>\s*([\s\S]*?)\s*<\/div>/i
    );

    // Check for ul/li list
    const listMatch = bodyHtml.match(/<ul>([\s\S]*?)<\/ul>/i);

    if (calloutMatch) {
      sections.push({
        id: uid(),
        type: "doctorTip",
        heading,
        body: calloutMatch[1]
          ?.replace(/<[^>]+>/g, "")
          .trim() || "",
      });
    } else if (listMatch) {
      const items = listMatch[1]
        ?.match(/<li>([\s\S]*?)<\/li>/gi)
        ?.map((li) => li.replace(/<[^>]+>/g, "").trim())
        .filter(Boolean);
      sections.push({
        id: uid(),
        type: "bullets",
        heading,
        body: items?.join("\n") || "",
      });
    } else {
      sections.push({
        id: uid(),
        type: "paragraph",
        heading,
        body: bodyHtml
          .replace(/<[^>]+>/g, "")
          .trim(),
      });
    }
  }

  return sections.length > 0 ? sections : defaultSections();
}

function defaultSections(): Section[] {
  return [
    {
      id: uid(),
      type: "paragraph",
      heading: "Introduction",
      body: "",
    },
    {
      id: uid(),
      type: "doctorTip",
      heading: "Doctor's Advice",
      body: "",
    },
    {
      id: uid(),
      type: "bullets",
      heading: "Key Points",
      body: "",
    },
  ];
}

/** Assemble sections into the HTML format the blog renderer expects. */
function sectionsToHtml(sections: Section[]): string {
  return sections
    .filter((s) => s.heading.trim() || s.body.trim())
    .map((s) => {
      const h = `<h2>${escHtml(s.heading)}</h2>`;
      switch (s.type) {
        case "doctorTip":
          return `${h}\n<div class="clinical-callout"><strong>Doctor's Advice:</strong> ${escHtml(s.body)}</div>`;
        case "bullets": {
          const items = s.body
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => `<li>${escHtml(line)}</li>`)
            .join("\n");
          return `${h}\n<ul>\n${items}\n</ul>`;
        }
        default:
          return `${h}\n<p>${escHtml(s.body)}</p>`;
      }
    })
    .join("\n\n");
}

function escHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function makeSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */

export default function PostEditorForm({
  initialData,
  isEditing = false,
}: PostEditorFormProps) {
  const router = useRouter();

  /* ── State ──────────────────────────────── */
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(
    initialData?.category || "Maternity & Pregnancy"
  );
  const [coverImage, setCoverImage] = useState<string | null>(
    initialData?.cover_image || PHOTO_PRESETS[0].url
  );
  const [sections, setSections] = useState<Section[]>(() =>
    initialData?.content
      ? parseContentToSections(initialData.content)
      : defaultSections()
  );

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    msg: string;
  } | null>(null);

  /* ── Section CRUD ───────────────────────── */
  const updateSection = (id: string, patch: Partial<Section>) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  };

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const addSection = (type: Section["type"]) => {
    const labels: Record<Section["type"], string> = {
      paragraph: "New Section",
      bullets: "Key Points",
      doctorTip: "Doctor's Advice",
    };
    setSections((prev) => [
      ...prev,
      { id: uid(), type, heading: labels[type], body: "" },
    ]);
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    setSections((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  /* ── Derived ────────────────────────────── */
  const plainText = sections
    .map((s) => s.body)
    .join(" ")
    .trim();
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

  const excerpt = useCallback(() => {
    const first = sections.find((s) => s.type === "paragraph" && s.body.trim());
    const text = first?.body || title;
    return text.length > 160 ? text.slice(0, 160) + "…" : text;
  }, [sections, title]);

  /* ── Photo upload ───────────────────────── */
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPhoto(true);
    setFeedback(null);
    try {
      const url = await uploadBlogImage(file);
      if (url) setCoverImage(url);
      else setFeedback({ ok: false, msg: "Upload failed. Try again." });
    } catch {
      setFeedback({ ok: false, msg: "Error uploading image." });
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  /* ── Save / Publish ─────────────────────── */
  const handleSave = async (publish: boolean) => {
    if (!title.trim()) {
      setFeedback({ ok: false, msg: "Please enter an article title." });
      return;
    }
    if (sections.every((s) => !s.body.trim())) {
      setFeedback({
        ok: false,
        msg: "Please write some content in at least one section.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    const slug = makeSlug(title) || `article-${Date.now()}`;
    const htmlContent = sectionsToHtml(sections);
    const tags = [category];

    const payload = {
      title: title.trim(),
      slug,
      excerpt: excerpt(),
      content: htmlContent,
      cover_image: coverImage,
      category,
      tags,
      published: publish,
      published_at: publish
        ? initialData?.published_at || new Date().toISOString()
        : null,
      reading_time: readingTime,
      meta_title: `${title.trim()} | Dr. Pooja Wadgaonkar Patil`,
      meta_description: excerpt(),
      author_name: "Dr. Pooja Wadgaonkar Patil",
    };

    try {
      let ok: boolean | BlogPost | null;
      if (isEditing && initialData) {
        ok = await updatePost(initialData.id, payload);
      } else {
        ok = await createPost(payload as any);
      }
      if (ok) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        setFeedback({
          ok: false,
          msg: "Could not save. Check your connection.",
        });
      }
    } catch {
      setFeedback({ ok: false, msg: "Unexpected error while saving." });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Section type metadata for display ──── */
  const sectionMeta: Record<
    Section["type"],
    { icon: string; color: string; placeholder: string; label: string }
  > = {
    paragraph: {
      icon: "article",
      color: "#7B5A7E",
      placeholder:
        "Write your thoughts here in plain text. It will be formatted automatically as a paragraph on the website.",
      label: "Text Paragraph",
    },
    bullets: {
      icon: "list",
      color: "#2E7D32",
      placeholder:
        "Type each point on a new line.\nFor example:\nFirst point goes here\nSecond point goes here\nThird point goes here",
      label: "Bullet-Point List",
    },
    doctorTip: {
      icon: "local_hospital",
      color: "#D46789",
      placeholder:
        "Type your clinical advice or important note for patients here. This will appear as a highlighted tip box on the website.",
      label: "Doctor's Advice Box",
    },
  };

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     RENDER
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-12">
      {/* ───── Sticky Top Bar ───── */}
      <div className="sticky top-2 z-30 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#CFC3CC]/40 shadow-lg shadow-[#7B5A7E]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B5A7E] hover:text-[#4E3953] transition-colors"
        >
          <span className="material-symbols-outlined text-base">
            arrow_back
          </span>
          All Articles
        </Link>

        {/* Tab Toggle */}
        <div className="inline-flex rounded-full p-1 bg-[#FAF7F9] border border-[#CFC3CC]/40 text-xs font-bold">
          {(["write", "preview"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === tab
                  ? "bg-[#7B5A7E] text-white shadow-sm"
                  : "text-[#878787] hover:text-[#4E3953]"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {tab === "write" ? "edit" : "visibility"}
              </span>
              {tab === "write" ? "Write" : "Patient View"}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(false)}
            className="px-4 py-2 rounded-full border border-[#CFC3CC] text-[#464647] text-xs font-bold hover:bg-[#FAF7F9] transition-colors disabled:opacity-40"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(true)}
            className="px-5 py-2 rounded-full bg-[#7B5A7E] text-white text-xs font-bold hover:bg-[#4E3953] transition-all shadow-md shadow-[#7B5A7E]/20 active:scale-95 disabled:opacity-40 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">
              cloud_upload
            </span>
            {isSubmitting ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>

      {/* ───── Feedback ───── */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
            feedback.ok
              ? "bg-[#E8F5E9] border border-[#2E7D32]/30 text-[#2E7D32]"
              : "bg-[#FDF2F4] border border-[#D46789]/30 text-[#A03055]"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {feedback.ok ? "check_circle" : "error"}
          </span>
          {feedback.msg}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════
         WRITE TAB
         ═══════════════════════════════════════ */}
      {activeTab === "write" ? (
        <div className="space-y-5">
          {/* ── Card 1 – Title & Category ── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CFC3CC]/40 shadow-sm space-y-6">
            {/* Category pills */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#7B5A7E]">
                Medical Specialty
              </label>
              <div className="flex flex-wrap gap-2">
                {BLOG_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      category === cat
                        ? "bg-[#7B5A7E] text-white shadow-sm"
                        : "bg-[#FAF7F9] border border-[#CFC3CC]/50 text-[#464647] hover:border-[#7B5A7E]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#7B5A7E] mb-1.5">
                Article Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g.  Managing First Trimester Health"
                className="w-full text-xl sm:text-2xl font-serif-display font-bold text-[#4E3953] placeholder:text-[#CFC3CC] border-b-2 border-[#CFC3CC]/30 focus:border-[#7B5A7E] pb-2 focus:outline-none bg-transparent transition-colors"
              />
            </div>
          </div>

          {/* ── Card 2 – Cover Photo ── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CFC3CC]/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-widest text-[#7B5A7E]">
                Cover Photo
              </label>
              <label className="text-xs font-bold text-[#7B5A7E] hover:underline cursor-pointer flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  upload_file
                </span>
                {isUploadingPhoto ? "Uploading…" : "Upload Custom"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  disabled={isUploadingPhoto}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PHOTO_PRESETS.map((p) => {
                const active = coverImage === p.url;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => setCoverImage(p.url)}
                    className={`relative h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      active
                        ? "border-[#7B5A7E] ring-2 ring-[#7B5A7E]/30"
                        : "border-[#CFC3CC]/40 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={p.url}
                      alt={p.label}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] font-bold text-center py-0.5">
                      {p.label}
                    </span>
                    {active && (
                      <span className="absolute top-1 right-1 bg-[#7B5A7E] text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Card 3 – Article Sections ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#7B5A7E]">
                Article Content — fill in each section
              </h2>
              <span className="text-[11px] text-[#878787]">
                {wordCount} words · {readingTime}
              </span>
            </div>

            {sections.map((section, idx) => {
              const meta = sectionMeta[section.type];
              return (
                <motion.div
                  key={section.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl border border-[#CFC3CC]/40 shadow-sm overflow-hidden"
                >
                  {/* Section Header */}
                  <div
                    className="px-5 py-3 flex items-center gap-3 border-b border-[#CFC3CC]/20"
                    style={{ backgroundColor: `${meta.color}08` }}
                  >
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ color: meta.color }}
                    >
                      {meta.icon}
                    </span>

                    {/* Editable section heading */}
                    <input
                      type="text"
                      value={section.heading}
                      onChange={(e) =>
                        updateSection(section.id, {
                          heading: e.target.value,
                        })
                      }
                      className="flex-1 text-sm font-bold bg-transparent border-none focus:outline-none text-[#4E3953] placeholder:text-[#CFC3CC]"
                      placeholder="Section heading…"
                    />

                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        color: meta.color,
                        backgroundColor: `${meta.color}15`,
                      }}
                    >
                      {meta.label}
                    </span>

                    {/* Reorder + Delete */}
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => moveSection(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 rounded-lg hover:bg-[#FAF7F9] text-[#878787] disabled:opacity-20 transition-colors"
                        title="Move up"
                      >
                        <span className="material-symbols-outlined text-base">
                          arrow_upward
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(idx, 1)}
                        disabled={idx === sections.length - 1}
                        className="p-1 rounded-lg hover:bg-[#FAF7F9] text-[#878787] disabled:opacity-20 transition-colors"
                        title="Move down"
                      >
                        <span className="material-symbols-outlined text-base">
                          arrow_downward
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="p-1 rounded-lg hover:bg-[#FDF2F4] text-[#878787] hover:text-[#D46789] transition-colors"
                        title="Remove section"
                      >
                        <span className="material-symbols-outlined text-base">
                          close
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Section Body */}
                  <div className="p-5">
                    <textarea
                      value={section.body}
                      onChange={(e) =>
                        updateSection(section.id, { body: e.target.value })
                      }
                      placeholder={meta.placeholder}
                      rows={section.type === "bullets" ? 6 : 4}
                      className="w-full text-sm text-[#464647] leading-relaxed bg-transparent border-none focus:outline-none resize-y placeholder:text-[#CFC3CC] min-h-[80px]"
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Add Section Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 py-4">
              <span className="text-[11px] font-bold text-[#878787] uppercase tracking-wider mr-2">
                Add Section:
              </span>
              {(
                [
                  ["paragraph", "article", "Text Paragraph"],
                  ["bullets", "list", "Bullet List"],
                  ["doctorTip", "local_hospital", "Doctor's Tip"],
                ] as const
              ).map(([type, icon, label]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => addSection(type)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-dashed border-[#CFC3CC]/60 text-xs font-bold text-[#7B5A7E] hover:border-[#7B5A7E] hover:bg-[#FAF7F9] transition-all"
                >
                  <span className="material-symbols-outlined text-sm">
                    {icon}
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ═══════════════════════════════════════
           PREVIEW TAB
           ═══════════════════════════════════════ */
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#CFC3CC]/40 shadow-sm space-y-8">
          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3.5 py-1 rounded-full bg-[#7B5A7E]/10 text-[#7B5A7E] font-bold uppercase">
              {category}
            </span>
            <span className="text-[#878787]">
              {new Date().toLocaleDateString("en-IN", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-[#878787]">·</span>
            <span className="text-[#878787] font-medium">{readingTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#4E3953] leading-tight">
            {title || "Untitled Article"}
          </h1>

          {/* Excerpt */}
          <p className="text-base text-[#464647] font-light leading-relaxed border-l-2 border-[#D46789] pl-4 italic bg-[#FAF7F9] py-3 rounded-r-xl">
            {excerpt()}
          </p>

          {/* Cover image */}
          {coverImage && (
            <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden shadow-md bg-[#F3EEF5]">
              <Image
                src={coverImage}
                alt={title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          {/* Rendered sections */}
          <div className="space-y-6">
            {sections
              .filter((s) => s.heading.trim() || s.body.trim())
              .map((s) => (
                <div key={s.id}>
                  {s.heading && (
                    <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#4E3953] mb-3">
                      {s.heading}
                    </h2>
                  )}
                  {s.type === "doctorTip" && s.body && (
                    <div className="bg-[#FAF7F9] border-l-4 border-[#D46789] p-5 rounded-r-2xl text-[#4E3953]">
                      <strong>Doctor&apos;s Advice:</strong> {s.body}
                    </div>
                  )}
                  {s.type === "paragraph" && s.body && (
                    <p className="text-base text-[#464647] leading-relaxed font-light">
                      {s.body}
                    </p>
                  )}
                  {s.type === "bullets" && s.body && (
                    <ul className="list-disc pl-6 space-y-1.5 text-base text-[#464647] font-light">
                      {s.body
                        .split("\n")
                        .filter(Boolean)
                        .map((item, i) => (
                          <li key={i}>{item.trim()}</li>
                        ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>

          {/* Author card */}
          <div className="pt-8 border-t border-[#CFC3CC]/30 flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#D46789]/30 shadow-sm bg-[#F3EEF5]">
              <Image
                src="/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"
                alt="Dr. Pooja Wadgaonkar Patil"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-[#4E3953]">
                Dr. Pooja Wadgaonkar Patil
              </p>
              <p className="text-xs text-[#878787]">
                Consultant Gynaecologist &amp; Obstetrician
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
