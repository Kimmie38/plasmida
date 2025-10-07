import Link from "next/link";
import { FiFileText, FiCalendar, FiUsers, FiMapPin, FiClock, FiEye, FiDownload, FiDollarSign } from "react-icons/fi";

export default function RepositoryPage() {
  const dummyCards = Array.from({ length: 9 }).map((_, i) => ({
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
    org: ["First Bank Nigeria", "Dangote Cement", "GTBank", "GlaxoSmithKline Nigeria", "MTN Nigeria", "Safety Institute", "Tech Lab", "First Bank Nigeria", "Training Center"][i % 9],
    price: ["₦2,500,000", "₦1,800,000", "₦1,200,000", "₦950,000", "₦3,200,000", "", "", "", "" ][i % 9],
    date: ["Nov 15, 2024", "Oct 20, 2024", "Dec 1, 2024", "Nov 28, 2024", "Nov 10, 2024", "Oct 20, 2024", "Dec 1, 2024", "Nov 15, 2024", "Nov 10, 2024"][i % 9],
    duration: ["3 days", "3 days", "5 days", "2 days", "3 days", "", "", "", "" ][i % 9],
    contact: ["Dr. Sarah Adebayo", "Engr. Michael Okafor", "Adaora Nwankwo", "Jennifer Okoli", "Prof. Kemi Rotimi", "Mike Rodriguez", "Alex Chen", "Sarah Johnson", "Emily Davis"][i % 9],
    attendees: ["25 senior managers", "120 factory workers and supervisors", "30 marketing executives", "18 senior sales representatives", "15 C-level executives", "120 employees", "30 developers", "25 managers", "40 staff members"][i % 9],
    location: ["First Bank Training Center, Lagos", "Dangote Cement Plant, Ibese", "GTBank Academy, Victoria Island", "GSK Office, Ikeja", "MTN Headquarters, Ikoyi", "Main Auditorium", "Tech Lab", "Main Conference Room", "Training Center"][i % 9],
    tags: [
      ["leadership", "management", "corporate"],
      ["safety", "compliance", "manufacturing"],
      ["digital marketing", "social media", "SEO"],
      ["sales", "pharmaceutical"],
      ["communication", "presentation"],
      ["safety", "annual", "protocols"],
      ["technical", "assessment", "skills"],
      ["leadership", "management", "quarterly"],
      ["communication", "presentation", "interpersonal"],
    ][i % 9],
    status: i % 2 === 0 ? "completed" : "draft",
    size: ["1.95 MB", "1.46 MB", "500 KB", "1.71 MB", "875 KB", "1.46 MB", "500 KB", "1.95 MB", "875 KB"][i % 9],
    uploaded: "Uploaded Sep 20, 2025",
  }));

  const statusColor = (s: string) => {
    if (s === "completed") return "bg-green-50 text-green-700";
    if (s === "draft") return "bg-slate-50 text-slate-600";
    return "bg-slate-50 text-slate-600";
  };

  const categoryColor = (tag: string) => {
    if (tag === "leadership") return "bg-purple-100 text-purple-700";
    if (tag === "safety") return "bg-red-100 text-red-700";
    if (tag === "technical") return "bg-blue-100 text-blue-700";
    if (tag === "sales") return "bg-green-100 text-green-700";
    if (tag === "communication") return "bg-pink-100 text-pink-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <div className="repository-page p-8 bg-gray-50 min-h-screen">
      <header className="repository-header mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Training Reports Repository</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and organize all your training documentation</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-10 inline-flex items-center gap-2 rounded-md bg-sky-600 text-white px-3 font-medium hover:bg-sky-700 transition">
            + Upload Report
          </button>
          <Link href="#" className="text-sm text-slate-500 hover:underline">Browse</Link>
        </div>
      </header>

      <section className="controls mb-6 flex flex-col md:flex-row gap-3">
        <input placeholder="Search reports by title, description, or tags" className="flex-1 h-10 rounded-md border border-slate-200 px-3" />
        <select className="h-10 rounded-md border border-slate-200 px-2">
          <option>All Categories</option>
        </select>
        <select className="h-10 rounded-md border border-slate-200 px-2">
          <option>All Types</option>
        </select>
        <select className="h-10 rounded-md border border-slate-200 px-2">
          <option>Newest first</option>
        </select>
      </section>

      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {dummyCards.map((c) => (
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
                    <div className="flex items-center gap-3">
                      <FiDollarSign className="text-slate-400" />
                      <span className="text-slate-700 font-medium">{c.price || ""}</span>
                    </div>

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
      </section>

      <footer className="mt-8 text-center text-sm text-slate-500">Showing 10 of 10 reports</footer>
    </div>
  );
}
