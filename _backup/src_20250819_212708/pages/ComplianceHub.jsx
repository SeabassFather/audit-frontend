import React from "react";
import { motion } from "framer-motion";

export default function ComplianceHub() {
  return (
    <div className="flex">
      {/* Sidebar Accordion */}
      <div className="w-64 bg-slate-900 text-white p-4 rounded-r-2xl shadow-lg">
        <h2 className="text-lg font-bold mb-4">Compliance Hub</h2>
        <ul className="space-y-2">
          {[
            "PACA License",
            "FDA Registration",
            "USDA Organic",
            "Food Safety Audits",
            "Insurance Docs",
            "Legal Agreements",
          ].map((item) => (
            <motion.li
              whileHover={{ scale: 1.05 }}
              key={item}
              className="cursor-pointer p-2 rounded-lg hover:bg-slate-700"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-xl ml-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Select a compliance category from the left
        </h3>
      </div>
    </div>
  );
}
