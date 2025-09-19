import { useEffect, useRef, useState } from "react";
import { useIntake } from "../contexts/intake";

export default function UploadSheet({ open, onClose, service }) {
  const { addFiles } = useIntake();
  const inputRef = useRef(null);
  const [qrUrl, setQrUrl] = useState("");
  if (!open) return null;

  const link = `${location.origin}/service/${service?.id ?? ""}`;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const QR = (await import("qrcode")).default;
        const url = await QR.toDataURL(link);
        if (alive) setQrUrl(url);
      } catch { setQrUrl(""); }
    })();
    return () => { alive = false; };
  }, [link]);

  function onFiles(files) {
    if (files?.length) addFiles(service?.category || "Services", files);
  }
  function choose(){ inputRef.current?.click(); }
  function onChange(e){ onFiles(e.target.files); e.target.value = ""; }
  function onDrop(e){ e.preventDefault(); onFiles(e.dataTransfer?.files); }

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}/>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Upload for {service?.name}</div>
          <button className="text-sm" onClick={onClose}>Close</button>
        </div>

        <p className="mt-2 text-sm text-slate-600">
          Drag & drop files into the box, or use the picker. Files land in the Intake tray.
        </p>

        <div
          onDragOver={(e)=>e.preventDefault()}
          onDrop={onDrop}
          className="mt-4 border-2 border-dashed rounded p-6 text-center"
        >
          <div className="mb-3">Drop documents here</div>
          <input ref={inputRef} type="file" multiple className="hidden" onChange={onChange}/>
          <button onClick={choose} className="bg-dnaBlue text-white px-3 py-2 rounded">Choose filesâ€¦</button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-slate-500 mb-1">Share link</div>
            <input className="border rounded p-2 w-full" value={link} readOnly onFocus={(e)=>e.target.select()}/>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1">QR code</div>
            {qrUrl ? <img src={qrUrl} alt="qr" className="mx-auto w-32 h-32"/> : <div className="text-xs text-slate-500">QR unavailable</div>}
          </div>
        </div>

        {Array.isArray(service?.features) && service.features.length>0 && (
          <div className="mt-6">
            <div className="font-medium mb-1">Checklist</div>
            <ul className="list-disc ml-5 text-sm space-y-1">
              {service.features.slice(0,6).map((f,i)=><li key={i}>{f}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}