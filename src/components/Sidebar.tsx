"use client";

import Link from "next/link";
import { FiDatabase, FiUpload, FiSearch, FiUsers, FiFolder } from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="sidebar-root bg-white border-r border-slate-100 min-h-screen w-72 flex flex-col">
      <div className="sidebar-brand flex items-center gap-3 mb-6">
        <div className="brand-logo flex items-center justify-center h-12 w-12 rounded-lg bg-sky-100 text-sky-700 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor">
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 6h8M8 12h8M8 18h8M4 6h.01M4 12h.01M4 18h.01" />
          </svg>
        </div>
        <div className="brand-text">
          <h3 className="text-sm font-semibold text-slate-800">TrainDocs</h3>
          <p className="text-xs text-slate-500">Training Reports Repository</p>
        </div>
      </div>

      <nav className="sidebar-nav mt-2">
        <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-2">Navigation</h4>
        <ul className="space-y-1">
          <li>
            <Link href="#" className="nav-item flex items-center gap-3 w-full rounded-md px-3 py-2 bg-sky-50 text-sky-700 font-medium">
              <FiDatabase className="text-lg" aria-hidden />
              <span className="text-sm">Repository</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-item flex items-center gap-3 w-full rounded-md px-3 py-2 text-slate-700 hover:bg-slate-50">
              <FiUpload className="text-lg text-slate-500" aria-hidden />
              <span className="text-sm">Upload Report</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-item flex items-center gap-3 w-full rounded-md px-3 py-2 text-slate-700 hover:bg-slate-50">
              <FiSearch className="text-lg text-slate-500" aria-hidden />
              <span className="text-sm">Browse</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-item flex items-center gap-3 w-full rounded-md px-3 py-2 text-slate-700 hover:bg-slate-50">
              <FiUsers className="text-lg text-slate-500" aria-hidden />
              <span className="text-sm">Staff</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="quick-stats mt-6">
        <h4 className="text-xs text-slate-400 uppercase tracking-wider mb-2">Quick Stats</h4>
        <div className="stats space-y-2 text-sm text-slate-600">
          <div className="stat-row flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiFolder className="text-slate-400" aria-hidden />
              <span>Total Reports</span>
            </div>
            <span className="text-sky-600 font-semibold">0</span>
          </div>

          <div className="stat-row flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3h18v4H3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 11h14v10H5z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>This Month</span>
            </div>
            <span className="text-sky-600 font-semibold">0</span>
          </div>
        </div>
      </div>

      <div className="mt-auto user-card p-3 rounded-lg bg-slate-50 flex items-center gap-3">
        <div className="user-avatar h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">U</div>
        <div className="user-info text-sm">
          <div className="font-medium text-slate-800">User</div>
          <div className="text-xs text-slate-500">Manage training reports</div>
        </div>
      </div>
    </aside>
  );
}
