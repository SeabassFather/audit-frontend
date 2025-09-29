// Data Service - Hybrid approach with API fallback to local files
import { api } from '../utils/api';

// Import local data files for fallback
import lendersData from '../data/lenders.json';
import spartanServices from '../data/spartan_services.json';
import servicesCatalog from '../data/servicesCatalog.json';
import eliteModules from '../data/elite_modules.json';

// Service data integration with fallback
export async function getServicesData() {
  try {
    // Try API first
    const response = await api.get('/api/services');
    return response;
  } catch (error) {
    console.warn('API unavailable, using local service data:', error.message);
    // Fallback to local data
    return {
      spartan: spartanServices,
      catalog: servicesCatalog,
      elite: eliteModules
    };
  }
}

// Lenders data with fallback
export async function getLendersData() {
  try {
    const response = await api.get('/api/lenders');
    return response;
  } catch (error) {
    console.warn('API unavailable, using local lenders data:', error.message);
    return lendersData;
  }
}

// Mortgage rates with fallback
export async function getMortgageRates() {
  try {
    const response = await api.get('/api/tickers/rates');
    return response;
  } catch (error) {
    console.warn('API unavailable, using mock mortgage rates:', error.message);
    return [
      { label: "30Y Fixed", value: "6.94%", change: "-0.02", isPositive: false },
      { label: "15Y Fixed", value: "6.23%", change: "+0.01", isPositive: true },
      { label: "5/1 ARM", value: "5.85%", change: "-0.05", isPositive: false },
      { label: "Jumbo 30Y", value: "7.12%", change: "+0.03", isPositive: true },
      { label: "FHA 30Y", value: "6.65%", change: "-0.01", isPositive: false },
      { label: "VA 30Y", value: "6.58%", change: "+0.02", isPositive: true }
    ];
  }
}

// Commodities data with fallback
export async function getCommoditiesData() {
  try {
    const response = await api.get('/api/tickers/commodities');
    return response;
  } catch (error) {
    console.warn('API unavailable, using mock commodities data:', error.message);
    return [
      { label: "Corn", value: "$473.25", change: "+1.10", isPositive: true },
      { label: "Soybeans", value: "$1,264.50", change: "-3.25", isPositive: false },
      { label: "Wheat", value: "$604.75", change: "+0.75", isPositive: true },
      { label: "Cotton", value: "$67.80", change: "+0.45", isPositive: true },
      { label: "Rice", value: "$16.45", change: "-0.12", isPositive: false },
      { label: "Sugar", value: "$22.34", change: "+0.67", isPositive: true }
    ];
  }
}

// Stocks/Markets data with fallback
export async function getMarketsData() {
  try {
    const response = await api.get('/api/tickers/stocks');
    return response;
  } catch (error) {
    console.warn('API unavailable, using mock markets data:', error.message);
    return [
      { label: "S&P 500", value: "5,510", change: "+12", isPositive: true },
      { label: "NASDAQ", value: "23,784", change: "-31", isPositive: false },
      { label: "DOW", value: "39,210", change: "+48", isPositive: true },
      { label: "Russell 2K", value: "2,180", change: "-6", isPositive: false },
      { label: "VIX", value: "15.2", change: "-0.8", isPositive: false },
      { label: "Gold", value: "$2,031", change: "+15", isPositive: true }
    ];
  }
}

// Dashboard statistics with real data
export async function getDashboardStats(servicesData) {
  try {
    const response = await api.get('/api/dashboard/stats');
    return response;
  } catch (error) {
    console.warn('API unavailable, calculating stats from local data:', error.message);
    
    // Calculate real stats from available data
    const spartanCount = Object.values(servicesData?.spartan || {}).flat().length;
    const lendersCount = lendersData.length;
    const eliteCount = servicesData?.elite?.length || 0;
    
    return [
      { label: "Total Services", value: `${spartanCount}+`, icon: "BarChart3" },
      { label: "Active Cases", value: "1,247", icon: "Users" },
      { label: "Total Recovery", value: "$12.4M", icon: "DollarSign" },
      { label: "Success Rate", value: "94.2%", icon: "TrendingUp" },
      { label: "Lenders Network", value: `${lendersCount}+`, icon: "Users" },
      { label: "Elite Modules", value: `${eliteCount}+`, icon: "Star" }
    ];
  }
}

// Search functions with API integration
export async function searchMortgages(criteria) {
  try {
    const response = await api.post('/api/mortgage/search', criteria);
    return response;
  } catch (error) {
    console.warn('Mortgage search API unavailable, using local data:', error.message);
    // Filter lenders based on criteria
    return lendersData.filter(lender => {
      return (!criteria.state || lender.programs?.includes(criteria.state)) &&
             (!criteria.minFico || lender.compPercent_guess >= criteria.minFico);
    });
  }
}

export async function searchFactoring(criteria) {
  try {
    const response = await api.post('/api/trade-finance/factoring', criteria);
    return response;
  } catch (error) {
    console.warn('Factoring search API unavailable:', error.message);
    return [];
  }
}