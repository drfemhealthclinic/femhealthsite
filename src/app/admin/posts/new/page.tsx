"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BLOG_CATEGORIES } from "@/lib/blog-fallback";
import { createPost, uploadBlogImage } from "@/lib/supabase";

/* ── Cover photo presets ─────────────────── */
const COVERS = [
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

const CATEGORIES = BLOG_CATEGORIES.filter((c) => c !== "All");

/* ── Helpers ─────────────────────────────── */
function slug(t: string) {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function esc(t: string) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHtml(fields: {
  intro: string;
  doctorTip: string;
  mainBody: string;
  keyPoints: string;
  whenToConsult: string;
}) {
  const parts: string[] = [];

  if (fields.intro.trim()) {
    parts.push(`<h2>Introduction</h2>\n<p>${esc(fields.intro.trim())}</p>`);
  }

  if (fields.doctorTip.trim()) {
    parts.push(
      `<div class="clinical-callout"><strong>Doctor's Advice:</strong> ${esc(fields.doctorTip.trim())}</div>`
    );
  }

  if (fields.mainBody.trim()) {
    const paragraphs = fields.mainBody
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
    parts.push(
      `<h2>Detailed Information</h2>\n${paragraphs.map((p) => `<p>${esc(p)}</p>`).join("\n")}`
    );
  }

  if (fields.keyPoints.trim()) {
    const items = fields.keyPoints
      .split("\n")
      .map((l) => l.replace(/^[-•*]\s*/, "").trim())
      .filter(Boolean);
    if (items.length) {
      parts.push(
        `<h2>Key Points</h2>\n<ul>\n${items.map((i) => `<li>${esc(i)}</li>`).join("\n")}\n</ul>`
      );
    }
  }

  if (fields.whenToConsult.trim()) {
    parts.push(
      `<h2>When to Consult Your Doctor</h2>\n<p>${esc(fields.whenToConsult.trim())}</p>`
    );
  }

  return parts.join("\n\n");
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Page Component
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function NewPostPage() {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [cover, setCover] = useState(COVERS[0].url);
  const [intro, setIntro] = useState("");
  const [doctorTip, setDoctorTip] = useState("");
  const [mainBody, setMainBody] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [whenToConsult, setWhenToConsult] = useState("");

  // UI state
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Computed
  const allText = [intro, doctorTip, mainBody, keyPoints, whenToConsult].join(
    " "
  );
  const words = allText.trim().split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(1, Math.ceil(words / 180))} min read`;
  const excerpt =
    intro.trim().length > 160
      ? intro.trim().slice(0, 160) + "…"
      : intro.trim() || title;

  // Upload handler
  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const url = await uploadBlogImage(f);
      if (url) setCover(url);
    } catch {
      /* ignore */
    }
    setUploading(false);
  }

  // Save
  async function save(publish: boolean) {
    setError("");
    if (!title.trim()) {
      setError("Please enter a title for your article.");
      return;
    }
    if (!intro.trim() && !mainBody.trim()) {
      setError("Please write at least an introduction or some main content.");
      return;
    }

    setSaving(true);
    try {
      const ok = await createPost({
        title: title.trim(),
        slug: slug(title) || `article-${Date.now()}`,
        excerpt,
        content: buildHtml({ intro, doctorTip, mainBody, keyPoints, whenToConsult }),
        cover_image: cover,
        category,
        tags: [category],
        published: publish,
        published_at: publish ? new Date().toISOString() : null,
        reading_time: readTime,
        meta_title: `${title.trim()} | Dr. Pooja Wadgaonkar Patil`,
        meta_description: excerpt,
        author_name: "Dr. Pooja Wadgaonkar Patil",
        views_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as any);

      if (ok) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        setError("Could not save. Please check your connection and try again.");
      }
    } catch {
      setError("An unexpected error occurred.");
    }
    setSaving(false);
  }

  /* ── Shared input styles ──────────────── */
  const fieldLabel =
    "block text-[11px] font-bold uppercase tracking-widest text-[#7B5A7E] mb-1.5";
  const fieldHint = "block text-[11px] text-[#878787] mb-2";
  const textareaClass =
    "w-full rounded-2xl border border-[#CFC3CC]/60 bg-[#FDFBFC] px-4 py-3 text-sm text-[#464647] leading-relaxed placeholder:text-[#CFC3CC] focus:outline-none focus:border-[#7B5A7E] focus:ring-2 focus:ring-[#7B5A7E]/10 resize-y transition-colors";

  return (
    <div className="max-w-3xl mx-auto pb-28 px-2">
      {/* ─── Top bar ────────────────────────── */}
      <div className="sticky top-2 z-30 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#CFC3CC]/40 shadow-lg shadow-[#7B5A7E]/5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B5A7E] hover:text-[#4E3953] transition-colors"
        >
          <span className="material-symbols-outlined text-base">
            arrow_back
          </span>
          All Articles
        </Link>

        <div className="inline-flex rounded-full p-1 bg-[#FAF7F9] border border-[#CFC3CC]/40 text-xs font-bold">
          {(["write", "preview"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                tab === t
                  ? "bg-[#7B5A7E] text-white shadow-sm"
                  : "text-[#878787] hover:text-[#4E3953]"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {t === "write" ? "edit" : "visibility"}
              </span>
              {t === "write" ? "Write" : "Preview"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={saving}
            onClick={() => save(false)}
            className="px-4 py-2 rounded-full border border-[#CFC3CC] text-[#464647] text-xs font-bold hover:bg-[#FAF7F9] transition-colors disabled:opacity-40"
          >
            Save Draft
          </button>
          <button
            disabled={saving}
            onClick={() => save(true)}
            className="px-5 py-2 rounded-full bg-[#7B5A7E] text-white text-xs font-bold hover:bg-[#4E3953] shadow-md shadow-[#7B5A7E]/20 active:scale-95 disabled:opacity-40 flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-sm">
              cloud_upload
            </span>
            {saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>

      {/* ─── Error ──────────────────────────── */}
      {error && (
        <div className="mb-5 p-4 rounded-2xl bg-[#FDF2F4] border border-[#D46789]/30 text-[#A03055] text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          {error}
        </div>
      )}

      {/* ═════════════════════════════════════
         WRITE TAB
         ═════════════════════════════════════ */}
      {tab === "write" ? (
        <div className="space-y-5">
          {/* ── Step 1: Title & Category ───── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CFC3CC]/40 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-[#7B5A7E]">
              <span className="w-6 h-6 rounded-full bg-[#7B5A7E] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span className="text-sm font-bold">Title & Category</span>
            </div>

            <div>
              <label className={fieldLabel}>Article Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Managing First Trimester Health"
                className="w-full text-lg sm:text-xl font-bold text-[#4E3953] placeholder:text-[#CFC3CC] rounded-2xl border border-[#CFC3CC]/60 bg-[#FDFBFC] px-4 py-3 focus:outline-none focus:border-[#7B5A7E] focus:ring-2 focus:ring-[#7B5A7E]/10 transition-colors"
              />
            </div>

            <div>
              <label className={fieldLabel}>Medical Specialty</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      category === c
                        ? "bg-[#7B5A7E] text-white shadow-sm"
                        : "bg-[#FAF7F9] border border-[#CFC3CC]/50 text-[#464647] hover:border-[#7B5A7E]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Step 2: Cover Photo ─────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CFC3CC]/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#7B5A7E]">
                <span className="w-6 h-6 rounded-full bg-[#7B5A7E] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <span className="text-sm font-bold">Cover Photo</span>
              </div>
              <label className="text-xs font-bold text-[#7B5A7E] hover:underline cursor-pointer flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  upload_file
                </span>
                {uploading ? "Uploading…" : "Upload Your Own"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={onUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COVERS.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => setCover(c.url)}
                  className={`relative h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                    cover === c.url
                      ? "border-[#7B5A7E] ring-2 ring-[#7B5A7E]/30"
                      : "border-[#CFC3CC]/40 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={c.url}
                    alt={c.label}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] font-bold text-center py-0.5">
                    {c.label}
                  </span>
                  {cover === c.url && (
                    <span className="absolute top-1 right-1 bg-[#7B5A7E] text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Step 3: Introduction ───────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CFC3CC]/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#7B5A7E]">
              <span className="w-6 h-6 rounded-full bg-[#7B5A7E] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <span className="text-sm font-bold">Introduction</span>
            </div>
            <span className={fieldHint}>
              A short summary that appears at the top and on article cards.
              Write 2–3 sentences.
            </span>
            <textarea
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              rows={3}
              placeholder="Briefly describe what this article covers and why it matters for patients…"
              className={textareaClass}
            />
          </div>

          {/* ── Step 4: Doctor's Advice ─────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-l-4 border-[#CFC3CC]/40 border-l-[#D46789] shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#D46789]">
              <span className="w-6 h-6 rounded-full bg-[#D46789] text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <span className="text-sm font-bold">
                Doctor&apos;s Clinical Advice
              </span>
              <span className="text-[11px] font-semibold text-[#878787] ml-auto">
                Optional
              </span>
            </div>
            <span className={fieldHint}>
              A highlighted tip box that stands out on the article. Share your
              key clinical recommendation.
            </span>
            <textarea
              value={doctorTip}
              onChange={(e) => setDoctorTip(e.target.value)}
              rows={2}
              placeholder="e.g. Early risk assessment during the first trimester allows us to create a proactive care plan…"
              className={`${textareaClass} !border-l-2 !border-l-[#D46789]/30`}
            />
          </div>

          {/* ── Step 5: Main Content ────────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CFC3CC]/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#7B5A7E]">
              <span className="w-6 h-6 rounded-full bg-[#7B5A7E] text-white text-xs font-bold flex items-center justify-center">
                5
              </span>
              <span className="text-sm font-bold">Main Content</span>
            </div>
            <span className={fieldHint}>
              Write your detailed article text here. Separate paragraphs with a
              blank line.
            </span>
            <textarea
              value={mainBody}
              onChange={(e) => setMainBody(e.target.value)}
              rows={8}
              placeholder="Write the detailed content of your article here. Press Enter twice to start a new paragraph…"
              className={textareaClass}
            />
          </div>

          {/* ── Step 6: Key Points ──────────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CFC3CC]/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#2E7D32]">
              <span className="w-6 h-6 rounded-full bg-[#2E7D32] text-white text-xs font-bold flex items-center justify-center">
                6
              </span>
              <span className="text-sm font-bold">Key Points</span>
              <span className="text-[11px] font-semibold text-[#878787] ml-auto">
                Optional
              </span>
            </div>
            <span className={fieldHint}>
              Put each point on its own line. These will become a bullet-point
              list.
            </span>
            <textarea
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              rows={5}
              placeholder={"First important point\nSecond important point\nThird important point"}
              className={textareaClass}
            />
          </div>

          {/* ── Step 7: When to Consult ────── */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CFC3CC]/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#7B5A7E]">
              <span className="w-6 h-6 rounded-full bg-[#7B5A7E] text-white text-xs font-bold flex items-center justify-center">
                7
              </span>
              <span className="text-sm font-bold">When to See the Doctor</span>
              <span className="text-[11px] font-semibold text-[#878787] ml-auto">
                Optional
              </span>
            </div>
            <span className={fieldHint}>
              Advise patients on when they should seek medical help for this
              topic.
            </span>
            <textarea
              value={whenToConsult}
              onChange={(e) => setWhenToConsult(e.target.value)}
              rows={2}
              placeholder="e.g. Always seek urgent evaluation if you experience severe headaches, visual disturbances, or sharp abdominal pain…"
              className={textareaClass}
            />
          </div>

          {/* Word count footer */}
          <div className="text-center text-[11px] text-[#878787] font-medium py-2">
            {words} words · {readTime}
          </div>
        </div>
      ) : (
        /* ═════════════════════════════════════
           PREVIEW TAB
           ═════════════════════════════════════ */
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#CFC3CC]/40 shadow-sm space-y-8">
          {/* Meta */}
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
            <span className="text-[#878787] font-medium">{readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#4E3953] leading-tight">
            {title || "Untitled Article"}
          </h1>

          {/* Excerpt */}
          {intro.trim() && (
            <p className="text-base text-[#464647] font-light leading-relaxed border-l-2 border-[#D46789] pl-4 italic bg-[#FAF7F9] py-3 rounded-r-xl">
              {intro.trim().length > 160
                ? intro.trim().slice(0, 160) + "…"
                : intro.trim()}
            </p>
          )}

          {/* Cover */}
          {cover && (
            <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden shadow-md bg-[#F3EEF5]">
              <Image
                src={cover}
                alt={title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          {/* Introduction */}
          {intro.trim() && (
            <div>
              <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#4E3953] mb-3">
                Introduction
              </h2>
              <p className="text-base text-[#464647] leading-relaxed font-light">
                {intro}
              </p>
            </div>
          )}

          {/* Doctor Tip */}
          {doctorTip.trim() && (
            <div className="bg-[#FAF7F9] border-l-4 border-[#D46789] p-5 rounded-r-2xl text-[#4E3953]">
              <strong>Doctor&apos;s Advice:</strong> {doctorTip}
            </div>
          )}

          {/* Main Body */}
          {mainBody.trim() && (
            <div>
              <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#4E3953] mb-3">
                Detailed Information
              </h2>
              {mainBody
                .split(/\n{2,}/)
                .filter(Boolean)
                .map((p, i) => (
                  <p
                    key={i}
                    className="text-base text-[#464647] leading-relaxed font-light mb-3"
                  >
                    {p.trim()}
                  </p>
                ))}
            </div>
          )}

          {/* Key Points */}
          {keyPoints.trim() && (
            <div>
              <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#4E3953] mb-3">
                Key Points
              </h2>
              <ul className="list-disc pl-6 space-y-1.5 text-base text-[#464647] font-light">
                {keyPoints
                  .split("\n")
                  .map((l) => l.replace(/^[-•*]\s*/, "").trim())
                  .filter(Boolean)
                  .map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
              </ul>
            </div>
          )}

          {/* When to Consult */}
          {whenToConsult.trim() && (
            <div>
              <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-[#4E3953] mb-3">
                When to See the Doctor
              </h2>
              <p className="text-base text-[#464647] leading-relaxed font-light">
                {whenToConsult}
              </p>
            </div>
          )}

          {/* Author */}
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
                Dr. Pooja Wadgaonwar Patil
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
