import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBFC]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-5 py-28 text-center">
        <div className="max-w-md space-y-5 bg-white p-8 sm:p-12 rounded-3xl border border-[#CFC3CC]/40 organic-shadow">
          <div className="w-16 h-16 rounded-full bg-[#7B5A7E]/10 text-[#7B5A7E] mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">menu_book</span>
          </div>
          <h1 className="text-2xl font-serif-display font-bold text-[#4E3953]">
            Article Not Found
          </h1>
          <p className="text-sm text-[#464647] font-light leading-relaxed">
            The medical article you are looking for may have been moved, updated, or unpublished.
          </p>
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[#7B5A7E] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#4E3953] transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Back to All Articles</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
