import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, Search, Bell, User, Menu, X, Home, DollarSign, 
  Building, Leaf, Database, Shield, Settings
} from 'lucide-react';

export default function MegaNavbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const currentUser = {
    name: 'SeabassFather',
    email: 'seabass@auditdna.com',
    avatar: 'Ã°Å¸Â¦Ë†',
    role: 'Supreme Admin'
  };

  const megaMenus = {
    financial: {
      label: 'Financial Services',
      icon: DollarSign,
      links: [
        { to: '/factoring', label: 'Invoice Factoring', icon: 'Ã°Å¸â€™Â°' },
        { to: '/financial', label: 'Financial Suite', icon: 'Ã°Å¸â€™Âµ' },
        { to: '/trade-finance', label: 'Trade Finance', icon: 'Ã°Å¸Å’Â' },
        { to: '/mexico-finance', label: 'Mexico Finance', icon: 'Ã°Å¸â€¡Â²Ã°Å¸â€¡Â½' },
      ]
    },
    realEstate: {
      label: 'Real Estate',
      icon: Building,
      links: [
        { to: '/mortgage', label: 'Mortgage Hub', icon: 'Ã°Å¸ÂÂ ' },
        { to: '/us-mortgage', label: 'US Mortgage', icon: 'Ã°Å¸â€¡ÂºÃ°Å¸â€¡Â¸' },
        { to: '/property/search', label: 'Property Search', icon: 'Ã°Å¸ÂÂ¡' },
      ]
    },
    agriculture: {
      label: 'Agriculture',
      icon: Leaf,
      links: [
        { to: '/ag-marketplace', label: 'Ag Marketplace', icon: 'Ã°Å¸â€ºâ€™' },
        { to: '/market-prices', label: 'Live Pricing', icon: 'Ã°Å¸â€™Â¹' },
        { to: '/produce-prices', label: 'Produce Pricing', icon: 'Ã°Å¸Â¥â€˜' },
      ]
    },
    usda: {
      label: 'USDA',
      icon: Database,
      links: [
        { to: '/usda', label: 'USDA Hub', icon: 'Ã°Å¸Å’Â½' },
        { to: '/usda/marketplace', label: 'USDA Marketplace', icon: 'Ã°Å¸ÂÂª' },
      ]
    },
    compliance: {
      label: 'Compliance',
      icon: Shield,
      links: [
        { to: '/compliance', label: 'Compliance Hub', icon: 'Ã¢Å“â€¦' },
        { to: '/audit', label: 'Audit Hub', icon: 'Ã°Å¸â€Â' },
      ]
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <>
      <header className='sticky top-0 z-50 bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 border-b-2 border-green-200 shadow-lg'>
        <div className='max-w-[1920px] mx-auto'>
          <div className='border-b border-gray-200 px-6 py-2 flex items-center justify-between text-sm bg-green-50/50'>
            <div className='flex items-center gap-4'>
              <span className='text-gray-600 font-medium'>Ã°Å¸â€œÂ AuditDNA Supreme</span>
              <span className='text-green-600 font-semibold'>Ã¢Å“â€œ All Systems Operational</span>
            </div>
            <div className='text-gray-600'>
              Ã°Å¸Å’Â Multi-Region | Ã°Å¸â€œÅ¾ 24/7 Support
            </div>
          </div>

          <div className='px-6 py-4'>
            <div className='flex items-center justify-between'>
              <NavLink to='/' className='flex items-center gap-3 group'>
                <div className='text-4xl group-hover:scale-110 transition-transform'>Ã°Å¸Â§Â¬</div>
                <div>
                  <div className='text-2xl font-bold' style={{ color: '#17853b' }}>
                    AuditDNA
                  </div>
                  <div className='text-xs text-gray-500'>Supreme Edition v1.0</div>
                </div>
              </NavLink>

              <nav className='hidden xl:flex items-center gap-1'>
                <NavLink 
                  to='/dashboard' 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                      isActive 
                        ? 'bg-green-100 text-green-800 shadow-sm' 
                        : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                    }`
                  }
                >
                  <Home size={18} />
                  Dashboard
                </NavLink>

                {Object.entries(megaMenus).map(([key, menu]) => {
                  const Icon = menu.icon;
                  return (
                    <div key={key} className='relative'>
                      <button
                        onClick={() => toggleDropdown(key)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                          activeDropdown === key
                            ? 'bg-green-100 text-green-800 shadow-sm'
                            : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                        }`}
                      >
                        <Icon size={18} />
                        {menu.label}
                        <ChevronDown size={16} className={`transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                      </button>

                      {activeDropdown === key && (
                        <div className='absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-green-200 min-w-[300px] p-4 z-50'>
                          <div className='space-y-2'>
                            {menu.links.map((link, idx) => (
                              <NavLink
                                key={idx}
                                to={link.to}
                                onClick={() => setActiveDropdown(null)}
                                className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors group'
                              >
                                <span className='text-xl'>{link.icon}</span>
                                <span className='text-sm font-medium text-gray-700 group-hover:text-green-700'>{link.label}</span>
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className='flex items-center gap-3'>
                <form onSubmit={handleSearch} className='hidden lg:flex items-center bg-white rounded-lg px-4 py-2 border-2 border-green-200 shadow-sm'>
                  <Search size={18} className='text-green-600 mr-2' />
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search...'
                    className='border-none outline-none text-gray-800 placeholder-gray-400 w-64'
                  />
                </form>

                <div className='relative'>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className='flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 transition-all border border-transparent hover:border-green-200'
                  >
                    <div className='text-2xl'>{currentUser.avatar}</div>
                    <div className='hidden lg:block text-left'>
                      <div className='text-sm font-semibold text-gray-800'>{currentUser.name}</div>
                      <div className='text-xs text-gray-500'>{currentUser.role}</div>
                    </div>
                    <ChevronDown size={16} className='text-gray-600' />
                  </button>

                  {showUserMenu && (
                    <div className='absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-green-200 z-50'>
                      <div className='p-4 border-b border-gray-200 bg-green-50/30'>
                        <div className='flex items-center gap-3'>
                          <div className='text-3xl'>{currentUser.avatar}</div>
                          <div>
                            <div className='font-bold text-gray-800'>{currentUser.name}</div>
                            <div className='text-sm text-gray-600'>{currentUser.email}</div>
                          </div>
                        </div>
                      </div>
                      <div className='p-2'>
                        <NavLink to='/settings' className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-700'>
                          <Settings size={18} />
                          <span className='text-sm font-medium'>Settings</span>
                        </NavLink>
                        <NavLink to='/admin' className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 text-gray-700 hover:text-green-700'>
                          <Shield size={18} />
                          <span className='text-sm font-medium'>Admin Panel</span>
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {(activeDropdown || showUserMenu) && (
        <div 
          className='fixed inset-0 z-40' 
          onClick={() => {
            setActiveDropdown(null);
            setShowUserMenu(false);
          }}
        />
      )}
    </>
  );
}