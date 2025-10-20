"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FiX, FiSave } from "react-icons/fi";

export interface StaffFormData {
  staffName: string;
  department: string;
  email: string;
  phone: string;
  unit: string;
  status: string;
  contractValue: string;
  contractStartDate: string;
  contractEndDate: string;
  satisfaction?: string;
}

interface AddStaffModalProps {
  onClose: () => void;
  onSave?: () => void; // notify parent to refresh
}

export default function AddStaffModal({ onClose, onSave }: AddStaffModalProps) {
  const [formData, setFormData] = useState<StaffFormData>({
    staffName: "",
    department: "",
    email: "",
    phone: "",
    unit: "",
    status: "Prospect",
    contractValue: "",
    contractStartDate: "",
    contractEndDate: "",
    satisfaction: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildUrl = (path: string) => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    if (base && base.endsWith("/")) return `${base.replace(/\/$/, "")}${path}`;
    return base ? `${base}${path}` : path;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation for satisfaction if provided
    if (formData.satisfaction) {
      const s = Number(formData.satisfaction);
      if (isNaN(s) || s < 1.1 || s > 9.9) {
        setError("Satisfaction must be a number between 1.1 and 9.9");
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        staffName: formData.staffName,
        department: formData.department,
        email: formData.email,
        phoneNumber: formData.phone,
        unit: formData.unit,
        status: formData.status,
        contractValue: formData.contractValue ? Number(formData.contractValue) : 0,
        contractStartDate: formData.contractStartDate || undefined,
        contractEndDate: formData.contractEndDate || undefined,
        joinedDate: formData.contractStartDate || undefined,
        satisfaction: formData.satisfaction ? Number(formData.satisfaction) : undefined,
      };

      // Attach client token from localStorage if present
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('plasmida_token') : null;
        if (token) headers['Authorization'] = `Bearer ${token}`;
      } catch (e) {
        // ignore
      }

      const res = await fetch(`/api/proxy/api/v1/plasmida/staff/add`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = `Request failed with status ${res.status}`;
        try {
          const contentType = res.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const data = await res.json();
            errorMessage = data?.message || JSON.stringify(data) || errorMessage;
          } else {
            const txt = await res.text();
            errorMessage = txt || errorMessage;
          }
        } catch (parseErr) {
          try {
            const cloneTxt = await res.clone().text();
            errorMessage = cloneTxt || errorMessage;
          } catch (_) {
            // ignore
          }
        }
        throw new Error(errorMessage);
      }

      // Optionally read response
      // const created = await res.json();

      // Notify parent to refresh
      if (onSave) onSave();

      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to add staff");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <header className="mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Add New Staff</h2>
          <p className="text-sm text-slate-600 mt-1">Fill in the details for the staff member below.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Staff Name *</label>
              <input
                name="staffName"
                value={formData.staffName}
                onChange={handleChange}
                required
                className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department *</label>
              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
              <input
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option>Prospect</option>
                <option>Active</option>
                <option>Onboarding</option>
                <option>Inactive</option>
                <option>Terminated</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Contract Value (₦)</label>
              <input
                type="number"
                name="contractValue"
                value={formData.contractValue}
                onChange={handleChange}
                className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contract Start Date</label>
              <input
                type="date"
                name="contractStartDate"
                value={formData.contractStartDate}
                onChange={handleChange}
                className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contract End Date</label>
              <input
                type="date"
                name="contractEndDate"
                value={formData.contractEndDate}
                onChange={handleChange}
                className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Satisfaction (1.1 - 9.9)</label>
              <input
                type="number"
                name="satisfaction"
                step="0.1"
                min="1.1"
                max="9.9"
                value={formData.satisfaction}
                onChange={handleChange}
                className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="e.g. 4.4"
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 inline-flex items-center gap-2"
            >
              <FiSave />
              <span>{loading ? "Saving..." : "Save"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
