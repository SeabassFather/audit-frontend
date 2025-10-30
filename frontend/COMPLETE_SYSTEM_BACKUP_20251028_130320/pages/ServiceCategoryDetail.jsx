import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import tree from "../data/serviceTree";

// Metallic icon
const ServiceIcon = () => (
  <span className="inline-block w-10 h-10 rounded-full bg-gradient-to-tr from-gray-600 to-gray-800 grid place-items-center text-green-400 text-2xl shadow">
    Ã°Å¸â€™Â¡
  </span>
);

function findCategory(slug) {
  const list = Array.isArray(tree) ? tree : tree?.categories || [];
  return list.find((x) => (x?.slug || x?.path) === slug);
}

export default function ServiceCategoryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cat = findCategory(slug);

  if (!cat)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
        <p className="text-2xl text-green-400">Category not found.</p>
        <Link className="btn-nav mt-4" to="/services">
          Back to Services
        </Link>
      </div>
    );

  const items = cat.services || cat.items || [];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-10 px-4 animate__animated animate__fadeIn">
      <h2 className="text-4xl font-extrabold text-green-400 mb-6 flex items-center gap-3">
        <ServiceIcon />
        {cat.title}
      </h2>
      {cat.description ? (
        <p className="mb-8 text-lg text-yellow-200">{cat.description}</p>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-2xl bg-gradient-to-tr from-gray-700 to-gray-900 shadow-xl px-6 py-5 flex flex-col hover:scale-105 transition-all border border-green-300"
          >
            <h4 className="text-xl font-bold text-green-300 mb-2">
              {it?.title || it?.name || `Item ${i + 1}`}
            </h4>
            {it?.desc || it?.description ? (
              <p className="text-sm text-gray-100 mb-4">
                {it.desc || it.description}
              </p>
            ) : null}
            <div className="flex gap-3 mt-auto">
              <button
                className="px-5 py-2 rounded-xl font-bold text-gray-900 bg-gradient-to-r from-green-400 to-yellow-200 shadow-lg hover:scale-105 transition hover:bg-green-500 hover:text-white"
                onClick={() => navigate(`/service/${it.id}`)}
              >
                Start
              </button>
              <button
                className="px-5 py-2 rounded-xl font-bold text-green-500 bg-gradient-to-r from-gray-100 to-yellow-100 border border-green-300 shadow hover:bg-yellow-100 hover:text-green-800 transition"
                onClick={() => alert(`Details for ${it?.title || it?.name}`)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Link className="btn-nav" to="/services">
          Ã¢â€ Â All Categories
        </Link>
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
