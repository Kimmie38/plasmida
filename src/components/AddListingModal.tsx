"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FiUpload, FiX } from "react-icons/fi";

interface AddListingModalProps {
  onClose: () => void;
}

export default function AddListingModal({ onClose }: AddListingModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    category: "",
    type: "",
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/png",
    ];

    // Validate type
    if (!allowedTypes.includes(selected.type)) {
      setError("Unsupported file type. Please upload PDF, Word, Excel, PowerPoint, or Image.");
      setFile(null);
      setFormVisible(false);
      return;
    }

    // Validate size
    if (selected.size > 50 * 1024 * 1024) {
      setError("File too large. Maximum allowed size is 50MB.");
      setFile(null);
      setFormVisible(false);
      return;
    }

    // ✅ Valid file — show form
    setError(null);
    setFile(selected);
    setFormVisible(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted data:", { ...formData, file });
    alert("Report uploaded successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <FiX size={20} />
        </button>

        {/* Step 1: File Upload */}
        {!formVisible && (
          <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white text-slate-600 mb-4 shadow-sm">
              <FiUpload className="text-2xl" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Upload Training Report</h2>
            <p className="text-sm text-slate-500 mt-1">
              Drag and drop your file here or click to browse
            </p>

            {/* ✅ File picker */}
            <div className="mt-5">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.docx,.xlsx,.pptx,.jpg,.jpeg,.png"
              />
              <label htmlFor="fileInput">
                <button
                  type="button"
                  className="h-10 px-4 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition"
                >
                  Choose File
                </button>
              </label>
            </div>

            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            <p className="text-xs text-slate-400 mt-3">
              Supported formats: PDF, Word, Excel, PowerPoint, Images<br />
              Maximum file size: 50MB
            </p>
          </div>
        )}

        {/* Step 2: Form */}
        {formVisible && (
          <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <p className="text-sm font-medium text-slate-700">Selected File:</p>
              <div className="mt-2 text-slate-600 flex items-center justify-between text-sm">
                <span>{file?.name}</span>
                <span>{(file!.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select category</option>
                  <option>Leadership</option>
                  <option>Technical</option>
                  <option>Safety</option>
                  <option>Compliance</option>
                  <option>Sales</option>
                  <option>Communication</option>
                  <option>Management</option>
                  <option>HR</option>
                  <option>Onboarding</option>
                  <option>Assessment</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select type</option>
                  <option>PDF</option>
                  <option>Word</option>
                  <option>Excel</option>
                  <option>PowerPoint</option>
                  <option>Image</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
              >
                Save Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
