import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/ui/Motion";
import { getPostBySlug, getRelatedPosts, getPublishedPosts } from "@/lib/supabase";
import ArticleShareBar from "@/components/blog/ArticleShareBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | FemHealth Clinic",
      description: "The requested medical article could not be found.",
    };
  }

  const title = post.meta_title || `${post.title} | Dr. Pooja Wadgaonkar Patil`;
  const description = post.meta_description || post.excerpt;

  return {
    title,
    description,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.published_at || undefined,
      authors: [post.author_name],
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post.slug, 3);
  const displayDate = post.published_at || post.created_at;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    url: `https://femhealthclinic.in/blog/${post.slug}`,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    author: {
      "@type": "Person",
      name: post.author_name || "Dr. Pooja Wadgaonkar Patil",
      jobTitle: "Consultant Obstetrician & Gynaecologist",
      url: "https://femhealthclinic.in/about",
    },
    publisher: {
      "@type": "MedicalOrganization",
      name: "FemHealth Clinic",
      url: "https://femhealthclinic.in",
      logo: {
        "@type": "ImageObject",
        url: "https://femhealthclinic.in/logo-desktop.png",
      },
    },
    image: post.cover_image
      ? [
          post.cover_image.startsWith("http")
            ? post.cover_image
            : `https://femhealthclinic.in${post.cover_image.startsWith("/") ? post.cover_image : `/${post.cover_image}`}`,
        ]
      : undefined,
    keywords: post.tags?.join(", "),
    mainEntityOfPage: `https://femhealthclinic.in/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FEFCFD]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-5 md:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#878787] mb-8 font-medium">
            <Link href="/" className="hover:text-[#7B5A7E] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#7B5A7E] transition-colors">
              Blog
            </Link>
            <span>/</span>
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="text-[#D46789] hover:underline font-semibold"
            >
              {post.category}
            </Link>
          </nav>

          {/* Article Header */}
          <header className="space-y-6 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                className="px-3.5 py-1 rounded-full bg-[#F9E4EA] hover:bg-[#7B5A7E] hover:text-white text-[#D46789] border border-[#E898A8]/30 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                {post.category}
              </Link>
              <span className="text-xs text-[#878787] font-medium">
                {new Date(displayDate).toLocaleDateString("en-IN", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-xs text-[#878787]">•</span>
              <span className="text-xs text-[#878787] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#7B5A7E]">
                  schedule
                </span>
                {post.reading_time}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-display font-bold text-[#4E3953] leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#464647] font-light leading-relaxed border-l-2 border-[#D46789] pl-4 italic bg-[#FAF7F9] py-3 rounded-r-xl">
              {post.excerpt}
            </p>

            {/* Author Badge & Share Bar */}
            <div className="pt-4 border-t border-[#CFC3CC]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#D46789]/40 shadow-sm bg-[#F3EEF5]">
                  <Image
                    src="/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"
                    alt={post.author_name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#4E3953]">
                    {post.author_name}
                  </p>
                  <p className="text-xs text-[#878787]">
                    MBBS, MS OBGY, FMAS, DNB • Consultant Gynaecologist
                  </p>
                </div>
              </div>

              {/* Client Social Share Bar */}
              <ArticleShareBar title={post.title} slug={post.slug} />
            </div>
          </header>

          {/* Featured Cover Image */}
          {post.cover_image && (
            <div className="relative w-full h-72 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden mb-12 shadow-lg bg-[#F3EEF5]">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {/* Article HTML Body with Medical Styling */}
          <div
            className="prose prose-slate max-w-none text-[#464647] leading-relaxed font-light space-y-6 text-base sm:text-lg
              [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-serif-display [&_h2]:font-bold [&_h2]:text-[#4E3953] [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-serif-display [&_h3]:font-semibold [&_h3]:text-[#7B5A7E] [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:leading-relaxed [&_p]:text-[#464647]
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4
              [&_li]:text-[#464647]
              [&_strong]:font-semibold [&_strong]:text-[#4E3953]
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#7B5A7E] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-[#4E3953] [&_blockquote]:my-6
              [&_.clinical-callout]:bg-[#F9F6F9] [&_.clinical-callout]:border-l-4 [&_.clinical-callout]:border-[#D46789] [&_.clinical-callout]:p-5 [&_.clinical-callout]:rounded-r-2xl [&_.clinical-callout]:my-8 [&_.clinical-callout]:text-[#4E3953] [&_.clinical-callout]:shadow-xs"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-[#CFC3CC]/30 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#878787] uppercase tracking-wider mr-2">
                Tags:
              </span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3.5 py-1 bg-[#F9F5F7] hover:bg-[#7B5A7E] hover:text-white border border-[#CFC3CC]/50 rounded-full text-xs text-[#7B5A7E] font-medium transition-all shadow-xs cursor-pointer inline-flex items-center"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Doctor Bio Card */}
          <div className="mt-14 bg-gradient-to-br from-[#FAF7F9] to-white rounded-3xl p-8 md:p-10 border border-[#CFC3CC]/40 organic-shadow space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 shadow-lg border-2 border-[#D46789]/40 bg-[#F3EEF5]">
                <Image
                  src="/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"
                  alt="Dr. Pooja Wadgaonkar Patil"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-[#D46789] uppercase tracking-widest">
                  Author &amp; Specialist
                </span>
                <h3 className="text-xl font-serif-display font-bold text-[#4E3953]">
                  Dr. Pooja Wadgaonkar Patil
                </h3>
                <p className="text-xs text-[#7B5A7E] font-semibold">
                  MBBS, MS OBGY (MUHS Rank 15), FMAS, DNB OBGY
                </p>
                <p className="text-sm text-[#464647] font-light leading-relaxed">
                  Consultant Obstetrician, Gynaecologist, Laparoscopic Surgeon, and Infertility Specialist dedicated to evidence-based, compassionate care for women in Hinjawadi and Pune.
                </p>
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B5A7E] hover:underline"
                  >
                    <span>Read Full Doctor Profile</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-12 rounded-3xl bg-[#7B5A7E] text-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-serif-display font-bold">
                Need Clinical Advice for this Condition?
              </h3>
              <p className="text-sm text-[#FDFBFC]/90 font-light">
                Consult with Dr. Pooja Wadgaonkar Patil at FemHealth Clinic Hinjawadi.
              </p>
            </div>
            <Link
              href="/contact#book"
              className="bg-white text-[#7B5A7E] px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#FDFBFC] hover:shadow-lg transition-all active:scale-95 duration-200 shrink-0"
            >
              Book an Appointment
            </Link>
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 md:px-12 mt-20 pt-16 border-t border-[#CFC3CC]/30">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D46789] font-bold">
                  Continue Reading
                </span>
                <h2 className="text-2xl md:text-3xl font-serif-display font-bold text-[#4E3953] mt-1">
                  Related Medical Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-[#7B5A7E] hover:underline hidden sm:inline-flex items-center gap-1"
              >
                <span>View All</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link key={rel.id} href={`/blog/${rel.slug}`} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden border border-[#CFC3CC]/40 organic-shadow hover:shadow-lg hover:border-[#D46789]/40 transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-44 w-full bg-[#F3EEF5]">
                      {rel.cover_image && (
                        <Image
                          src={rel.cover_image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute top-2.5 left-2.5 bg-[#FDFBFC]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#D46789] uppercase">
                        {rel.category}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1.5">
                        <span className="text-[11px] text-[#878787] font-medium">
                          {rel.reading_time}
                        </span>
                        <h3 className="text-base font-serif-display font-semibold text-[#4E3953] group-hover:text-[#7B5A7E] transition-colors leading-snug line-clamp-2">
                          {rel.title}
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-[#7B5A7E] inline-flex items-center gap-1 pt-2">
                        <span>Read</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
