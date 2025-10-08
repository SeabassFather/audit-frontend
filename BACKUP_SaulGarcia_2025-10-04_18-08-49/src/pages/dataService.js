// Mock data service for AuditDNA Premium UI

export async function getServicesData() {
  return {
    spartan: {
      "USDA Pricing": ["Loan Guarantees", "Rural Development", "Farm Service Agency", "Commodity Credit Corp", "Rural Housing"],
      "Mortgage Engine": ["Conventional Loans", "FHA Loans", "VA Loans", "USDA Rural Housing", "Jumbo Loans"],
      "Ag Factoring": ["Invoice Factoring", "Supply Chain Finance", "Produce Finance", "Livestock Finance", "Equipment Leasing"],
      "Compliance": ["Audit Frameworks", "Risk Assessment", "Regulatory Compliance", "Quality Assurance", "Documentation Management"],
    }
  };
}

export async function getDashboardStats(services) {
  const totalServices = Object.values(services.spartan || {}).flat().length;
  
  return [
    { value: totalServices, label: "Active Services", icon: "BarChart3" },
    { value: "1,247", label: "Total Users", icon: "Users" },
    { value: "$2.4M", label: "Total Volume", icon: "DollarSign" },
    { value: "98.5%", label: "Uptime", icon: "TrendingUp" },
    { value: "4.9/5", label: "Rating", icon: "Star" }
  ];
}

export async function getMortgageRates() {
  return [
    { value: "6.875%", label: "30-Year Fixed", change: "-0.125%", isPositive: true },
    { value: "6.250%", label: "15-Year Fixed", change: "+0.050%", isPositive: false },
    { value: "7.125%", label: "5/1 ARM", change: "-0.075%", isPositive: true },
    { value: "6.500%", label: "FHA 30-Year", change: "0.000%", isPositive: true }
  ];
}

export async function getCommoditiesData() {
  return [
    { value: "$4.52", label: "Corn (bu)", change: "+2.3%", isPositive: true },
    { value: "$12.18", label: "Soybeans (bu)", change: "-1.1%", isPositive: false },
    { value: "$6.87", label: "Wheat (bu)", change: "+0.8%", isPositive: true },
    { value: "$168.50", label: "Live Cattle (cwt)", change: "+1.5%", isPositive: true }
  ];
}

export async function getMarketsData() {
  return [
    { value: "43,275", label: "DOW", change: "+245 (+0.57%)", isPositive: true },
    { value: "5,832", label: "S&P 500", change: "+18 (+0.31%)", isPositive: true },
    { value: "18,234", label: "NASDAQ", change: "-42 (-0.23%)", isPositive: false },
    { value: "2,347", label: "Russell 2000", change: "+8 (+0.34%)", isPositive: true }
  ];
}

export async function getLendersData() {
  return [
    { id: 1, name: "Bank of America", programs: ["Conventional", "FHA", "VA"] },
    { id: 2, name: "Wells Fargo", programs: ["Conventional", "Jumbo"] },
    { id: 3, name: "Quicken Loans", programs: ["FHA", "VA", "USDA"] },
    { id: 4, name: "Chase", programs: ["Conventional", "FHA"] },
    { id: 5, name: "US Bank", programs: ["VA", "Jumbo"] }
  ];
}

export async function searchMortgages(criteria) {
  const lenders = await getLendersData();
  
  // Simple mock filtering
  return lenders.map(lender => ({
    ...lender,
    notes_excerpt: `Licensed in ${criteria.state || 'all states'}. Min FICO: ${criteria.minFico || '620'}`
  }));
}

export async function searchFactoring(criteria) {
  return [
    { id: 1, name: "AgFactor Solutions", industry: "Produce", notes_excerpt: "Specializes in fresh produce financing" },
    { id: 2, name: "Farm Credit Services", industry: "Agriculture", notes_excerpt: "Full-service agricultural lender" },
    { id: 3, name: "Invoice Finance Co", industry: "Manufacturing", notes_excerpt: "Quick turnaround on invoices" }
  ];
}


