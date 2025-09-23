{options.map(name => (
  <button
    key={name}
    onClick={() => setCommodity(name)}
    className="w-full text-left px-3 py-2 rounded-lg mb-1"
  >
    {name}
  </button>
))}
