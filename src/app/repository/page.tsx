"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import {
  FiFileText,
  FiCalendar,
  FiUsers,
  FiMapPin,
  FiClock,
  FiEye,
  FiDownload,
  FiDollarSign,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

type ReportCard = {
  id: number;
  title: string;
  fileName: string;
  description: string;
  org: string;
  price: string;
  date: string;
  duration: string;
  contact: string;
  attendees: string;
  location: string;
  tags: string[];
  status: "completed" | "draft" | string;
  size: string;
  uploaded: string;
};

const CATEGORIES = [
  "Leadership",
  "Technical",
  "Safety",
  "Compliance",
  "Sales",
  "Communication",
  "Management",
  "HR",
  "Onboarding",
  "Assessment",
];

const getFileType = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return "PDF";
    case "docx":
    case "doc":
      return "Word";
    case "ppt":
    case "pptx":
      return "PowerPoint";
    case "xls":
    case "xlsx":
      return "Excel";
    case "jpg":
    case "jpeg":
    case "png":
      return "Image";
    default:
      return "Other";
  }
};

const statusColor = (s: string) =>
  s === "completed" ? "bg-green-50 text-green-700" : "bg-slate-50 text-slate-600";

const categoryColor = (tag: string) => {
  const t = tag.toLowerCase();
  if (t === "leadership") return "bg-purple-100 text-purple-700";
  if (t === "safety") return "bg-red-100 text-red-700";
  if (t === "technical") return "bg-blue-100 text-blue-700";
  if (t === "sales") return "bg-green-100 text-green-700";
  if (t === "communication") return "bg-pink-100 text-pink-700";
  return "bg-slate-100 text-slate-700";
};

export default function RepositoryPage() {
  const router = useRouter();

  const dummyCards: ReportCard[] = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    title: [
      "Corporate Leadership Excellence Program",
      "Industrial Safety Training Program",
      "Digital Marketing Skills Bootcamp",
      "Sales Excellence Masterclass",
      "Executive Communication Workshop",
      "Safety Protocol Training Report",
      "Technical Skills Assessment Results",
      "Leadership Development Workshop - Q4 2024",
      "Communication Skills Workshop Summary",
    ][i % 9],
    fileName: [
      "leadership-workshop-q4-2024.pdf",
      "safety-training-dangote-2024.pdf",
      "digital-marketing-gtbank.xlsx",
      "sales-training-gsk.pdf",
      "communication-workshop-mtn.docx",
      "safety-protocol-2024.pdf",
      "tech-assessment-results.xlsx",
      "leadership-workshop-q4-2024.pdf",
      "communication-workshop.docx",
    ][i % 9],
    description:
      "Comprehensive training covering key topics, outcomes and practical exercises designed for workplace improvement and skill development.",
    org: [
      "First Bank Nigeria",
      "Dangote Cement",
      "GTBank",
      "GlaxoSmithKline Nigeria",
      "MTN Nigeria",
      "Safety Institute",
      "Tech Lab",
      "First Bank Nigeria",
      "Training Center",
    ][i % 9],
    price: ["₦2,500,000", "₦1,800,000", "₦1,200,000", "₦950,000", "₦3,200,000", "", "", "", ""][
      i % 9
    ],
    date: [
      "Nov 15, 2024",
      "Oct 20, 2024",
      "Dec 1, 2024",
      "Nov 28, 2024",
      "Nov 10, 2024",
      "Oct 20, 2024",
      "Dec 1, 2024",
      "Nov 15, 2024",
      "Nov 10, 2024",
    ][i % 9],
    duration: ["3 days", "3 days", "5 days", "2 days", "3 days", "", "", "", ""][i % 9],
    contact: [
      "Dr. Sarah Adebayo",
      "Engr. Michael Okafor",
      "Adaora Nwankwo",
      "Jennifer Okoli",
      "Prof. Kemi Rotimi",
      "Mike Rodriguez",
      "Alex Chen",
      "Sarah Johnson",
      "Emily Davis",
    ][i % 9],
    attendees: [
      "25 senior managers",
      "120 factory workers and supervisors",
      "30 marketing executives",
      "18 senior sales representatives",
      "15 C-level executives",
      "120 employees",
      "30 developers",
      "25 managers",
      "40 staff members",
    ][i % 9],
    location: [
      "First Bank Training Center, Lagos",
      "Dangote Cement Plant, Ibese",
      "GTBank Academy, Victoria Island",
      "GSK Office, Ikeja",
      "MTN Headquarters, Ikoyi",
      "Main Auditorium",
      "Tech Lab",
      "Main Conference Room",
      "Training Center",
    ][i % 9],
    tags: [
      ["Leadership", "Management", "Corporate"],
      ["Safety", "Compliance", "Manufacturing"],
      ["Digital Marketing", "Technical", "SEO"],
      ["Sales", "Pharmaceutical"],
      ["Communication", "Presentation"],
      ["Safety", "Annual", "Protocols"],
      ["Technical", "Assessment", "Skills"],
      ["Leadership", "Management", "Quarterly"],
      ["Communication", "Presentation", "Interpersonal"],
    ][i % 9],
    status: i % 2 === 0 ? "completed" : "draft",
    size: ["1.95 MB", "1.46 MB", "500 KB", "1.71 MB", "875 KB", "1.46 MB", "500 KB", "1.95 MB", "875 KB"][
      i % 9
    ],
    uploaded: "Uploaded Sep 20, 2025",
  }));

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("Newest first");

  const filteredCards = useMemo(() => {
    const cat = category;
    return dummyCards
      .filter((card) => {
        const q = search.trim().toLowerCase();
        const titleMatch = card.title.toLowerCase().includes(q);
        const orgMatch = card.org.toLowerCase().includes(q);
        const tagsMatch = card.tags.some((t) => t.toLowerCase().includes(q));
        const searchMatch = q === "" ? true : titleMatch || orgMatch || tagsMatch;

        const categoryMatch =
          cat === "All Categories" ||
          (cat === "Others"
            ? !card.tags.some((t) => CATEGORIES.map((c) => c.toLowerCase()).includes(t.toLowerCase()))
            : card.tags.some((t) => t.toLowerCase() === (cat || "").toLowerCase()));

        const fileType = getFileType(card.fileName);
        const typeMatch = type === "All Types" || fileType.toLowerCase() === type.toLowerCase();

        return searchMatch && categoryMatch && typeMatch;
      })
      .sort((a, b) => {
        const da = new Date(a.date).getTime();
        const db = new Date(b.date).getTime();
        return sort === "Newest first" ? db - da : da - db;
      });
  }, [dummyCards, search, category, type, sort]);

  // Carousel state for mobile
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let raf = 0;

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollLeft = el.scrollLeft;
        const cardWidth = el.clientWidth * 0.9 + 16; // item width + gap
        const idx = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.max(0, Math.min(filteredCards.length - 1, idx)));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [filteredCards.length]);

  const scrollToIndex = (i: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.9 + 16;
    el.scrollTo({ left: i * cardWidth, behavior: "smooth" });
  };

  return (
    <div className="repository-page p-4 md:p-8 bg-gray-50 min-h-screen">
      <header className="repository-header mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Training Reports Repository</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and organize all your training documentation</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/upload")}
            className="h-10 inline-flex items-center gap-2 rounded-md bg-blue-600 text-white px-3 font-medium hover:bg-blue-600 transition"
          >
            + Upload Report
          </button>
        </div>
      </header>

      <section className="controls mb-6 flex flex-col md:flex-row gap-3">
        <input
          placeholder="Search reports by title, description, or tags"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 h-10 rounded-md border border-gray-500 px-3 text-black"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 rounded-md border border-gray-500 px-2 text-black"
        >
          <option>All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
          <option>Others</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-10 rounded-md border border-gray-500 px-2 text-black"
        >
          <option>All Types</option>
          <option>PDF</option>
          <option>PowerPoint</option>
          <option>Word</option>
          <option>Excel</option>
          <option>Image</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 rounded-md border border-gray-500 px-2 text-black"
        >
          <option>Newest first</option>
          <option>Oldest first</option>
        </select>
      </section>

      {/* Mobile carousel: visible on small screens only */}
      <section className="md:hidden">
        <div
          ref={carouselRef}
          className="report-carousel flex overflow-x-auto snap-x snap-mandatory gap-4 py-4 px-2 touch-pan-x scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {filteredCards.map((c) => (
            <article key={c.id} className="card flex-shrink-0 w-[86%] sm:w-[72%] rounded-lg border border-slate-100 bg-white p-4 shadow-sm snap-center mx-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="file-icon h-8 w-8 rounded-md bg-slate-50 flex items-center justify-center text-sky-600">
                    <FiFileText />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-md font-semibold text-slate-800">{c.title}</h3>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`${categoryColor(c.tags[0])} rounded-full px-2 py-1 text-xs font-medium`}>{c.tags[0]}</span>
                        <span className={`${statusColor(c.status)} rounded-full px-2 py-1 text-xs font-medium`}>{c.status}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                      <span className="text-slate-500 font-medium">{c.fileName}</span>
                    </div>

                    <p className="text-sm text-slate-500 mt-3 line-clamp-3">{c.description}</p>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                      {c.price && (
                        <div className="flex items-center gap-3">
                          <FiDollarSign className="text-slate-400" />
                          <span className="text-slate-700 font-medium">{c.price}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <FiCalendar className="text-slate-400" />
                        <span>{c.date}</span>
                      </div>

                      {c.duration && (
                        <div className="flex items-center gap-3">
                          <FiClock className="text-slate-400" />
                          <span>{c.duration}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <FiUsers className="text-slate-400" />
                        <span>{c.contact}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <FiMapPin className="text-slate-400" />
                        <span>{c.location}</span>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-2">
                        {c.tags.map((t) => (
                          <span key={t} className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-700">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-slate-400">{c.size} · {c.uploaded}</div>
                <div className="flex items-center gap-2">
                  <button className="h-8 w-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-600"><FiEye /></button>
                  <button className="h-8 w-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-600"><FiDownload /></button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div className="dots mt-2 flex items-center justify-center gap-2">
          {filteredCards.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 w-2 rounded-full ${i === activeIndex ? 'bg-sky-600' : 'bg-slate-300'}`}
            />
          ))}
        </div>
      </section>

      {/* Grid for md+ */}
      <section className="hidden md:grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredCards.map((c) => (
          <article key={c.id} className="card rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="file-icon h-8 w-8 rounded-md bg-slate-50 flex items-center justify-center text-sky-600">
                  <FiFileText />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-md font-semibold text-slate-800">{c.title}</h3>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`${categoryColor(c.tags[0])} rounded-full px-2 py-1 text-xs font-medium`}>{c.tags[0]}</span>
                      <span className={`${statusColor(c.status)} rounded-full px-2 py-1 text-xs font-medium`}>{c.status}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span className="text-slate-500 font-medium">{c.fileName}</span>
                  </div>

                  <p className="text-sm text-slate-500 mt-3 line-clamp-3">{c.description}</p>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    {c.price && (
                      <div className="flex items-center gap-3">
                        <FiDollarSign className="text-slate-400" />
                        <span className="text-slate-700 font-medium">{c.price}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <FiCalendar className="text-slate-400" />
                      <span>{c.date}</span>
                    </div>

                    {c.duration && (
                      <div className="flex items-center gap-3">
                        <FiClock className="text-slate-400" />
                        <span>{c.duration}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <FiUsers className="text-slate-400" />
                      <span>{c.contact}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <FiMapPin className="text-slate-400" />
                      <span>{c.location}</span>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span key={t} className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-700">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-400">{c.size} · {c.uploaded}</div>
              <div className="flex items-center gap-2">
                <button className="h-8 w-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-600"><FiEye /></button>
                <button className="h-8 w-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-600"><FiDownload /></button>
              </div>
            </div>
          </article>
        ))}

        {filteredCards.length === 0 && (
          <div className="text-center text-slate-600 col-span-full py-12">No reports match your filters.</div>
        )}
      </section>

      <footer className="mt-8 text-center text-sm text-slate-500">
        Showing {filteredCards.length} of {dummyCards.length} reports
      </footer>
    </div>
  );
}
