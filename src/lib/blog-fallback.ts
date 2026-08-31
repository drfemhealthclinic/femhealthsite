export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: string;
  tags: string[];
  published: boolean;
  published_at?: string | null;
  reading_time: string;
  meta_title?: string | null;
  meta_description?: string | null;
  views_count: number;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export const BLOG_CATEGORIES = [
  "All",
  "Maternity & Pregnancy",
  "Laparoscopic Surgery",
  "Infertility & IVF",
  "PCOS & PCOD",
  "Women's Wellness",
  "Preventive Healthcare",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "fb-1",
    title: "Understanding High-Risk Pregnancy: Comprehensive Guide for Expectant Mothers",
    slug: "understanding-high-risk-pregnancy-guide",
    excerpt:
      "Learn what qualifies as a high-risk pregnancy, the vital monitoring protocols involved, and how tailored obstetric care ensures a safe, healthy journey for mother and baby.",
    content: `
      <h2>What Defines a High-Risk Pregnancy?</h2>
      <p>A pregnancy is considered high-risk when there are potential health complications that could affect the mother, the developing baby, or both. While hearing the term "high-risk" can understandably cause anxiety, modern obstetric medicine and systematic monitoring make it entirely manageable.</p>
      
      <div class="clinical-callout">
        <strong>Doctor's Insight:</strong> Early risk assessment during the first trimester allows us to formulate a proactive surveillance and care plan, mitigating almost all preventable complications before they arise.
      </div>

      <h2>Common Factors Contributing to High-Risk Status</h2>
      <ul>
        <li><strong>Maternal Age:</strong> First pregnancies after age 35 or teenage pregnancies.</li>
        <li><strong>Pre-existing Conditions:</strong> Chronic hypertension, Type 1 or Type 2 Diabetes, thyroid imbalances, renal disease, or autoimmune conditions.</li>
        <li><strong>Gestational Complications:</strong> Preeclampsia, gestational diabetes mellitus (GDM), or intrauterine growth restriction (IUGR).</li>
        <li><strong>Multiple Gestation:</strong> Carrying twins, triplets, or higher-order multiples.</li>
        <li><strong>Previous Pregnancy History:</strong> Recurrent miscarriages, preterm labor, or past caesarean complexities.</li>
      </ul>

      <h2>Essential Care Protocols</h2>
      <p>Consistent antenatal visits, targeted fetal anomaly scans, Doppler studies, and serial blood glucose profiling form the core pillars of our high-risk obstetric protocol at FemHealth Clinic. Dr. Pooja Wadgaonkar Patil coordinates care closely with fetal medicine specialists and tertiary NICU teams to guarantee 24/7 readiness.</p>

      <h2>When to Contact Your Obstetrician Immediately</h2>
      <p>Always seek urgent clinical evaluation if you experience persistent severe headaches, sudden visual disturbances, fluid leakage, sharp abdominal pain, or a noticeable reduction in fetal movements.</p>
    `,
    cover_image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    category: "Maternity & Pregnancy",
    tags: ["High-Risk Pregnancy", "Antenatal Care", "Obstetrics", "Maternal Health"],
    published: true,
    published_at: "2026-08-28T10:00:00Z",
    reading_time: "5 min read",
    meta_title: "High-Risk Pregnancy Care Guide | Dr. Pooja Wadgaonkar Patil",
    meta_description:
      "Comprehensive guide to understanding high-risk pregnancy factors, monitoring protocols, and expert antenatal care by Dr. Pooja Wadgaonkar Patil.",
    views_count: 142,
    author_name: "Dr. Pooja Wadgaonkar Patil",
    created_at: "2026-08-28T10:00:00Z",
    updated_at: "2026-08-28T10:00:00Z",
  },
  {
    id: "fb-2",
    title: "Laparoscopic Gynaecology: Why Minimally Invasive Surgery is the Gold Standard",
    slug: "laparoscopic-gynaecology-minimally-invasive-surgery-gold-standard",
    excerpt:
      "Explore how keyhole laparoscopic surgery offers pinpoint precision, significantly less post-operative pain, minimal scarring, and accelerated recovery times.",
    content: `
      <h2>The Evolution of Gynaecological Surgery</h2>
      <p>Gone are the days when addressing ovarian cysts, fibroids, or severe endometriosis required large abdominal incisions and weeks of bed rest. Laparoscopic surgery—often termed minimally invasive or keyhole surgery—has transformed surgical gynaecology into an outpatient or short-stay precision science.</p>

      <h2>Key Benefits Over Open Surgery</h2>
      <ul>
        <li><strong>Micro-Incisions (5mm–10mm):</strong> Drastically reduced tissue trauma and cosmetically superior healing with barely visible scars.</li>
        <li><strong>Minimal Blood Loss & Low Infection Risk:</strong> High-definition magnified optics allow pinpoint vessel coagulation and delicate tissue handling.</li>
        <li><strong>Accelerated Recovery:</strong> Most patients return home within 24 to 48 hours and resume normal routine activities within 7 to 10 days.</li>
        <li><strong>Reduced Adhesion Formation:</strong> Crucial for preserving future fertility in women suffering from pelvic pathology.</li>
      </ul>

      <div class="clinical-callout">
        <strong>Clinical Perspective:</strong> With advanced FMAS techniques, conditions like deep infiltrating endometriosis and large uterine fibroids can be resolved with maximal ovarian reserve preservation.
      </div>

      <h2>Common Procedures Performed Laparoscopically</h2>
      <p>At FemHealth Clinic, Dr. Pooja specializes in diagnostic laparohysteroscopy for infertility, laparoscopic myomectomy (fibroid removal), cystectomy for chocolate/dermoid cysts, and total laparoscopic hysterectomy (TLH).</p>
    `,
    cover_image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    category: "Laparoscopic Surgery",
    tags: ["Laparoscopy", "Minimally Invasive", "Fibroids", "Endometriosis", "Gynecology"],
    published: true,
    published_at: "2026-08-24T09:00:00Z",
    reading_time: "4 min read",
    meta_title: "Laparoscopic Gynaecological Surgery | Dr. Pooja Wadgaonkar Patil",
    meta_description:
      "Discover the advantages, recovery times, and applications of advanced laparoscopic surgery by specialist Dr. Pooja Wadgaonkar Patil.",
    views_count: 98,
    author_name: "Dr. Pooja Wadgaonkar Patil",
    created_at: "2026-08-24T09:00:00Z",
    updated_at: "2026-08-24T09:00:00Z",
  },
  {
    id: "fb-3",
    title: "Demystifying PCOS & PCOD: Holistic, Evidence-Based Management",
    slug: "demystifying-pcos-pcod-holistic-management",
    excerpt:
      "Unraveling the myths surrounding Polycystic Ovary Syndrome, insulin resistance, irregular cycles, and practical sustainable treatment paths.",
    content: `
      <h2>Understanding PCOS: Beyond Just Ovarian Cysts</h2>
      <p>Polycystic Ovary Syndrome (PCOS) is one of the most widespread hormonal and metabolic disorders affecting reproductive-age women today. Despite its name, PCOS is fundamentally a metabolic-endocrine condition characterized by insulin resistance and hormonal imbalance rather than mere physical cysts on the ovaries.</p>

      <h2>Recognizing the Symptoms</h2>
      <ul>
        <li>Irregular, delayed, or absent menstrual cycles.</li>
        <li>Hyperandrogenism signs: facial hair growth (hirsutism), persistent cystic acne, or male-pattern hair thinning.</li>
        <li>Difficulty with weight management and central adiposity.</li>
        <li>Mood swings, chronic fatigue, and sleep disruptions.</li>
        <li>Challenges in conceiving due to anovulatory cycles.</li>
      </ul>

      <div class="clinical-callout">
        <strong>Patient Guidance:</strong> PCOS is not a life sentence. With customized medical therapy, insulin sensitizers, and lifestyle-nutrition synergy, normal cycles and natural fertility are very achievable.
      </div>

      <h2>A Balanced Approach to Long-term Wellness</h2>
      <p>Management focuses on restoring ovulatory function, addressing insulin resistance with low-glycemic nutrition, strength training, and tailored medical support. Personalized protocols ensure women feel supported at every stage—from adolescence through family planning.</p>
    `,
    cover_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    category: "PCOS & PCOD",
    tags: ["PCOS", "PCOD", "Hormonal Health", "Fertility", "Lifestyle Medicine"],
    published: true,
    published_at: "2026-08-19T14:30:00Z",
    reading_time: "6 min read",
    meta_title: "Evidence-Based PCOS Management | Dr. Pooja Wadgaonkar Patil",
    meta_description:
      "Learn the root causes, symptoms, and comprehensive medical management for PCOS and PCOD by Dr. Pooja Wadgaonkar Patil in Pune.",
    views_count: 215,
    author_name: "Dr. Pooja Wadgaonkar Patil",
    created_at: "2026-08-19T14:30:00Z",
    updated_at: "2026-08-19T14:30:00Z",
  },
  {
    id: "fb-4",
    title: "Navigating Your Fertility Journey: When to Consult a Specialist",
    slug: "navigating-fertility-journey-when-to-consult-specialist",
    excerpt:
      "A compassionate guide on understanding fertility timelines, diagnostic evaluations, ovarian reserve testing, and personalized conception strategies.",
    content: `
      <h2>The Conception Timeline: What is Considered Normal?</h2>
      <p>For couples under 35 years of age who are actively trying to conceive with regular intercourse, it is completely normal for conception to take up to one full year. However, if pregnancy has not occurred after 12 months (or 6 months for women aged 35 and above), a baseline fertility consultation is recommended.</p>

      <h2>Key Initial Diagnostic Steps</h2>
      <ul>
        <li><strong>Ovarian Reserve Assessment:</strong> Anti-Müllerian Hormone (AMH) blood test and antral follicle count (AFC) via transvaginal pelvic ultrasound.</li>
        <li><strong>Tubal Patency Assessment:</strong> Hysterosalpingography (HSG) or Sono-salpingography to confirm fallopian tube health.</li>
        <li><strong>Semen Analysis:</strong> Essential basic evaluation of sperm count, motility, and morphology.</li>
        <li><strong>Endocrine Profiling:</strong> Thyroid function (TSH) and prolactin levels.</li>
      </ul>

      <div class="clinical-callout">
        <strong>Doctor's Advice:</strong> Infertility is a shared journey and both partners should be evaluated together without blame or stigma. Simple treatments like ovulation induction often succeed before complex interventions are needed.
      </div>
    `,
    cover_image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=1200&auto=format&fit=crop",
    category: "Infertility & IVF",
    tags: ["Infertility", "Conception", "AMH", "IVF", "Reproductive Health"],
    published: true,
    published_at: "2026-08-14T11:00:00Z",
    reading_time: "5 min read",
    meta_title: "Fertility Guidance & Specialist Consultation | Dr. Pooja Wadgaonkar Patil",
    meta_description:
      "When to consult a fertility specialist, essential diagnostic steps, and compassionate guidance from Dr. Pooja Wadgaonkar Patil.",
    views_count: 176,
    author_name: "Dr. Pooja Wadgaonkar Patil",
    created_at: "2026-08-14T11:00:00Z",
    updated_at: "2026-08-14T11:00:00Z",
  },
];
