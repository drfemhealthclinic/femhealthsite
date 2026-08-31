"use client";

import { useState, useMemo } from "react";
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

export default function PostEditorForm({
  initialData,
  isEditing = false,
}: PostEditorFormProps) {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialData?.slug));
  const [category, setCategory] = useState(
    initialData?.category || "Maternity & Pregnancy"
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [readingTime, setReadingTime] = useState(
    initialData?.reading_time || "4 min read"
  );
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(
    initialData?.content ||
      "<h2>Overview</h2>\n<p>Write an introduction explaining the condition or medical topic here...</p>\n\n<div class=\"clinical-callout\">\n  <strong>Doctor's Insight:</strong> Key clinical recommendation or takeaway for patients.\n</div>\n\n<h2>Symptoms &amp; Clinical Management</h2>\n<ul>\n  <li>Key symptom or recommendation one</li>\n  <li>Key symptom or recommendation two</li>\n</ul>"
  );
  const [coverImage, setCoverImage] = useState<string | null>(
    initialData?.cover_image || null
  );
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [published, setPublished] = useState(initialData?.published || false);
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.meta_description || ""
  );

  // Status & Modal states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Auto-generate slug from title if not manually edited
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManual) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setSlug(generated);
    }
  };

  // Tags handling
  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter" && e.key !== ",") return;
    e.preventDefault();
    const clean = tagInput.trim().replace(/,/g, "");
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Cover image upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await uploadBlogImage(file);
      if (url) {
        setCoverImage(url);
      } else {
        setErrorMessage("Failed to upload image. Please try again.");
      }
    } catch {
      setErrorMessage("Error uploading image file.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSetImageUrl = () => {
    if (imageUrlInput.trim()) {
      setCoverImage(imageUrlInput.trim());
      setImageUrlInput("");
    }
  };

  // Rich Text Editor Toolbar Helpers
  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById(
      "content-editor"
    ) as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || "text here";
    const replacement = `${prefix}${selected}${suffix}`;

    const newContent =
      content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selected.length
      );
    }, 50);
  };

  // Form submission
  const handleSubmit = async (publishState: boolean) => {
    if (!title.trim() || !slug.trim()) {
      setErrorMessage("Title and URL slug are required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const postPayload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim(),
      cover_image: coverImage,
      category,
      tags,
      published: publishState,
      published_at: publishState
        ? initialData?.published_at || new Date().toISOString()
        : null,
      reading_time: readingTime.trim() || "4 min read",
      meta_title: metaTitle.trim() || title.trim(),
      meta_description: metaDescription.trim() || excerpt.trim(),
      author_name: "Dr. Pooja Wadgaonkar Patil",
    };

    try {
      if (isEditing && initialData) {
        const success = await updatePost(initialData.id, postPayload);
        if (success) {
          router.push("/admin/posts");
          router.refresh();
        } else {
          setErrorMessage("Failed to update article in database.");
        }
      } else {
        const created = await createPost(postPayload as any);
        if (created) {
          router.push("/admin/posts");
          router.refresh();
        } else {
          setErrorMessage("Failed to create article in database.");
        }
      }
    } catch {
      setErrorMessage("An unexpected error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#CFC3CC]/40 organic-shadow">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#878787]">
            <Link href="/admin/posts" className="hover:text-[#7B5A7E]">
              Articles
            </Link>
            <span>/</span>
            <span className="text-[#D46789] font-bold">
              {isEditing ? "Edit Article" : "New Article"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#4E3953]">
            {isEditing ? `Edit: ${initialData?.title}` : "Create Patient Guide"}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-4 py-2.5 rounded-full border border-[#7B5A7E] text-[#7B5A7E] text-xs font-bold uppercase tracking-wider hover:bg-[#7B5A7E]/10 transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            <span>Live Preview</span>
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit(false)}
            className="px-4 py-2.5 rounded-full border border-[#CFC3CC] text-[#464647] text-xs font-bold uppercase tracking-wider hover:bg-[#FAF7F9] transition-colors disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit(true)}
            className="px-6 py-2.5 rounded-full bg-[#7B5A7E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#4E3953] transition-all shadow-md shadow-[#7B5A7E]/20 active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">
                  publish
                </span>
                <span>{published ? "Update & Keep Published" : "Publish Article"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-[#FDF2F4] border border-[#D46789]/30 text-[#A03055] text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-base">error</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid: Editor on Left, Meta & Settings on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Title, Excerpt, Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Slug Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#CFC3CC]/40 organic-shadow space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4E3953]">
                Article Title <span className="text-[#D46789]">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., Understanding High-Risk Pregnancy: Comprehensive Guide for Expectant Mothers"
                className="w-full px-4 py-3 text-base sm:text-lg font-serif-display font-semibold rounded-2xl border border-[#CFC3CC]/70 focus:outline-none focus:border-[#7B5A7E] focus:ring-2 focus:ring-[#7B5A7E]/20 text-[#4E3953] bg-white transition-all"
              />
            </div>

            {/* URL Slug */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#878787]">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={() => setIsSlugManual(!isSlugManual)}
                  className="text-[11px] font-semibold text-[#7B5A7E] hover:underline"
                >
                  {isSlugManual ? "Auto-generate from title" : "Edit manually"}
                </button>
              </div>
              <div className="flex items-center rounded-xl border border-[#CFC3CC]/70 bg-[#FAF7F9] px-3.5 py-2 text-xs text-[#878787]">
                <span>https://femhealthclinic.in/blog/</span>
                <input
                  type="text"
                  value={slug}
                  readOnly={!isSlugManual}
                  onChange={(e) => {
                    setIsSlugManual(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="post-url-slug"
                  className={`flex-1 bg-transparent font-medium text-[#4E3953] focus:outline-none ml-1 ${
                    isSlugManual ? "border-b border-[#7B5A7E]" : ""
                  }`}
                />
              </div>
            </div>

            {/* Excerpt / Summary */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4E3953]">
                Brief Excerpt / Summary (Card &amp; Search Engine Snippet)
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A concise 2-3 sentence overview explaining what the patient will learn from this article..."
                className="w-full p-4 text-xs sm:text-sm rounded-xl border border-[#CFC3CC]/70 focus:outline-none focus:border-[#7B5A7E] text-[#464647] bg-white font-light leading-relaxed"
              />
            </div>
          </div>

          {/* Rich Content Editor */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#CFC3CC]/40 organic-shadow space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#CFC3CC]/30 pb-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4E3953]">
                Article Content (HTML &amp; Rich Formatting)
              </label>
              <span className="text-[11px] text-[#878787]">
                Use toolbar shortcuts to structure headings, lists &amp; doctor callouts
              </span>
            </div>

            {/* Toolbar Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#FAF7F9] rounded-2xl border border-[#CFC3CC]/40">
              <button
                type="button"
                onClick={() => insertFormatting("<h2>", "</h2>")}
                className="px-2.5 py-1 text-xs font-bold text-[#4E3953] bg-white hover:bg-[#7B5A7E] hover:text-white rounded-lg border border-[#CFC3CC]/50 transition-colors shadow-2xs"
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("<h3>", "</h3>")}
                className="px-2.5 py-1 text-xs font-bold text-[#4E3953] bg-white hover:bg-[#7B5A7E] hover:text-white rounded-lg border border-[#CFC3CC]/50 transition-colors shadow-2xs"
                title="Heading 3"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("<strong>", "</strong>")}
                className="px-2.5 py-1 text-xs font-bold text-[#4E3953] bg-white hover:bg-[#7B5A7E] hover:text-white rounded-lg border border-[#CFC3CC]/50 transition-colors shadow-2xs"
                title="Bold"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("<em>", "</em>")}
                className="px-2.5 py-1 text-xs italic text-[#4E3953] bg-white hover:bg-[#7B5A7E] hover:text-white rounded-lg border border-[#CFC3CC]/50 transition-colors shadow-2xs"
                title="Italic"
              >
                I
              </button>
              <span className="w-px h-5 bg-[#CFC3CC]/60 mx-1" />
              <button
                type="button"
                onClick={() =>
                  insertFormatting("<ul>\n  <li>", "</li>\n  <li>Second item</li>\n</ul>")
                }
                className="px-2.5 py-1 text-xs font-medium text-[#4E3953] bg-white hover:bg-[#7B5A7E] hover:text-white rounded-lg border border-[#CFC3CC]/50 transition-colors shadow-2xs"
                title="Bullet List"
              >
                • Bullet List
              </button>
              <button
                type="button"
                onClick={() =>
                  insertFormatting("<ol>\n  <li>", "</li>\n  <li>Step two</li>\n</ol>")
                }
                className="px-2.5 py-1 text-xs font-medium text-[#4E3953] bg-white hover:bg-[#7B5A7E] hover:text-white rounded-lg border border-[#CFC3CC]/50 transition-colors shadow-2xs"
                title="Numbered List"
              >
                1. Numbered List
              </button>
              <button
                type="button"
                onClick={() =>
                  insertFormatting(
                    '<div class="clinical-callout">\n  <strong>Doctor\'s Insight:</strong> ',
                    "\n</div>"
                  )
                }
                className="px-2.5 py-1 text-xs font-bold text-[#D46789] bg-white hover:bg-[#D46789] hover:text-white rounded-lg border border-[#D46789]/40 transition-colors shadow-2xs"
                title="Clinical Callout Box"
              >
                🩺 Medical Callout
              </button>
              <button
                type="button"
                onClick={() =>
                  insertFormatting('<a href="https://..." target="_blank">', "</a>")
                }
                className="px-2.5 py-1 text-xs font-medium text-[#4E3953] bg-white hover:bg-[#7B5A7E] hover:text-white rounded-lg border border-[#CFC3CC]/50 transition-colors shadow-2xs"
                title="Hyperlink"
              >
                🔗 Link
              </button>
            </div>

            {/* Textarea */}
            <textarea
              id="content-editor"
              rows={16}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 font-mono text-xs sm:text-sm rounded-2xl border border-[#CFC3CC]/70 focus:outline-none focus:border-[#7B5A7E] text-[#333] bg-[#FCFBFB] leading-relaxed shadow-inner"
            />
          </div>
        </div>

        {/* Right Column: Meta Settings, Category, Image, SEO */}
        <div className="lg:col-span-4 space-y-6">
          {/* Featured Cover Image */}
          <div className="bg-white p-6 rounded-3xl border border-[#CFC3CC]/40 organic-shadow space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4E3953]">
              Featured Cover Image
            </h3>

            {coverImage ? (
              <div className="space-y-3">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#CFC3CC]/50 bg-[#F3EEF5]">
                  <Image
                    src={coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setCoverImage(null)}
                  className="w-full py-2 rounded-xl border border-[#D46789]/40 text-[#A03055] hover:bg-[#FDF2F4] text-xs font-semibold transition-colors"
                >
                  Remove Cover Image
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* File Upload Drop Area */}
                <label className="border-2 border-dashed border-[#CFC3CC] hover:border-[#7B5A7E] rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#FAF7F9]">
                  <span className="material-symbols-outlined text-3xl text-[#7B5A7E]">
                    cloud_upload
                  </span>
                  <span className="text-xs font-semibold text-[#4E3953] mt-2">
                    {isUploadingImage ? "Uploading file..." : "Click to Upload Photo"}
                  </span>
                  <span className="text-[10px] text-[#878787] mt-0.5">
                    PNG, JPG, WebP up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploadingImage}
                    className="hidden"
                  />
                </label>

                {/* Or URL paste */}
                <div className="pt-2 border-t border-[#CFC3CC]/30 space-y-2">
                  <span className="text-[10px] font-bold text-[#878787] uppercase tracking-wider">
                    Or Paste Image URL
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#CFC3CC]/60 text-[#464647] bg-white focus:outline-none focus:border-[#7B5A7E]"
                    />
                    <button
                      type="button"
                      onClick={handleSetImageUrl}
                      className="px-3 py-2 bg-[#7B5A7E] text-white rounded-xl text-xs font-bold hover:bg-[#4E3953]"
                    >
                      Set
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Category & Tags */}
          <div className="bg-white p-6 rounded-3xl border border-[#CFC3CC]/40 organic-shadow space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4E3953]">
              Category &amp; Reading Time
            </h3>

            {/* Category selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#878787]">
                Primary Medical Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFC3CC]/70 text-xs font-semibold text-[#4E3953] bg-white focus:outline-none focus:border-[#7B5A7E]"
              >
                {BLOG_CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Reading Time */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#878787]">
                Estimated Reading Time
              </label>
              <input
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#CFC3CC]/70 text-xs text-[#464647] bg-white focus:outline-none focus:border-[#7B5A7E]"
              />
            </div>

            {/* Tags input */}
            <div className="space-y-2 pt-2 border-t border-[#CFC3CC]/30">
              <label className="block text-[11px] font-semibold text-[#878787]">
                Article Tags (Press Enter or Comma to add)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="e.g. Antenatal, Ultrasound"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#CFC3CC]/70 text-[#464647] bg-white focus:outline-none focus:border-[#7B5A7E]"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-[#7B5A7E]/10 text-[#7B5A7E] rounded-xl text-xs font-bold hover:bg-[#7B5A7E] hover:text-white transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF7F9] border border-[#CFC3CC]/40 text-[11px] text-[#7B5A7E] font-medium"
                  >
                    #{t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="text-[#878787] hover:text-[#A03055]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Metadata Settings */}
          <div className="bg-white p-6 rounded-3xl border border-[#CFC3CC]/40 organic-shadow space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#4E3953]">
              Search Engine (SEO) Settings
            </h3>

            {/* Meta Title */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[#878787]">
                <span>Meta Title</span>
                <span>{metaTitle.length || title.length}/60</span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || "Custom Google Search Title"}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#CFC3CC]/70 text-[#464647] bg-white focus:outline-none focus:border-[#7B5A7E]"
              />
            </div>

            {/* Meta Description */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[#878787]">
                <span>Meta Description</span>
                <span>{metaDescription.length || excerpt.length}/160</span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={excerpt || "Search description..."}
                className="w-full p-3 text-xs rounded-xl border border-[#CFC3CC]/70 text-[#464647] bg-white focus:outline-none focus:border-[#7B5A7E]"
              />
            </div>

            {/* Google Snippet Simulation */}
            <div className="pt-3 border-t border-[#CFC3CC]/30 space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#878787]">
                Search Snippet Preview
              </span>
              <div className="p-3 bg-[#FAF7F9] rounded-xl text-left space-y-1">
                <p className="text-[10px] text-[#202124]">
                  https://femhealthclinic.in &gt; blog &gt; {slug || "slug"}
                </p>
                <p className="text-xs font-semibold text-[#1a0dab] line-clamp-1 hover:underline cursor-pointer">
                  {metaTitle || title || "Article Title Preview"} | Dr. Pooja Wadgaonkar Patil
                </p>
                <p className="text-[11px] text-[#4d5156] line-clamp-2 leading-relaxed">
                  {metaDescription || excerpt || "Educational guide overview will appear here..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-8 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-[#FDFBFC] rounded-3xl w-full max-w-4xl border border-[#CFC3CC]/50 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
            >
              {/* Modal Top Bar */}
              <div className="bg-white border-b border-[#CFC3CC]/40 p-4 px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#4E3953] uppercase tracking-wider">
                    Patient Live View Simulation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="px-4 py-1.5 rounded-full bg-[#FAF7F9] hover:bg-[#7B5A7E] hover:text-white text-xs font-bold transition-colors"
                >
                  Close Preview ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#7B5A7E]/10 text-[#7B5A7E] text-xs font-bold uppercase">
                      {category}
                    </span>
                    <span className="text-xs text-[#878787]">
                      {new Date().toLocaleDateString("en-IN", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-[#878787]">•</span>
                    <span className="text-xs text-[#878787]">{readingTime}</span>
                  </div>

                  <h1 className="text-3xl font-serif-display font-bold text-[#4E3953]">
                    {title || "Untitled Article"}
                  </h1>

                  {excerpt && (
                    <p className="text-base text-[#464647] font-light leading-relaxed border-l-2 border-[#D46789] pl-4 italic bg-[#FAF7F9] py-3 rounded-r-xl">
                      {excerpt}
                    </p>
                  )}
                </div>

                {coverImage && (
                  <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md bg-[#F3EEF5]">
                    <Image
                      src={coverImage}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Body Content */}
                <div
                  className="prose prose-slate max-w-none text-[#464647] leading-relaxed font-light space-y-4 text-base
                    [&_h2]:text-2xl [&_h2]:font-serif-display [&_h2]:font-bold [&_h2]:text-[#4E3953] [&_h2]:mt-8
                    [&_h3]:text-xl [&_h3]:font-serif-display [&_h3]:font-semibold [&_h3]:text-[#7B5A7E]
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5
                    [&_.clinical-callout]:bg-[#F9F6F9] [&_.clinical-callout]:border-l-4 [&_.clinical-callout]:border-[#D46789] [&_.clinical-callout]:p-4 [&_.clinical-callout]:rounded-r-xl [&_.clinical-callout]:my-6 [&_.clinical-callout]:text-[#4E3953]"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
