export async function mortgageSearchAPI(payload){
  // TODO: POST to /api/search/mortgages in your backend
  
  // Enhanced mock data with comprehensive lender profiles
  const mockLenders = [
    {
      lender: "Wells Fargo Bank",
      lenderType: "Major Bank",
      product: payload.product || "Conventional",
      rate: "6.125%",
      apr: "6.347%",
      fit: "Strong",
      reasons: ["National presence", "Competitive rates", "DTI within guidelines"],
      approvalRate: "92%",
      avgApprovalTime: "25 days",
      minCreditScore: 620,
      maxLTV: 97,
      maxDTI: 45,
      minLoanAmount: 50000,
      maxLoanAmount: 5000000,
      states: ["All 50 states"],
      specialties: ["First-time buyers", "Jumbo loans", "VA loans"],
      requirements: ["Full income documentation", "Property appraisal", "Title insurance"],
      fees: {
        origination: "0.5%",
        underwriting: "$895",
        processing: "$495"
      }
    },
    {
      lender: "Quicken Loans/Rocket Mortgage",
      lenderType: "Online Lender",
      product: payload.product || "Conventional",
      rate: "6.250%",
      apr: "6.428%",
      fit: "Strong",
      reasons: ["Fast online process", "Digital-first experience", "Good for tech-savvy borrowers"],
      approvalRate: "89%",
      avgApprovalTime: "18 days",
      minCreditScore: 640,
      maxLTV: 95,
      maxDTI: 50,
      minLoanAmount: 40000,
      maxLoanAmount: 3000000,
      states: ["All 50 states"],
      specialties: ["Online processing", "Self-employed", "Fast closings"],
      requirements: ["Digital income verification", "Online application", "E-signatures"],
      fees: {
        origination: "0%",
        underwriting: "$1095",
        processing: "$0"
      }
    },
    {
      lender: "Local Credit Union",
      lenderType: "Credit Union",
      product: payload.product || "Conventional",
      rate: "5.875%",
      apr: "6.125%",
      fit: "Medium",
      reasons: ["Member benefits", "Local service", "Lower fees"],
      approvalRate: "85%",
      avgApprovalTime: "30 days",
      minCreditScore: 680,
      maxLTV: 90,
      maxDTI: 43,
      minLoanAmount: 75000,
      maxLoanAmount: 1500000,
      states: [payload.state || "CA"],
      specialties: ["Member relationships", "Portfolio loans", "Flexible underwriting"],
      requirements: ["Credit union membership", "Local property", "Personal banking relationship"],
      fees: {
        origination: "0%",
        underwriting: "$695",
        processing: "$295"
      }
    },
    {
      lender: "Freedom Mortgage",
      lenderType: "Non-Bank Lender",
      product: payload.product || "Conventional",
      rate: "6.375%",
      apr: "6.492%",
      fit: "Medium",
      reasons: ["Specialized in government loans", "Flexible credit requirements"],
      approvalRate: "87%",
      avgApprovalTime: "22 days",
      minCreditScore: 580,
      maxLTV: 96.5,
      maxDTI: 57,
      minLoanAmount: 30000,
      maxLoanAmount: 2500000,
      states: ["All 50 states"],
      specialties: ["FHA loans", "VA loans", "USDA loans", "First-time buyers"],
      requirements: ["Government loan guidelines", "Mortgage insurance", "Property standards"],
      fees: {
        origination: "1%",
        underwriting: "$995",
        processing: "$795"
      }
    }
  ];

  // Business/Commercial lenders for business loan types
  const businessLenders = [
    {
      lender: "SBA Preferred Lender Network",
      lenderType: "SBA Lender",
      product: "SBA 504",
      rate: "7.250%",
      apr: "7.850%",
      fit: "Strong",
      reasons: ["SBA approved", "Long-term fixed rates", "Low down payment"],
      approvalRate: "78%",
      avgApprovalTime: "45 days",
      minCreditScore: 680,
      maxLTV: 90,
      maxDTI: 125,
      minLoanAmount: 125000,
      maxLoanAmount: 20000000,
      states: ["All 50 states"],
      specialties: ["Owner-occupied commercial", "Real estate", "Equipment financing"],
      requirements: ["Business plan", "Personal guarantee", "Environmental assessment"],
      fees: {
        origination: "2.5%",
        underwriting: "$2500",
        processing: "$1500"
      }
    },
    {
      lender: "Business Capital Solutions",
      lenderType: "Commercial Lender",
      product: "Commercial Real Estate",
      rate: "8.125%",
      apr: "8.750%",
      fit: "Medium",
      reasons: ["Fast approval", "Asset-based lending", "Flexible terms"],
      approvalRate: "82%",
      avgApprovalTime: "30 days",
      minCreditScore: 650,
      maxLTV: 80,
      maxDTI: 150,
      minLoanAmount: 500000,
      maxLoanAmount: 50000000,
      states: ["CA", "TX", "FL", "NY", "IL"],
      specialties: ["Investment properties", "Commercial real estate", "Bridge loans"],
      requirements: ["Property income analysis", "Business tax returns", "Rent rolls"],
      fees: {
        origination: "1.5%",
        underwriting: "$3500",
        processing: "$2000"
      }
    }
  ];

  // Filter based on loan type
  const isBusinessLoan = ["Business", "Commercial", "SBA", "Asset-Based", "Factoring"].includes(payload.product);
  const availableLenders = isBusinessLoan ? businessLenders : mockLenders;

  // Filter based on criteria
  const filteredLenders = availableLenders.filter(lender => {
    const creditScore = parseInt(payload.creditRange?.split('-')[0] || payload.creditRange?.replace(/[<>+]/g, '') || '720');
    const loanAmount = parseFloat(payload.loanAmount || 0);
    const dti = parseFloat(payload.monthlyDebts || 0) / parseFloat(payload.monthlyIncome || 1) * 100;
    const ltv = calculateLTV(payload);

    // Credit score check
    if (creditScore < lender.minCreditScore) return false;
    
    // Loan amount check
    if (loanAmount && (loanAmount < lender.minLoanAmount || loanAmount > lender.maxLoanAmount)) return false;
    
    // DTI check
    if (dti > lender.maxDTI) return false;
    
    // LTV check  
    if (ltv > lender.maxLTV) return false;

    // State check
    if (payload.state && !lender.states.includes("All 50 states") && !lender.states.includes(payload.state)) return false;

    return true;
  });

  // Add match scoring
  const scoredLenders = filteredLenders.map(lender => {
    let score = 100;
    const creditScore = parseInt(payload.creditRange?.split('-')[0] || payload.creditRange?.replace(/[<>+]/g, '') || '720');
    const loanAmount = parseFloat(payload.loanAmount || 0);
    const dti = parseFloat(payload.monthlyDebts || 0) / parseFloat(payload.monthlyIncome || 1) * 100;

    // Adjust score based on how well criteria match
    if (creditScore > lender.minCreditScore + 100) score += 10;
    if (dti < lender.maxDTI - 10) score += 10;
    if (lender.specialties.some(s => s.toLowerCase().includes(payload.purpose?.toLowerCase() || ''))) score += 15;

    // Determine fit level
    let fit = "Medium";
    if (score >= 120) fit = "Excellent";
    else if (score >= 110) fit = "Strong";
    else if (score < 95) fit = "Fair";

    return {
      ...lender,
      matchScore: score,
      fit: fit
    };
  });

  // Sort by match score
  const sortedLenders = scoredLenders.sort((a, b) => b.matchScore - a.matchScore);

  return new Promise(resolve => 
    setTimeout(() => resolve(sortedLenders.slice(0, 6)), 800)
  );
}

function calculateLTV(payload) {
  const price = parseFloat(payload.price || 0);
  const down = parseFloat(payload.down || 0);
  const loanAmount = parseFloat(payload.loanAmount || 0);
  
  if (price && down) {
    return Math.round(((price - down) / price) * 100);
  } else if (price && loanAmount) {
    return Math.round((loanAmount / price) * 100);
  }
  return 0;
}
export async function agMarketplaceAPI(payload){
 // TODO: POST to /api/search/ag-market
 return new Promise(r=>setTimeout(()=>r([
 { grower:"Rancho Verde", crop:payload.crop||"Avocados", certs:["PrimusGFS","GlobalG.A.P."], risk:"Low", weekly:payload.volume||"20 MT" },
 { grower:"Campo Sol", crop:payload.crop||"Strawberries", certs:["GlobalG.A.P."], risk:"Medium", weekly:"15 MT" }
 ]), 500));
}
export async function tradeFinanceAPI(payload){
 // TODO: POST to /api/search/trade-finance
 return new Promise(r=>setTimeout(()=>r([
 { product:payload.facility||"Factoring", advance:"80%", tenor:payload.commitment||"60 days", note:"Buyer AA proxy" },
 { product:"PO Financing", advance:"70%", tenor:"90 days", note:"Docs complete" }
 ]), 500));
}
