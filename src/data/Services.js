import spartanServices from './spartan_services.json';

// Map JSON categories to service objects with icons and gradients
export const auditDNAServices = {
  agriculture: {
    title: "Agriculture & Food Systems",
    icon: "🌾",
    count: spartanServices["Agriculture & Food Systems"].length,
    gradient: "linear-gradient(135deg, #84cc16, #10b981)",
    services: spartanServices["Agriculture & Food Systems"]
  },
  mortgage: {
    title: "Mortgage & Real Estate",
    icon: "🏠",
    count: spartanServices["Mortgage & Real Estate"].length,
    gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    services: spartanServices["Mortgage & Real Estate"]
  },
  legal: {
    title: "Legal & Compliance",
    icon: "⚖️",
    count: spartanServices["Legal & Compliance"].length,
    gradient: "linear-gradient(135deg, #dc2626, #f59e0b)",
    services: spartanServices["Legal & Compliance"]
  },
  finance: {
    title: "Finance & Factoring",
    icon: "💰",
    count: spartanServices["Finance & Factoring"].length,
    gradient: "linear-gradient(135deg, #059669, #0891b2)",
    services: spartanServices["Finance & Factoring"]
  },
  education: {
    title: "Education & Workforce",
    icon: "🎓",
    count: spartanServices["Education & Workforce"].length,
    gradient: "linear-gradient(135deg, #7c3aed, #db2777)",
    services: spartanServices["Education & Workforce"]
  },
  eco: {
    title: "Eco & Sustainability",
    icon: "🌍",
    count: spartanServices["Eco & Sustainability"].length,
    gradient: "linear-gradient(135deg, #22c55e, #14b8a6)",
    services: spartanServices["Eco & Sustainability"]
  },
  healthcare: {
    title: "Healthcare & Insurance",
    icon: "🏥",
    count: spartanServices["Healthcare & Insurance"].length,
    gradient: "linear-gradient(135deg, #ef4444, #ec4899)",
    services: spartanServices["Healthcare & Insurance"]
  },
  trade: {
    title: "Global Trade & Logistics",
    icon: "🌐",
    count: spartanServices["Global Trade & Logistics"].length,
    gradient: "linear-gradient(135deg, #6366f1, #0ea5e9)",
    services: spartanServices["Global Trade & Logistics"]
  },
  technology: {
    title: "Technology & Data",
    icon: "💻",
    count: spartanServices["Technology & Data"].length,
    gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    services: spartanServices["Technology & Data"]
  },
  consumer: {
    title: "Consumer & Retail",
    icon: "🛒",
    count: spartanServices["Consumer & Retail"].length,
    gradient: "linear-gradient(135deg, #f59e0b, #f97316)",
    services: spartanServices["Consumer & Retail"]
  },
  government: {
    title: "Government & Public Sector",
    icon: "🏛️",
    count: spartanServices["Government & Public Sector"].length,
    gradient: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    services: spartanServices["Government & Public Sector"]
  },
  energy: {
    title: "Energy & Utilities",
    icon: "⚡",
    count: spartanServices["Energy & Utilities"].length,
    gradient: "linear-gradient(135deg, #eab308, #f59e0b)",
    services: spartanServices["Energy & Utilities"]
  }
};

// Calculate total service count
export const totalServiceCount = Object.values(auditDNAServices).reduce(
  (total, category) => total + category.count, 
  0
);

