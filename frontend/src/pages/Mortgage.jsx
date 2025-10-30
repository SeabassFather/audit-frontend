import React, { useState } from 'react';
import { DollarSign, Globe, Building2 } from 'lucide-react';
import MortgageTabUS from './MortgageTabUS';
import MortgageTabMexico from './MortgageTabMexico';
import MortgageTabRealEstate from './MortgageTabRealEstate';

export default function Mortgage() {
  const [activeTab, setActiveTab] = useState('us-loans');

  const tabs = [
    {
      key: 'us-loans',
      label: 'US Mortgage Loans',
      subtitle: 'Conventional, FHA, USDA, VA, Jumbo',
      icon: DollarSign,
      gradient: 'from-green-600 to-teal-600'
    },
    {
      key: 'mexico-loans',
      label: 'Mexico Financing',
<<<<<<< HEAD
      subtitle: 'Préstamos en México',
=======
      subtitle: 'PrÃƒÂ©stamos en MÃƒÂ©xico',
>>>>>>> my/push-branch
      icon: Globe,
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      key: 'mexico-realestate',
      label: 'Mexico Real Estate',
<<<<<<< HEAD
      subtitle: 'Bienes Raíces en México',
=======
      subtitle: 'Bienes RaÃƒÂ­ces en MÃƒÂ©xico',
>>>>>>> my/push-branch
      icon: Building2,
      gradient: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-lg shadow-lg p-2">
        <div className="flex gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                  isActive
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg transform scale-105`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-6 h-6" />
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className="text-xs opacity-75">{tab.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'us-loans' && <MortgageTabUS />}
      {activeTab === 'mexico-loans' && <MortgageTabMexico />}
      {activeTab === 'mexico-realestate' && <MortgageTabRealEstate />}
    </div>
  );
}
