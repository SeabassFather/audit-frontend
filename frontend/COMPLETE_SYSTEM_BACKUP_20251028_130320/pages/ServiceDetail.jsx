import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ALL_SERVICES } from "../data/serviceData";

const ServiceIcon = () => (
  <span className="inline-block w-12 h-12 rounded-full bg-gradient-to-tr from-gray-600 to-gray-900 grid place-items-center text-green-400 text-2xl shadow">
    Ã°Å¸â€™Â¡
  </span>
);

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const svc = useMemo(() => ALL_SERVICES.find((s) => s.id === id), [id]);
  if (!svc)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
        <p className="text-2xl text-green-400">Service not found.</p>
        <button className="btn-nav mt-4" onClick={() => navigate("/services")}>
          Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-10 px-4 animate__animated animate__fadeIn">
      <div className="flex items-center gap-4 mb-6">
        <ServiceIcon />
        <div>
          <h2 className="text-4xl font-extrabold text-green-400">{svc.name}</h2>
          <div className="text-lg text-yellow-200">{svc.category}</div>
        </div>
      </div>
      <div className="rounded-2xl bg-gradient-to-tr from-gray-700 to-gray-800 shadow-xl px-6 py-5 mb-8 border border-green-300">
        <div className="font-bold text-green-300 mb-2">Overview</div>
        <div className="text-gray-100">{svc.desc}</div>
      </div>
      <div className="rounded-2xl bg-gradient-to-tr from-gray-100 to-yellow-100 shadow-xl px-6 py-5 flex flex-col">
        <div className="font-bold text-green-700 mb-2">Actions</div>
        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-xl font-bold text-gray-900 bg-gradient-to-r from-green-400 to-yellow-200 shadow-lg hover:scale-105 transition hover:bg-green-500 hover:text-white">
            Start Intake
          </button>
          <button className="px-5 py-2 rounded-xl font-bold text-green-500 bg-gradient-to-r from-gray-100 to-yellow-100 border border-green-300 shadow hover:bg-yellow-100 hover:text-green-800 transition">
            Add to Queue
          </button>
        </div>
      </div>
      <div className="mt-12">
        <button className="btn-nav" onClick={() => navigate("/services")}>
          Ã¢â€ Â All Services
        </button>
      </div>
      <style>{`
        .btn-nav {
          padding: 0.7rem 1.5rem;
          background: linear-gradient(to right, #222, #a3e635);
          color: #facc15;
          font-weight: bold;
          border-radius: 1rem;
          box-shadow: 0 2px 10px #0008;
          transition: background 0.2s, color 0.2s;
          text-decoration: none;
        }
        .btn-nav:hover {
          background: linear-gradient(to right, #facc15, #22c55e);
          color: #fff;
        }
      `}</style>
    </div>
  );
}
