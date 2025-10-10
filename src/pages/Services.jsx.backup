import React from "react";
import ServiceRequestCard from "../components/ServiceRequestCard";

export default function Services({ selectedService }) {
  return (
    <div className="p-6 w-full">
      {selectedService ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            Request Service: {selectedService}
          </h1>
          <ServiceRequestCard serviceName={selectedService} />
        </>
      ) : (
        <h2 className="text-lg text-slate-600 dark:text-slate-300">
          Please select a service from the sidebar to begin your audit request.
        </h2>
      )}
    </div>
  );
}



