export default function Input({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        {...props}
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
}
