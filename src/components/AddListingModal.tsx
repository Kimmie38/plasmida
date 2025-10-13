"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiUpload, FiX, FiSave } from "react-icons/fi";

interface AddListingModalProps {
  onClose: () => void;
  uploadedFile?: File | null;
  mode?: "modal" | "inline";
}

export default function AddListingModal({ onClose, uploadedFile = null, mode = "modal" }: AddListingModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (uploadedFile) {
      setFile(uploadedFile);
      setFormVisible(true);
      setError(null);
    }
  }, [uploadedFile]);

  const [formData, setFormData] = useState({
    projectName: "",
    clientCompany: "",
    reportTitle: "",
    trainingCategory: "",
    description: "",
    projectCost: "",
    durationDays: "",
    projectStatus: "Completed",
    instructor: "",
    participants: "",
    startDate: "",
    completionDate: "",
    location: "",
    tags: "",
    additionalNotes: "",
    fileType: "",
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!file) {
      setSubmitError("No file selected.");
      return;
    }

    setSaving(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
      const fd = new FormData();

      fd.append("projectName", formData.projectName);
      fd.append("clientCompany", formData.clientCompany);
      fd.append("reportTitle", formData.reportTitle);
      fd.append("trainingCategory", formData.trainingCategory);
      fd.append("projectDescription", formData.description);
      fd.append("projectCost", formData.projectCost);
      fd.append("duration", formData.durationDays);
      fd.append("projectStatus", formData.projectStatus);
      fd.append("instructor", formData.instructor);
      fd.append("participants", formData.participants);
      fd.append("trainingStartDate", formData.startDate);
      fd.append("projectCompletionDate", formData.completionDate);
      fd.append("trainingLocation", formData.location);

      const tagsArr = formData.tags ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
      fd.append("tags", JSON.stringify(tagsArr));

      fd.append("additionalNotes", formData.additionalNotes);
      fd.append("file", file, file.name);

      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const res = await fetch(`${API_URL}/api/v1/plasmida/reports/add`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: fd,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSubmitError(data?.message || "Upload failed. Please try again.");
        setSaving(false);
        return;
      }

      // success
      onClose();
      // optional: navigate or show toast
      alert("✅ Report uploaded successfully.");
    } catch (err) {
      console.error("Upload error:", err);
      setSubmitError("Network or server error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={mode === "modal" ? "fixed inset-0 bg-black/40 flex items-center justify-center z-50" : ""}>
      <div className={mode === "modal" ? "bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative" : "bg-white w-full rounded-xl shadow-sm p-6 border border-slate-100 relative"}>
        {mode === "modal" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black hover:text-slate-600"
          >
            <FiX size={20} />
          </button>
        )}

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
                id="addListingFileInput"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.docx,.xlsx,.pptx,.jpg,.jpeg,.png"
              />
              <label htmlFor="addListingFileInput">
                <button
                  type="button"
                  className="h-10 px-4 rounded-md bg-sky-600 text-black hover:bg-sky-700 transition"
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <header>
              <h2 className="text-xl font-semibold text-slate-800">Add Training Project Details</h2>
              <p className="text-sm text-slate-500 mt-1">Fill in the information about your training project and report</p>
            </header>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center text-sky-600 border border-slate-200">
                    <FiUpload />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-800">{file?.name}</div>
                    <div className="text-xs text-slate-500">{(file!.size / (1024 * 1024)).toFixed(2)} MB</div>
                  </div>
                </div>
                <div className="text-sm text-green-600 font-medium">✅ File uploaded successfully</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Training Project Name *</label>
                <input
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border text-gray-600 border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Client Company</label>
                <input
                  name="clientCompany"
                  value={formData.clientCompany}
                  onChange={handleInputChange}
                  className="w-full rounded-md border  border-slate-300 px-3 text-gray-600 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Report/Document Title *</label>
                <input
                  name="reportTitle"
                  value={formData.reportTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border text-gray-600 border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Training Category *</label>
                <select
                  name="trainingCategory"
                  value={formData.trainingCategory}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border text-gray-600 border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Cost (₦)</label>
                <input
                  name="projectCost"
                  value={formData.projectCost}
                  onChange={handleInputChange}
                  type="number"
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Duration (Days)</label>
                <input
                  name="durationDays"
                  value={formData.durationDays}
                  onChange={handleInputChange}
                  type="number"
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Status</label>
                <select
                  name="projectStatus"
                  value={formData.projectStatus}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option>Completed</option>
                  <option>Draft</option>
                  <option>In Progress</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Instructor/Trainer</label>
                <input
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Participants</label>
                <input
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Training Start Date</label>
                <input
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  type="date"
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Project Completion Date</label>
                <input
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleInputChange}
                  type="date"
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Training Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Tags</label>
                <input
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Add tags separated by commas (e.g., corporate, team building, quarterly)"
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full text-gray-600 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {submitError && (
              <div className="col-span-full text-red-500 text-sm mb-2">{submitError}</div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-slate-300 text-slate-600 hover:bg-slate-100 flex items-center gap-2"
              >
                <span className="text-sm">Cancel</span>
              </button>

              <button
                type="submit"
                disabled={saving}
                className={`px-4 py-2 rounded-md ${saving ? 'bg-slate-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'} text-white font-medium transition flex items-center gap-2`}
              >
                <FiSave />
                <span>{saving ? 'Saving...' : 'Save Project'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
