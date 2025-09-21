import React, { useState } from "react";
import { ServiceCard, EmptyState } from "../components/UIComponents.jsx";
import { serviceCategories, featuredServices } from "../data/servicesData.js";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = selectedCategory === 'all' 
    ? serviceCategories 
    : serviceCategories.filter(cat => cat.id === selectedCategory);

  const searchFilteredServices = filteredServices.map(category => ({
    ...category,
    services: category.services.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.services.length > 0);

  const handleServiceClick = (service) => {
    console.log('Service clicked:', service);
    // Navigate to service details - to be implemented
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-green via-brand-blue to-brand-yellow rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Our Services</h1>
        <p className="text-white/90">
          Comprehensive audit, compliance, and financial services powered by AI
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-brand-blue to-brand-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Services
          </button>
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-brand-blue to-brand-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Services */}
      {selectedCategory === 'all' && !searchTerm && (
        <div className="widget">
          <h2 className="text-2xl font-bold mb-6">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <div key={service.id} className="relative">
                <ServiceCard 
                  service={service} 
                  onClick={handleServiceClick}
                />
                {service.popular && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-gradient-to-r from-brand-yellow to-orange-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ Popular
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Categories */}
      {searchFilteredServices.length > 0 ? (
        <div className="space-y-8">
          {searchFilteredServices.map((category) => (
            <div key={category.id} className="widget">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg ${category.color} text-white`}>
                  <span className="text-xl font-bold">{category.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    category={category}
                    onClick={handleServiceClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          title="No services found"
          description={`No services match your search "${searchTerm}" in the selected category.`}
          action={
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn btn-primary"
            >
              Clear filters
            </button>
          }
        />
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Need a Custom Solution?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our team can create tailored audit and compliance solutions for your specific industry needs. 
          Contact us to discuss your requirements.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary">
            Request Custom Quote
          </button>
          <button className="btn btn-secondary">
            Schedule Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
