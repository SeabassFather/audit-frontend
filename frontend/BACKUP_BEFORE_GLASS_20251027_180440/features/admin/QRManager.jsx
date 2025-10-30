import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function QRManager() {
  const [text, setText] = useState("http://localhost:3000");
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    let mounted = true;
    QRCode.toDataURL(text, { margin: 1, scale: 6 })
      .then((url) => mounted && setDataUrl(url))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [text]);

  return (
    <div className="rounded-2xl border p-4 bg-white">
      <h3 className="font-semibold">QR Manager</h3>
      <input
        className="mt-2 w-full h-10 rounded-xl border px-3 bg-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {dataUrl && (
        <img
          alt="QR"
          src={dataUrl}
          className="mt-3 w-40 h-40 border rounded-lg"
        />
      )}
      <p className="text-xs text-gray-500 mt-2">
        Paste any route (e.g., your public app URL) to generate a QR.
      </p>
    </div>
  );
}
