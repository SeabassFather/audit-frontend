// Common API utilities for AuditDNA frontend
// This file centralizes API calls and provides fallback mock data when backend is not available

// Helper for authenticated fetch
export async function fetchApi(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 
    'Content-Type': 'application/json',
    ...options.headers, 
    Authorization: token ? `Bearer ${token}` : undefined 
  };
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

// Mortgage Search API
export async function searchMortgages(criteria) {
  try {
    const response = await fetch("/api/search/mortgages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(criteria)
    });
    
    if (!response.ok) throw new Error("Mortgage search API error");
    return await response.json();
  } catch (error) {
    console.log("Mortgage API not available, using mock data");
    // TODO: Replace with real backend API integration
    return {
      results: [
        {
          id: 1,
          lender: "First National Bank",
          rate: "3.25%",
          apr: "3.45%",
          loan_amount: criteria.loanAmount || 250000,
          term: "30 years",
          type: criteria.loanType || "Conventional",
          fees: 2500,
          status: "Pre-approved"
        },
        {
          id: 2,
          lender: "Community Credit Union",
          rate: "3.15%",
          apr: "3.38%",
          loan_amount: criteria.loanAmount || 250000,
          term: "30 years",
          type: criteria.loanType || "Conventional",
          fees: 1800,
          status: "Available"
        },
        {
          id: 3,
          lender: "Metro Mortgage Corp",
          rate: "3.35%",
          apr: "3.52%",
          loan_amount: criteria.loanAmount || 250000,
          term: "30 years",
          type: criteria.loanType || "Conventional",
          fees: 3200,
          status: "Available"
        }
      ],
      total_matches: 3
    };
  }
}

// USDA Pricing API
export async function fetchUSDApricing(commodity = "Tomatoes") {
  try {
    // TODO: Replace with real USDA API endpoint
    const response = await fetch(`/api/usda/pricing?commodity=${encodeURIComponent(commodity)}`);
    if (!response.ok) throw new Error("USDA API error");
    return await response.json();
  } catch (error) {
    console.log("USDA API not available, using mock data");
    // TODO: Replace with real backend integration
    return {
      commodity,
      current_price: 2.45,
      avg_5_year: 2.12,
      weekly_data: [
        { week: "Week 1", price: 2.30, avg5yr: 2.10 },
        { week: "Week 2", price: 2.35, avg5yr: 2.12 },
        { week: "Week 3", price: 2.40, avg5yr: 2.15 },
        { week: "Week 4", price: 2.45, avg5yr: 2.12 },
      ],
      alerts: ["Price 15% above 5-year average"]
    };
  }
}