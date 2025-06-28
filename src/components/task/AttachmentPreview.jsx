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
      className="text-blue-400 underline"
    >
      📎 {originalName || "Download File"}
    </a>
  );

  if (type.startsWith("image/")) {
    return (
      <div className="mb-3">
        <img
          src={url}
          alt={originalName}
          className="w-full max-w-xs rounded border border-gray-600"
        />
        <p className="text-sm text-gray-400 mt-1">{originalName}</p>
      </div>
    );
  }

  if (type.startsWith("video/")) {
    return (
      <div className="mb-3">
        <video
          controls
          className="w-full max-w-md rounded border border-gray-600"
        >
          <source src={url} type={type} />
          Your browser does not support the video tag.
        </video>
        <p className="text-sm text-gray-400 mt-1">{originalName}</p>
      </div>
    );
  }

  if (type === "application/pdf") {
    return (
      <div className="mb-3">
        <iframe
          src={url}
          title="PDF Preview"
          className="w-full h-[500px] border border-gray-700 rounded"
        />
        <p className="text-sm text-gray-400 mt-1">{originalName}</p>
      </div>
    );
  }

  // Default fallback (e.g., DOCX, TXT, etc.)
  return fallback;
};