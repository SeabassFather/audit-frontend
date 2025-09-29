// src/pages/WaterTech.jsx
export default function WaterTech() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Water Tech Upload / Analysis</h1>
      <p className="mb-4">
        Upload and analyze water technology, soil, or environmental lab data for compliance 
        and sustainability reporting.
      </p>
      <input type="file" className="block mb-4" />
      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        Upload & Analyze
      </button>
    </div>
  );
}
