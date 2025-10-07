import { FiUpload, FiInfo } from "react-icons/fi";

export default function UploadPage() {
  return (
    <div className="upload-page p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Upload Training Report</h1>
          <p className="text-sm text-slate-500 mt-1">Add a new document to your training repository</p>
        </header>

        <section className="upload-dropzone mb-6">
          <div className="border-dashed border-2 border-slate-200 rounded-lg bg-white p-12 text-center">
            <div className="mx-auto inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-50 text-slate-600 mb-4">
              <FiUpload className="text-2xl" />
            </div>
            <h2 className="text-lg font-semibold">Upload Training Report</h2>
            <p className="text-sm text-slate-500 mt-2">Drag and drop your training document here, or click to browse files</p>

            <div className="mt-6">
              <label className="inline-flex items-center gap-2">
                <input type="file" className="sr-only" />
                <button className="h-10 px-4 rounded-md bg-blue-600 text-white">Choose File</button>
              </label>
            </div>

            <p className="text-xs text-slate-400 mt-3">Supported formats: PDF, Word, Excel, PowerPoint, Images<br/>Maximum file size: 50MB</p>
          </div>
        </section>

        <section className="tips bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-md font-semibold mb-3">Tips for Better Organization</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-600">
            <div>
              <div className="flex items-center gap-2 mb-2"><FiInfo className="text-slate-400" /><strong>File Naming</strong></div>
              <div>Use descriptive names like "Leadership-Workshop-Q1-2024" for easier searching</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2"><FiInfo className="text-slate-400" /><strong>Categories</strong></div>
              <div>Choose the most relevant category to help with filtering and organization</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2"><FiInfo className="text-slate-400" /><strong>Tags</strong></div>
              <div>Add relevant tags like "quarterly", "remote", "certification" for better searchability</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2"><FiInfo className="text-slate-400" /><strong>Details</strong></div>
              <div>Include instructor names, dates, and participant counts for complete documentation</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
