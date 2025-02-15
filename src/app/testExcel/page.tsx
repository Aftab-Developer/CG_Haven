"use client";

export default function Home() {
  const handleDownload = async () => {
    const res = await fetch(`/api/excelFile`);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ZadaData.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4">
      <button onClick={handleDownload} className="bg-blue-500 text-white p-2 rounded">
        Download Excel
      </button>
    </div>
  );
}
