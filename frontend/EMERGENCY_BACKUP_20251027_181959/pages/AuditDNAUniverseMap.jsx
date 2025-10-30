import React from "react";
import { motion } from "framer-motion";

export default function AuditDNAUniverseMap() {
  const categories = [
    { name: "Core Infrastructure", color: "from-silver-300 to-blue-200" },
    { name: "Agriculture & Trade Intelligence", color: "from-blue-200 to-green-200" },
    { name: "Traceability & Environmental Sciences", color: "from-yellow-200 to-green-100" },
    { name: "Financial & Compliance Services", color: "from-silver-200 to-blue-100" },
    { name: "Real Estate, Housing & Infrastructure", color: "from-blue-100 to-yellow-200" },
    { name: "Legal, Governance & Consumer Protection", color: "from-green-100 to-silver-200" },
    { name: "AI & Data Intelligence Layer", color: "from-blue-300 to-silver-300" },
    { name: "Administration & System Control", color: "from-green-200 to-yellow-200" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-silver-200 flex flex-col items-center justify-center text-gray-900 p-10">
      <motion.h1
        className="text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-300"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        AuditDNA Universe Map
      </motion.h1>

      <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center">
        {/* Core nucleus */}
        <motion.div
          className="absolute flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-r from-blue-200 to-green-200 shadow-lg shadow-blue-300/50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center text-gray-800">
            <h2 className="font-bold text-xl">AuditDNA Core</h2>
            <p className="text-sm text-gray-600">AI + Compliance Engine</p>
          </div>
        </motion.div>

        {/* Orbiting modules */}
        {categories.map((cat, i) => {
          const angle = (i / categories.length) * 2 * Math.PI;
          const radius = 220;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={i}
              className={`absolute flex items-center justify-center w-52 h-52 rounded-2xl bg-gradient-to-br ${cat.color} p-[2px] shadow-md`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * i, duration: 0.8 }}
            >
              <div className="bg-white/80 backdrop-blur-md w-full h-full rounded-2xl flex flex-col items-center justify-center text-center p-4 border border-gray-200">
                <h3 className="text-lg font-semibold mb-1 text-blue-600">{cat.name}</h3>
                <p className="text-xs text-gray-700">{i + 1} of 8 Categories</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-10 text-gray-700 text-sm text-center max-w-3xl">
        Each orbiting category connects to the AuditDNA Core through API bridges (MiniAPI) and AI compliance layers.
        This visualization represents the interlinked architecture between Trade, Finance, Compliance, and Environmental Intelligence.
      </p>
    </div>
  );
}