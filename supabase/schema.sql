-- ==============================================================================
-- FemHealth Clinic — Blog & Patient Education Database Schema
-- Run this in your Supabase project's SQL Editor (Dashboard > SQL Editor)
-- ==============================================================================

-- 1. Create table for Blog Posts
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL DEFAULT 'Women''s Wellness',
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  reading_time TEXT DEFAULT '4 min read',
  meta_title TEXT,
  meta_description TEXT,
  views_count INTEGER DEFAULT 0,
  author_name TEXT DEFAULT 'Dr. Pooja Wadgaonkar Patil',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by slug, category, and publication state
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category);

-- 2. Setup Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public / anon) to view published posts
CREATE POLICY "Public can view published posts" 
  ON public.posts
  FOR SELECT 
  USING (published = true);

-- Allow authenticated admin users full CRUD access
CREATE POLICY "Admins have full access to all posts" 
  ON public.posts
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Allow anon public key full CRUD access for admin operations
CREATE POLICY "Allow anon CRUD for posts" 
  ON public.posts
  FOR ALL 
  TO anon 
  USING (true) 
  WITH CHECK (true);

-- 3. Automatic updated_at timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_posts_updated_at ON public.posts;
CREATE TRIGGER set_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4. Storage Bucket for Blog Media & Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view images
CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- Storage RLS: Authenticated users can upload/manage images
CREATE POLICY "Authenticated users can upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can update/delete blog images"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'blog-images')
  WITH CHECK (bucket_id = 'blog-images');

-- ==============================================================================
-- Initial Clinical Seed Data
-- ==============================================================================

INSERT INTO public.posts (
  title,
  slug,
  excerpt,
  content,
  cover_image,
  category,
  tags,
  published,
  published_at,
  reading_time,
  meta_title,
  meta_description,
  author_name
) VALUES 
(
  'Understanding High-Risk Pregnancy: Comprehensive Guide for Expectant Mothers',
  'understanding-high-risk-pregnancy-guide',
  'Learn what qualifies as a high-risk pregnancy, the vital monitoring protocols involved, and how tailored obstetric care ensures a safe, healthy journey for mother and baby.',
  '<h2>What Defines a High-Risk Pregnancy?</h2><p>A pregnancy is considered high-risk when there are potential health complications that could affect the mother, the developing baby, or both. While hearing the term "high-risk" can understandably cause anxiety, modern obstetric medicine and systematic monitoring make it entirely manageable.</p><div class="clinical-callout"><strong>Doctor''s Insight:</strong> Early risk assessment during the first trimester allows us to formulate a proactive surveillance and care plan, mitigating almost all preventable complications before they arise.</div><h2>Common Factors Contributing to High-Risk Status</h2><ul><li><strong>Maternal Age:</strong> First pregnancies after age 35 or teenage pregnancies.</li><li><strong>Pre-existing Conditions:</strong> Chronic hypertension, Type 1 or Type 2 Diabetes, thyroid imbalances, renal disease, or autoimmune conditions.</li><li><strong>Gestational Complications:</strong> Preeclampsia, gestational diabetes mellitus (GDM), or intrauterine growth restriction (IUGR).</li><li><strong>Multiple Gestation:</strong> Carrying twins, triplets, or higher-order multiples.</li><li><strong>Previous Pregnancy History:</strong> Recurrent miscarriages, preterm labor, or past caesarean complexities.</li></ul><h2>Essential Care Protocols</h2><p>Consistent antenatal visits, targeted fetal anomaly scans, Doppler studies, and serial blood glucose profiling form the core pillars of our high-risk obstetric protocol at FemHealth Clinic. Dr. Pooja Wadgaonkar Patil coordinates care closely with fetal medicine specialists and tertiary NICU teams to guarantee 24/7 readiness.</p>',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
  'Maternity & Pregnancy',
  ARRAY['High-Risk Pregnancy', 'Antenatal Care', 'Obstetrics', 'Maternal Health'],
  true,
  NOW() - INTERVAL '3 days',
  '5 min read',
  'High-Risk Pregnancy Care Guide | Dr. Pooja Wadgaonkar Patil',
  'Comprehensive guide to understanding high-risk pregnancy factors, monitoring protocols, and expert antenatal care by Dr. Pooja Wadgaonkar Patil.',
  'Dr. Pooja Wadgaonkar Patil'
),
(
  'Laparoscopic Gynaecology: Why Minimally Invasive Surgery is the Gold Standard',
  'laparoscopic-gynaecology-minimally-invasive-surgery-gold-standard',
  'Explore how keyhole laparoscopic surgery offers pinpoint precision, significantly less post-operative pain, minimal scarring, and accelerated recovery times.',
  '<h2>The Evolution of Gynaecological Surgery</h2><p>Gone are the days when addressing ovarian cysts, fibroids, or severe endometriosis required large abdominal incisions and weeks of bed rest. Laparoscopic surgery—often termed minimally invasive or keyhole surgery—has transformed surgical gynaecology into an outpatient or short-stay precision science.</p><h2>Key Benefits Over Open Surgery</h2><ul><li><strong>Micro-Incisions (5mm–10mm):</strong> Drastically reduced tissue trauma and cosmetically superior healing with barely visible scars.</li><li><strong>Minimal Blood Loss & Low Infection Risk:</strong> High-definition magnified optics allow pinpoint vessel coagulation.</li><li><strong>Accelerated Recovery:</strong> Most patients return home within 24 to 48 hours and resume normal routine activities within 7 to 10 days.</li><li><strong>Reduced Adhesion Formation:</strong> Crucial for preserving future fertility in women suffering from pelvic pathology.</li></ul><div class="clinical-callout"><strong>Clinical Perspective:</strong> With advanced FMAS techniques, conditions like deep infiltrating endometriosis and large uterine fibroids can be resolved with maximal tissue preservation.</div>',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop',
  'Laparoscopic Surgery',
  ARRAY['Laparoscopy', 'Minimally Invasive', 'Fibroids', 'Endometriosis', 'Gynecology'],
  true,
  NOW() - INTERVAL '7 days',
  '4 min read',
  'Laparoscopic Gynaecological Surgery | Dr. Pooja Wadgaonkar Patil',
  'Discover the advantages, recovery times, and applications of advanced laparoscopic surgery by specialist Dr. Pooja Wadgaonkar Patil.',
  'Dr. Pooja Wadgaonkar Patil'
),
(
  'Demystifying PCOS & PCOD: Holistic, Evidence-Based Management',
  'demystifying-pcos-pcod-holistic-management',
  'Unraveling the myths surrounding Polycystic Ovary Syndrome, insulin resistance, irregular cycles, and practical sustainable treatment paths.',
  '<h2>Understanding PCOS: Beyond Just Ovarian Cysts</h2><p>Polycystic Ovary Syndrome (PCOS) is one of the most widespread hormonal and metabolic disorders affecting reproductive-age women today. Despite its name, PCOS is fundamentally a metabolic-endocrine condition characterized by insulin resistance and hormonal imbalance rather than mere physical cysts on the ovaries.</p><h2>Recognizing the Symptoms</h2><ul><li>Irregular, delayed, or absent menstrual cycles.</li><li>Hyperandrogenism signs: facial hair growth (hirsutism), persistent cystic acne, or male-pattern hair thinning.</li><li>Difficulty with weight management and central adiposity.</li><li>Mood swings, chronic fatigue, and sleep disruptions.</li><li>Challenges in conceiving due to anovulatory cycles.</li></ul><div class="clinical-callout"><strong>Patient Guidance:</strong> PCOS is not a life sentence. With customized medical therapy, insulin sensitizers, and lifestyle-nutrition synergy, normal cycles and natural fertility are very achievable.</div>',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
  'PCOS & PCOD',
  ARRAY['PCOS', 'PCOD', 'Hormonal Health', 'Fertility', 'Lifestyle Medicine'],
  true,
  NOW() - INTERVAL '12 days',
  '6 min read',
  'Evidence-Based PCOS Management | Dr. Pooja Wadgaonkar Patil',
  'Learn the root causes, symptoms, and comprehensive medical management for PCOS and PCOD by Dr. Pooja Wadgaonkar Patil in Pune.',
  'Dr. Pooja Wadgaonkar Patil'
)
ON CONFLICT (slug) DO NOTHING;
