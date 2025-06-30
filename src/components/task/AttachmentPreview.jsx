const AttachmentPreview = ({ file }) => {
  if (!file || !file.url) return null;

  const { url, type, originalName } = file;

  // For debugging or fallback:
  const fallback = (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="text-blue-400 underline font-semibold hover:text-blue-300"
    >
      📎 {originalName || "Download File"}
    </a>
  );

  if (type.startsWith("image/")) {
    return (
      <div className="mb-3 bg-gray-900 rounded-lg p-3 border border-gray-700">
        <img
          src={url}
          alt={originalName}
          className="w-full max-w-xs rounded border border-gray-700 shadow"
        />
        <p className="text-sm text-gray-400 mt-2 font-medium">{originalName}</p>
      </div>
    );
  }

  if (type.startsWith("video/")) {
    return (
      <div className="mb-3 bg-gray-900 rounded-lg p-3 border border-gray-700">
        <video
          controls
          className="w-full max-w-md rounded border border-gray-700 shadow"
        >
          <source src={url} type={type} />
          Your browser does not support the video tag.
        </video>
        <p className="text-sm text-gray-400 mt-2 font-medium">{originalName}</p>
      </div>
    );
  }

  if (type === "application/pdf") {
    return (
      <div className="mb-3 bg-gray-900 rounded-lg p-3 border border-gray-700">
        <iframe
          src={url}
          title="PDF Preview"
          className="w-full h-[500px] border border-gray-700 rounded shadow"
        />
        <p className="text-sm text-gray-400 mt-2 font-medium">{originalName}</p>
      </div>
    );
  }

  // Default fallback (e.g., DOCX, TXT, etc.)
  return fallback;
};