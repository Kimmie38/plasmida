"use client";

import { useState } from "react";
import { FiX, FiSave } from "react-icons/fi";

interface AddStaffModalProps {
  onClose: () => void;
  onSave?: (data: Record<string, any>) => void;
  mode?: "modal" | "inline";
}

export default function AddStaffModal({ onClose, onSave, mode = "modal" }: AddStaffModalProps) {
  const [form, setForm] = useState({
    staffName: "",
    department: "",
    email: "",
    phone: "",
    unit: "",
    status: "Prospect",
    contractValue: "",
    contractStart: "",
    contractEnd: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.staffName || !form.department) {
      alert("Please fill required fields: Staff Name and Department");
      return;
    }
    if (onSave) onSave(form);
    else {
      console.log("Staff saved", form);
      alert("Staff saved");
    }
    onClose();
  };

  return (
    <div className={mode === "modal" ? "fixed inset-0 bg-black/40 flex items-center justify-center z-50" : ""}>
      <div className={mode === "modal" ? "bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative" : "bg-white w-full rounded-xl shadow-sm p-6 border border-slate-100 relative"}>
        {mode === "modal" && (
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <FiX size={20} />
          </button>
        )}

        <header className="mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Add New Staff</h2>
          <p className="text-sm text-slate-500 mt-1">Fill in the details for the staff member below.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Staff Name *</label>
              <input
                name="staffName"
                value={form.staffName}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department *</label>
              <input
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
              <input
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option>Prospect</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Former</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Contract Value (₦)</label>
              <input
                name="contractValue"
                value={form.contractValue}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contract Start Date</label>
              <input
                name="contractStart"
                type="date"
                value={form.contractStart}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contract End Date</label>
              <input
                name="contractEnd"
                type="date"
                value={form.contractEnd}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100 flex items-center gap-2">
              <span>Cancel</span>
            </button>

            <button type="submit" className="px-4 py-2 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700 transition flex items-center gap-2">
              <FiSave />
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
