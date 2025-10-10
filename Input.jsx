export default function Input({ label, type = "text", value, onChange, placeholder, className = "", ...rest }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
        {...rest}
      />
    </div>
  );
}
