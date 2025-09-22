import React from "react";
import { serviceCategories } from "../../data/serviceCategories";

export default function ServiceCategoryList() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Service Categories</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Comprehensive financial audit and compliance services across multiple industries and consumer protection areas.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {serviceCategories.map((category) => (
          <div key={category.id} className="card">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Available Modules:</h4>
              <div className="grid grid-cols-1 gap-2">
                {category.modules.map((module, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-ocean-50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-ocean-500 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{module}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="btn btn-outline w-full">
                Learn More About {category.title}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
