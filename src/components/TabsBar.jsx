import React from "react";
export default function TabsBar({ tabs = [], value, onChange }) {
  return (
    <div className="tabs flex gap-2">
      {tabs.map(t => (
        <button
          key={t.id}
          className={"tab" + (t.id === value ? " active" : "")}
          onClick={() => onChange && onChange(t.id)}
          type="button"
          aria-pressed={t.id === value}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
