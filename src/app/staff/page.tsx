"use client";

import React, { useState } from "react";
import { FiUser, FiBriefcase } from "react-icons/fi";
import AddStaffModal from "@/components/AddStaffModal";

export default function StaffPage() {
  const [staff, setStaff] = useState([
    { name: 'Adebayo Johnson', email: 'adebayo.johnson@company.com', dept: 'Information Technology', unit: 'Software Development', status: 'active', value: '₦650,000', date: 'Jan 15, 2024' },
    { name: 'Fatima Abubakar', email: 'fatima.abubakar@company.com', dept: 'Human Resources', unit: 'Talent Acquisition', status: 'active', value: '₦650,000', date: 'Feb 1, 2024' },
    { name: 'Chinedu Okafor', email: 'chinedu.okafor@company.com', dept: 'Sales & Marketing', unit: 'Digital Marketing', status: 'active', value: '₦920,000', date: 'Mar 1, 2024' },
    { name: 'Aminat Bello', email: 'aminat.bello@company.com', dept: 'Finance', unit: 'Financial Analysis', status: 'active', value: '₦750,000', date: 'Apr 15, 2024' },
    { name: 'Emeka Nwosu', email: 'emeka.nwosu@company.com', dept: 'Operations', unit: 'Supply Chain', status: 'active', value: '₦1,200,000', date: 'May 1, 2024' },
    { name: 'Kemi Adeyemi', email: 'kemi.adeyemi@company.com', dept: 'Customer Service', unit: 'Customer Support', status: 'prospect', value: '₦480,000', date: 'Jun 1, 2024' },
    { name: 'Ibrahim Suleiman', email: 'ibrahim.suleiman@company.com', dept: 'Engineering', unit: 'Product Development', status: 'active', value: '₦1,050,000', date: 'Jul 15, 2024' },
    { name: 'Grace Okoro', email: 'grace.okoro@company.com', dept: 'Legal & Compliance', unit: 'Regulatory Affairs', status: 'active', value: '₦680,000', date: 'Aug 1, 2024' },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = (data: any) => {
    const newStaff = {
      name: data.staffName,
      email: data.email || `${data.staffName.replace(/\s+/g, '.').toLowerCase()}@example.com`,
      dept: data.department,
      unit: data.unit || "",
      status: (data.status || "prospect").toLowerCase(),
      value: data.contractValue || "",
      date: data.contractStart || new Date().toLocaleDateString(),
    };

    setStaff((s) => [newStaff, ...s]);
  };

  return (
    <div className="staff-page p-8 bg-gray-50 min-h-screen">
      <header className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">Staff Management</h1>
          <p className="text-sm text-gray-700 mt-1">Manage all staff members for the agency</p>
        </div>

        <button onClick={handleOpen} className="inline-flex items-center gap-2 h-10 px-3 rounded bg-sky-600 text-white hover:bg-sky-700 transition">
          + Add New Staff
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-700">Total Staff</div>
          <div className="text-xl font-semibold text-black mt-2">{staff.length}</div>
        </div>

        <div className="stat-card rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-700">Active Staff</div>
          <div className="text-xl font-semibold text-black mt-2">{staff.filter(s => s.status === 'active').length}</div>
        </div>

        <div className="stat-card rounded-lg bg-white p-4 border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-700">Avg. Satisfaction</div>
          <div className="text-xl font-semibold text-black mt-2">4.4</div>
        </div>
      </section>

      <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-700">
              <th className="py-3 px-4">Staff Name</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Unit</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Contract Value</th>
              <th className="py-3 px-4">Joined Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.email} className="border-t border-gray-200">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-800">{s.name}</div>
                  <div className="text-xs text-gray-700">{s.email}</div>
                </td>
                <td className="py-3 px-4 text-gray-800">{s.dept}</td>
                <td className="py-3 px-4 text-gray-800">{s.unit}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${
                      s.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-800">{s.value}</td>
                <td className="py-3 px-4 text-gray-800">{s.date}</td>
                <td className="py-3 px-4 text-gray-800">•••</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showModal && <AddStaffModal mode="modal" onClose={handleClose} onSave={(d) => { handleSave(d); handleClose(); }} />}
    </div>
  );
}
