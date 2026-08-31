"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost, BLOG_CATEGORIES } from "@/lib/blog-fallback";
import { createPost, updatePost, uploadBlogImage } from "@/lib/supabase";

interface PostEditorFormProps {
  initialData?: BlogPost;
  isEditing?: boolean;
}

// Curated 1-click photo presets for Dr. Pooja
const PHOTO_PRESETS = [
  {
    name: "Maternity & Newborn",
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    category: "Maternity & Pregnancy",
  },
  {
    name: "Surgical & Clinic",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    category: "Laparoscopic Surgery",
  },
  {
    name: "Hormonal & Wellness",
    url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    category: "PCOS & PCOD",
  },
  {
    name: "Family & Fertility",
    url: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=1200&auto=format&fit=crop",
    category: "Infertility & IVF",
  },
];

export default function PostEditorForm({
  initialData,
  isEditing = false,
}: PostEditorFormProps) {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);

  // Core visual fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(
    initialData?.category || "Maternity & Pregnancy"
  );
  const [coverImage, setCoverImage] = useState<string | null>(
    initialData?.cover_image || PHOTO_PRESETS[0].url
  );
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Active view tab: "write" or "preview"
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Advanced collapsible settings (hidden by default)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customSlug, setCustomSlug] = useState(initialData?.slug || "");
  const [customExcerpt, setCustomExcerpt] = useState(
    initialData?.excerpt || ""
  );
  const [customTags, setCustomTags] = useState(
    initialData?.tags?.join(", ") || ""
  );

  // Form submission & feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  // Sync initial content to contentEditable on mount
  useEffect(() => {
    if (editorRef.current) {
      if (initialData?.content) {
        editorRef.current.innerHTML = initialData.content;
      } else {
        editorRef.current.innerHTML = `
          <h2>Introduction</h2>
          <p>Start writing your clinical guidance and advice here. You can type naturally just like in Word or Google Docs.</p>
          <div class="clinical-callout">
            <strong>Doctor's Advice:</strong> Click to edit this clinical highlight box with your key advice for patients.
          </div>
          <h2>Key Symptoms &amp; When to Consult</h2>
          <ul>
            <li>Early symptom or recommendation</li>
            <li>When to seek clinical evaluation</li>
          </ul>
        `;
      }
    }
  }, [initialData]);

  // Execute rich formatting commands
  const applyFormat = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Insert a styled Doctor's Tip Box into the content
  const insertDoctorTipBox = () => {
    if (!editorRef.current) return;
    const calloutHtml = `
      <div class="clinical-callout" style="background:#FAF7F9; border-left:4px solid #D46789; padding:16px; border-radius:0 16px 16px 0; margin:20px 0;">
        <strong style="color:#4E3953;">Doctor's Advice:</strong> Type your clinical tip here...
      </div>
      <p><br></p>
    `;
    document.execCommand("insertHTML", false, calloutHtml);
  };

  // Calculate estimated reading time
  const getCalculatedReadingTime = useCallback(() => {
    const text = editorRef.current?.innerText || "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.ceil(words / 180));
    return `${mins} min read`;
  }, []);

  // Extract excerpt automatically if not manually overridden
  const getCalculatedExcerpt = useCallback(() => {
    if (customExcerpt.trim()) return customExcerpt.trim();
    const text = editorRef.current?.innerText || "";
    const cleanText = text.replace(/Doctor's Advice:.*?\n/g, "").trim();
    return cleanText.length > 160
      ? cleanText.substring(0, 160) + "..."
      : cleanText || title;
  }, [customExcerpt, title]);

  // Generate URL slug
  const getCalculatedSlug = useCallback(() => {
    if (customSlug.trim()) {
      return customSlug
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    }
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  }, [customSlug, title]);

  // Handle custom photo upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    setFeedbackMessage(null);
    try {
      const url = await uploadBlogImage(file);
      if (url) {
        setCoverImage(url);
      } else {
        setFeedbackMessage({
          type: "error",
          text: "Failed to upload photo. Please try again.",
        });
      }
    } catch {
      setFeedbackMessage({
        type: "error",
        text: "An error occurred uploading the image file.",
      });
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Save / Publish
  const handleSave = async (shouldPublish: boolean) => {
    if (!title.trim()) {
      setFeedbackMessage({
        type: "error",
        text: "Please enter an article title before saving.",
      });
      return;
    }

    const htmlContent = editorRef.current?.innerHTML || "<p></p>";
    const finalSlug = getCalculatedSlug() || `article-${Date.now()}`;
    const finalExcerpt = getCalculatedExcerpt();
    const readingTime = getCalculatedReadingTime();
    const tagsArray = customTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setIsSubmitting(true);
    setFeedbackMessage(null);

    const postPayload = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: finalExcerpt,
      content: htmlContent,
      cover_image: coverImage,
      category,
      tags: tagsArray.length > 0 ? tagsArray : [category],
      published: shouldPublish,
      published_at: shouldPublish
        ? initialData?.published_at || new Date().toISOString()
        : null,
      reading_time: readingTime,
      meta_title: `${title.trim()} | Dr. Pooja Wadgaonkar Patil`,
      meta_description: finalExcerpt,
      author_name: "Dr. Pooja Wadgaonkar Patil",
    };

    try {
      if (isEditing && initialData) {
        const success = await updatePost(initialData.id, postPayload);
        if (success) {
          router.push("/admin/posts");
          router.refresh();
        } else {
          setFeedbackMessage({
            type: "error",
            text: "Could not update article. Please check your connection.",
          });
        }
      } else {
        const created = await createPost(postPayload as any);
        if (created) {
          router.push("/admin/posts");
          router.refresh();
        } else {
          setFeedbackMessage({
            type: "error",
            text: "Could not create article. Please check your connection.",
          });
        }
      }
    } catch {
      setFeedbackMessage({
        type: "error",
        text: "An unexpected error occurred while saving.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Bar Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-6 py-4 rounded-2xl border border-[#CFC3CC]/40 organic-shadow sticky top-4 z-20 backdrop-blur-md bg-white/95">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B5A7E] hover:text-[#4E3953] transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>All Articles</span>
        </Link>

        {/* View Mode Tabs (Write vs Preview) */}
        <div className="inline-flex rounded-full p-1 bg-[#FAF7F9] border border-[#CFC3CC]/40 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "write"
                ? "bg-[#7B5A7E] text-white shadow-xs"
                : "text-[#878787] hover:text-[#4E3953]"
            }`}
          >
            <span className="material-symbols-outlined text-base">edit</span>
            <span>Write Article</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-[#7B5A7E] text-white shadow-xs"
                : "text-[#878787] hover:text-[#4E3953]"
            }`}
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            <span>Patient View</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(false)}
            className="px-4 py-2 rounded-full border border-[#CFC3CC] text-[#464647] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF7F9] transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(true)}
            className="px-5 py-2 rounded-full bg-[#7B5A7E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4E3953] transition-all shadow-md shadow-[#7B5A7E]/20 active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">
                  cloud_upload
                </span>
                <span>Publish to Website</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMessage && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 ${
            feedbackMessage.type === "error"
              ? "bg-[#FDF2F4] border border-[#D46789]/30 text-[#A03055]"
              : "bg-[#E8F5E9] border border-[#2E7D32]/30 text-[#2E7D32]"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {feedbackMessage.type === "error" ? "error" : "check_circle"}
          </span>
          <span>{feedbackMessage.text}</span>
        </motion.div>
      )}

      {/* Main Content Area */}
      {activeTab === "write" ? (
        <div className="space-y-6">
          {/* Visual Canvas Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#CFC3CC]/40 organic-shadow space-y-8">
            {/* 1. Category Selector Pills */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-[#7B5A7E]">
                Select Medical Specialty
              </label>
              <div className="flex flex-wrap gap-2">
                {BLOG_CATEGORIES.filter((c) => c !== "All").map((cat) => {
                  const isSelected = category === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                        isSelected
                          ? "bg-[#7B5A7E] text-white shadow-xs scale-105"
                          : "bg-[#FAF7F9] border border-[#CFC3CC]/50 text-[#464647] hover:border-[#7B5A7E]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Headline / Title Input */}
            <div className="space-y-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article Headline (e.g., Managing First Trimester Health)..."
                className="w-full text-2xl sm:text-3xl md:text-4xl font-serif-display font-bold text-[#4E3953] placeholder:text-[#CFC3CC] focus:outline-none border-b border-transparent focus:border-[#7B5A7E]/30 pb-2 transition-colors bg-transparent"
              />
            </div>

            {/* 3. Cover Photo Picker with Presets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold uppercase tracking-widest text-[#7B5A7E]">
                  Cover Photo
                </label>
                <label className="text-xs font-bold text-[#7B5A7E] hover:underline cursor-pointer flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    upload_file
                  </span>
                  <span>{isUploadingPhoto ? "Uploading..." : "Upload Custom Photo"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={isUploadingPhoto}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Active Cover Preview & 1-Click Preset Options */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {PHOTO_PRESETS.map((preset) => {
                  const isChosen = coverImage === preset.url;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setCoverImage(preset.url)}
                      className={`relative h-24 rounded-2xl overflow-hidden border-2 transition-all group ${
                        isChosen
                          ? "border-[#7B5A7E] ring-2 ring-[#7B5A7E]/30 scale-102"
                          : "border-[#CFC3CC]/40 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={preset.url}
                        alt={preset.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                        <span className="text-[10px] font-bold text-white leading-tight">
                          {preset.name}
                        </span>
                      </div>
                      {isChosen && (
                        <div className="absolute top-1.5 right-1.5 bg-[#7B5A7E] text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Visual Formatting Toolbar (Google Docs / Medium Style) */}
            <div className="pt-4 border-t border-[#CFC3CC]/30 space-y-3">
              <div className="sticky top-20 z-10 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-[#CFC3CC]/50 shadow-sm flex flex-wrap items-center gap-1">
                <button
                  type="button"
                  onClick={() => applyFormat("formatBlock", "<h2>")}
                  className="px-3 py-1.5 text-xs font-bold text-[#4E3953] bg-[#FAF7F9] hover:bg-[#7B5A7E] hover:text-white rounded-lg transition-colors"
                  title="Large Subheading"
                >
                  Subheading
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("formatBlock", "<h3>")}
                  className="px-3 py-1.5 text-xs font-semibold text-[#4E3953] bg-[#FAF7F9] hover:bg-[#7B5A7E] hover:text-white rounded-lg transition-colors"
                  title="Minor Subheading"
                >
                  Section
                </button>
                <span className="w-px h-5 bg-[#CFC3CC]/60 mx-1" />
                <button
                  type="button"
                  onClick={() => applyFormat("bold")}
                  className="w-8 h-8 font-bold text-sm text-[#4E3953] bg-[#FAF7F9] hover:bg-[#7B5A7E] hover:text-white rounded-lg flex items-center justify-center transition-colors"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("italic")}
                  className="w-8 h-8 italic font-serif text-sm text-[#4E3953] bg-[#FAF7F9] hover:bg-[#7B5A7E] hover:text-white rounded-lg flex items-center justify-center transition-colors"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("insertUnorderedList")}
                  className="px-2.5 py-1.5 text-xs font-medium text-[#4E3953] bg-[#FAF7F9] hover:bg-[#7B5A7E] hover:text-white rounded-lg flex items-center gap-1 transition-colors"
                  title="Bullet List"
                >
                  <span>• Bullets</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyFormat("insertOrderedList")}
                  className="px-2.5 py-1.5 text-xs font-medium text-[#4E3953] bg-[#FAF7F9] hover:bg-[#7B5A7E] hover:text-white rounded-lg flex items-center gap-1 transition-colors"
                  title="Numbered Steps"
                >
                  <span>1. Steps</span>
                </button>
                <span className="w-px h-5 bg-[#CFC3CC]/60 mx-1" />
                {/* Highlight Doctor Callout Tool */}
                <button
                  type="button"
                  onClick={insertDoctorTipBox}
                  className="px-3 py-1.5 text-xs font-bold text-[#D46789] bg-[#FDF2F4] hover:bg-[#D46789] hover:text-white rounded-lg border border-[#D46789]/30 flex items-center gap-1.5 transition-colors"
                  title="Insert Doctor's Clinical Tip Box"
                >
                  <span className="material-symbols-outlined text-sm">
                    local_hospital
                  </span>
                  <span>+ Doctor&apos;s Advice Box</span>
                </button>
              </div>

              {/* Visual Writing Canvas (contentEditable) */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                className="min-h-[380px] p-6 rounded-2xl border border-transparent focus:border-[#7B5A7E]/20 focus:outline-none text-[#464647] font-light leading-relaxed text-base sm:text-lg space-y-4
                  [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-serif-display [&_h2]:font-bold [&_h2]:text-[#4E3953] [&_h2]:mt-6 [&_h2]:mb-2
                  [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-serif-display [&_h3]:font-semibold [&_h3]:text-[#7B5A7E] [&_h3]:mt-4 [&_h3]:mb-2
                  [&_p]:leading-relaxed
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5
                  [&_.clinical-callout]:bg-[#FAF7F9] [&_.clinical-callout]:border-l-4 [&_.clinical-callout]:border-[#D46789] [&_.clinical-callout]:p-4 [&_.clinical-callout]:rounded-r-2xl [&_.clinical-callout]:my-6 [&_.clinical-callout]:text-[#4E3953]"
              />
            </div>
          </div>

          {/* 5. Optional Advanced Settings Accordion (Hidden by default) */}
          <div className="bg-white rounded-2xl border border-[#CFC3CC]/40 organic-shadow overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#FAF7F9] transition-colors"
            >
              <span className="text-xs font-bold text-[#878787] uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-base">tune</span>
                <span>Advanced Settings &amp; SEO (Auto-Managed)</span>
              </span>
              <span className="material-symbols-outlined text-[#878787] text-base">
                {showAdvanced ? "expand_less" : "expand_more"}
              </span>
            </button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 pt-2 border-t border-[#CFC3CC]/20 space-y-4 text-xs"
                >
                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-[#878787]">
                      Custom Web Link (URL Slug)
                    </label>
                    <input
                      type="text"
                      value={customSlug}
                      onChange={(e) => setCustomSlug(e.target.value)}
                      placeholder={getCalculatedSlug() || "auto-generated-from-title"}
                      className="w-full px-3 py-2 rounded-xl border border-[#CFC3CC]/60 text-xs text-[#464647] bg-white focus:outline-none focus:border-[#7B5A7E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-[#878787]">
                      Custom Summary for Cards (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={customExcerpt}
                      onChange={(e) => setCustomExcerpt(e.target.value)}
                      placeholder={getCalculatedExcerpt() || "Auto-extracted from first paragraph"}
                      className="w-full p-3 rounded-xl border border-[#CFC3CC]/60 text-xs text-[#464647] bg-white focus:outline-none focus:border-[#7B5A7E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-[#878787]">
                      Search Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={customTags}
                      onChange={(e) => setCustomTags(e.target.value)}
                      placeholder="e.g. Pregnancy, Trimester, Health"
                      className="w-full px-3 py-2 rounded-xl border border-[#CFC3CC]/60 text-xs text-[#464647] bg-white focus:outline-none focus:border-[#7B5A7E]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* Patient View Live Preview Mode */
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#CFC3CC]/40 organic-shadow space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs">
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
              <span className="text-[#878787]">•</span>
              <span className="text-[#878787] font-medium">
                {getCalculatedReadingTime()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif-display font-bold text-[#4E3953] leading-tight">
              {title || "Untitled Article"}
            </h1>

            <p className="text-base text-[#464647] font-light leading-relaxed border-l-2 border-[#D46789] pl-4 italic bg-[#FAF7F9] py-3 rounded-r-xl">
              {getCalculatedExcerpt()}
            </p>
          </div>

          {coverImage && (
            <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-md bg-[#F3EEF5]">
              <Image
                src={coverImage}
                alt={title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          {/* Rendered Live Article Content */}
          <div
            className="prose prose-slate max-w-none text-[#464647] leading-relaxed font-light space-y-4 text-base sm:text-lg
              [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-serif-display [&_h2]:font-bold [&_h2]:text-[#4E3953] [&_h2]:mt-8 [&_h2]:mb-3
              [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-serif-display [&_h3]:font-semibold [&_h3]:text-[#7B5A7E] [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:leading-relaxed
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5
              [&_.clinical-callout]:bg-[#FAF7F9] [&_.clinical-callout]:border-l-4 [&_.clinical-callout]:border-[#D46789] [&_.clinical-callout]:p-5 [&_.clinical-callout]:rounded-r-2xl [&_.clinical-callout]:my-6 [&_.clinical-callout]:text-[#4E3953]"
            dangerouslySetInnerHTML={{
              __html: editorRef.current?.innerHTML || "<p></p>",
            }}
          />

          {/* Author Card in Preview */}
          <div className="pt-8 border-t border-[#CFC3CC]/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#7B5A7E] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              PW
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
