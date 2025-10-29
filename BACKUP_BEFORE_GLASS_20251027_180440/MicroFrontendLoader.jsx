import React, { lazy, Suspense } from 'react';
import Loading from './components/Loading';

// Lazy load micro-frontend apps from src/apps directory
const FinancialApp = lazy(() => import('./apps/financial-app/src/App'));
const RealEstateApp = lazy(() => import('./apps/realestate-app/src/App'));
const AgricultureApp = lazy(() => import('./apps/agriculture-app/src/App'));

export default function MicroFrontendLoader({ app }) {
  const appConfig = {
    financial: { 
      name: 'Financial Services', 
      component: FinancialApp,
      description: 'Factoring, Trade Finance, Loans'
    },
    realestate: { 
      name: 'Real Estate', 
      component: RealEstateApp,
      description: 'Property Search, Mortgages, Mexico RE'
    },
    agriculture: { 
      name: 'Agriculture', 
      component: AgricultureApp,
      description: 'USDA, Commodities, Marketplace'
    },
  };

  const config = appConfig[app];
  
  if (!config) {
    return (
      <div className='min-h-screen bg-red-50 p-8'>
        <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8'>
          <h1 className='text-3xl font-bold text-red-600 mb-4'>Unknown Module</h1>
          <p className='text-gray-700'>Module '{app}' not found.</p>
        </div>
      </div>
    );
  }

  const AppComponent = config.component;

  return (
    <div className='micro-frontend-container'>
      <Suspense fallback={<Loading module={config.name} />}>
        <AppComponent />
      </Suspense>
    </div>
  );
}
