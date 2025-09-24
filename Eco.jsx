import UploadWidget from "../components/UploadWidget";
import WaterSearch from "../components/WaterSearch";

export default function Eco() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Water & Soil Compliance</h1>
      <p className="mb-6 text-gray-600">
        Upload lab-certified water and soil reports. Search and retrieve
        verified compliance documents for properties, regions, and eco
        certifications.
      </p>
      <UploadWidget />
      <WaterSearch />
    </div>
  );
}
