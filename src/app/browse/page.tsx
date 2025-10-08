import Link from "next/link";
import { FiFolder, FiTrendingUp, FiCalendar } from "react-icons/fi";

export default function BrowsePage() {
  const categories = [
    { name: "Leadership", count: 2 },
    { name: "Technical", count: 2 },
    { name: "Safety", count: 2 },
    { name: "Compliance", count: 0 },
    { name: "Sales", count: 2 },
    { name: "Communication", count: 2 },
    { name: "Management", count: 0 },
    { name: "HR", count: 0 },
    { name: "Onboarding", count: 0 },
    { name: "Assessment", count: 0 },
  ];

  return (
    <div className="browse-page p-8 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Training Projects Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Explore your training projects and documentation by category and statistics</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="stat-card rounded-lg bg-white p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Total Projects</div>
              <div className="text-xl font-semibold text-slate-800">10</div>
            </div>
            <div className="h-10 w-10 rounded bg-slate-50 flex items-center justify-center text-sky-600">
              <FiFolder />
            </div>
          </div>
        </div>

        <div className="stat-card rounded-lg bg-white p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Total Revenue</div>
              <div className="text-xl font-semibold text-emerald-600">₦9,650,000</div>
            </div>
            <div className="h-10 w-10 rounded bg-slate-50 flex items-center justify-center text-emerald-600">
              <FiTrendingUp />
            </div>
          </div>
        </div>

        <div className="stat-card rounded-lg bg-white p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">This Month</div>
              <div className="text-xl font-semibold text-slate-800">0</div>
            </div>
            <div className="h-10 w-10 rounded bg-slate-50 flex items-center justify-center text-slate-600">
              <FiCalendar />
            </div>
          </div>
        </div>

        <div className="stat-card rounded-lg bg-white p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Most Popular</div>
              <div className="text-xl font-semibold text-slate-800">Leadership</div>
            </div>
            <div className="h-10 w-10 rounded bg-slate-50 flex items-center justify-center text-amber-500">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="categories bg-white rounded-lg p-6 border border-slate-100 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-black">Categories Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((c) => {
            const colorMap: Record<string, string> = {
              Leadership: 'bg-purple-100 text-purple-700',
              Technical: 'bg-blue-100 text-blue-700',
              Safety: 'bg-red-100 text-red-700',
              Compliance: 'bg-amber-100 text-amber-700',
              Sales: 'bg-emerald-100 text-emerald-700',
              Communication: 'bg-pink-100 text-pink-700',
              Management: 'bg-orange-100 text-orange-700',
              HR: 'bg-indigo-100 text-indigo-700',
              Onboarding: 'bg-teal-100 text-teal-700',
              Assessment: 'bg-cyan-100 text-cyan-700',
            };
            const badgeClass = colorMap[c.name] || 'bg-slate-100 text-slate-700';

            return (
              <Link key={c.name} href="#" className="category-card group rounded-lg border border-slate-100 bg-white p-4 text-center hover:shadow">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-10 w-10 rounded bg-slate-50 flex items-center justify-center text-slate-600">
                    <FiFolder />
                  </div>
                  <div className="text-sm font-medium text-slate-800">{c.name}</div>
                  <div className="mt-2">
                    <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
                      {c.count} reports
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
