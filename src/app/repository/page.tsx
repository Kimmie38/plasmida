import Link from "next/link";

export default function RepositoryPage() {
  const dummyCards = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    title: [
      "Corporate Leadership Excellence Program",
      "Industrial Safety Training Program",
      "Digital Marketing Skills Bootcamp",
      "Sales Excellence Masterclass",
      "Executive Communication Workshop",
      "Safety Protocol Training Report",
      "Technical Skills Assessment Results",
      "Communication Skills Workshop Summary",
    ][i % 8],
    tags: ["leadership", "safety", "technical", "sales", "communication"][i % 5],
    org: "Example Corp",
    date: "Oct 20, 2024",
    size: "1.2 MB",
  }));

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
          <article key={c.id} className="card rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-md font-semibold text-slate-800">{c.title}</h3>
                <p className="text-sm text-slate-500 mt-2">Comprehensive training report covering key topics and outcomes.</p>
              </div>
              <div className="ml-3 text-xs text-slate-500">{c.date}</div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 rounded-md bg-slate-50 text-slate-700">{c.org}</span>
                <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs">{c.tags}</span>
              </div>
              <div className="text-slate-400">{c.size}</div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-slate-400">1.46 MB · Uploaded Sep 20, 2025</div>
              <div className="flex items-center gap-2">
                <button className="h-8 w-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-600">👁️</button>
                <button className="h-8 w-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-600">⬇️</button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="mt-8 text-center text-sm text-slate-500">Showing 10 of 10 reports</footer>
    </div>
  );
}
