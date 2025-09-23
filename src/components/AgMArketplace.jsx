function Card({ title, lines, selected, onSelect }) {
  return (
    <div onClick={onSelect} className="p-4 rounded-xl border hover:bg-gray-50 cursor-pointer">
      <div className="font-semibold mb-1">{title}</div>
      <ul className="text-sm text-gray-600 space-y-0.5">
        {lines.map((l,i)=><li key={i}>{l}</li>)}
      </ul>
      {selected && <div className="mt-2 text-xs text-green-700">Selected</div>}
    </div>
  );
}
