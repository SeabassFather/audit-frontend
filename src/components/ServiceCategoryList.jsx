import React from "react";
import { serviceCategories } from "../data/serviceCategories";
export default function ServiceCategoryList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {serviceCategories.map((cat) => (
        <div key={cat.id} className="bg-white rounded-xl shadow border border-green-200 p-6">
          <h3 className="text-xl font-bold text-green-700 mb-2">{cat.title}</h3>
          <p className="text-gray-600 mb-3">{cat.description}</p>
          <ul className="list-disc pl-6 text-gray-800">
            {cat.modules.slice(0, 5).map((m) => <li key={m}>{m}</li>)}
            {cat.modules.length > 5 && <li>...and more</li>}
          </ul>
        </div>
      ))}
    </div>
  );
}
