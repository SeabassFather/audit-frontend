import React from "react";
import { X, CheckCircle2, FileText, Download, BookOpen } from "lucide-react";
import { slugify } from "../utils/slug";

export default function ServiceDrawer({ open, onClose, service, category, details, onStart }) {
  if (!open || !service) return null;
  const slug = slugify(service);
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[540px] bg-white shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-500">{category}</div>
            <h2 className="text-xl font-bold">{service}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18}/></button>
        </div>
        <div className="p-5 space-y-5 overflow-y-auto h-[calc(100%-64px)]">
          <div className="text-gray-700">{details.brief}</div>
          <div>
            <div className="text-sm font-semibold mb-2">Tags</div>
            <div className="flex flex-wrap gap-2">
              {(details.tags||[]).map((t,i)=>(<span key={i} className="text-xs bg-gray-100 border border-gray-200 px-2 py-1 rounded-full">{t}</span>))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Required Docs</div>
            <ul className="space-y-1">
              {(details.docs||[]).map((d,i)=>(<li key={i} className="flex items-center gap-2 text-sm"><FileText size={16}/> {d}</li>))}
            </ul>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center gap-2"><Download size={16}/> Download Pack (stub)</button>
              <button className="px-3 py-2 rounded-lg border hover:bg-gray-50 flex items-center gap-2"><BookOpen size={16}/> View Agreement (stub)</button>
            </div>
          </div>
          <div className="pt-2">
            <button onClick={()=>onStart(slug, service)} className="w-full px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:brightness-95 flex items-center justify-center gap-2"><CheckCircle2 size={18}/> Start {service}</button>
          </div>
          <div className="text-xs text-gray-400">You can customize fields, forms, and routing per service later in Admin.</div>
        </div>
      </div>
    </div>
  );
}