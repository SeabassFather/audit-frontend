import React, { useState, useMemo } from 'react';

export default function SearchableTestSelector({ 
  testCatalog = [], 
  onSelectionChange, 
  moduleType = 'general',
  color = '#06b6d4'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTests, setSelectedTests] = useState([]);
  const [sortBy, setSortBy] = useState('name'); // name, price, popular

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(testCatalog.map(t => t.category))];
    return cats;
  }, [testCatalog]);

  // Filter and search tests
  const filteredTests = useMemo(() => {
    let filtered = testCatalog;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.parameters.some(p => p.toLowerCase().includes(term)) ||
        t.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Sort
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.popular || 0) - (a.popular || 0));
    }

    return filtered;
  }, [testCatalog, searchTerm, selectedCategory, sortBy]);

  const toggleTest = (testId) => {
    let newSelection;
    if (selectedTests.includes(testId)) {
      newSelection = selectedTests.filter(id => id !== testId);
    } else {
      newSelection = [...selectedTests, testId];
    }
    setSelectedTests(newSelection);
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    }
  };

  const calculateTotal = () => {
    return selectedTests.reduce((total, testId) => {
      const test = testCatalog.find(t => t.id === testId);
      return total + (test ? test.price : 0);
    }, 0);
  };

  const clearSelection = () => {
    setSelectedTests([]);
    if (onSelectionChange) onSelectionChange([]);
  };

  return (
    <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px', marginBottom: '30px'}}>
      {/* Header */}
      <div style={{marginBottom: '25px'}}>
        <h2 style={{color: color, fontSize: '1.5rem', marginBottom: '10px'}}>
          🔬 Test Catalog ({testCatalog.length} Available)
        </h2>
        <p style={{color: '#94a3b8', fontSize: '0.95rem'}}>
          Search, filter, and select the tests you need. Multiple selections allowed.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '15px',
        marginBottom: '25px'
      }}>
        {/* Search Input */}
        <div style={{position: 'relative'}}>
          <input
            type="text"
            placeholder="🔍 Search tests by name, parameter, or keyword..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 45px 14px 45px',
              background: '#0f172a',
              border: `2px solid ${searchTerm ? color : '#334155'}`,
              borderRadius: '10px',
              color: 'white',
              fontSize: '1rem',
              transition: 'all 0.3s'
            }}
          />
          <span style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.2rem'
          }}>
            🔍
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#ef4444',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          style={{
            padding: '14px',
            background: '#0f172a',
            border: '2px solid #334155',
            borderRadius: '10px',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? '📂 All Categories' : `📁 ${cat}`}
            </option>
          ))}
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            padding: '14px',
            background: '#0f172a',
            border: '2px solid #334155',
            borderRadius: '10px',
            color: 'white',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          <option value="name">🔤 Sort: A-Z</option>
          <option value="price">💰 Sort: Price</option>
          <option value="popular">⭐ Sort: Popular</option>
        </select>
      </div>

      {/* Selected Tests Summary */}
      {selectedTests.length > 0 && (
        <div style={{
          background: `rgba(${parseInt(color.slice(1,3), 16)}, ${parseInt(color.slice(3,5), 16)}, ${parseInt(color.slice(5,7), 16)}, 0.15)`,
          border: `2px solid ${color}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '25px'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
            <div>
              <span style={{color: color, fontWeight: '700', fontSize: '1.1rem'}}>
                ✓ {selectedTests.length} Test{selectedTests.length !== 1 ? 's' : ''} Selected
              </span>
            </div>
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
              <span style={{color: '#10b981', fontSize: '1.5rem', fontWeight: '900'}}>
                ${calculateTotal().toFixed(2)}
              </span>
              <button
                onClick={clearSelection}
                style={{
                  padding: '8px 16px',
                  background: '#ef4444',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Clear All
              </button>
            </div>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
            {selectedTests.map(testId => {
              const test = testCatalog.find(t => t.id === testId);
              return test ? (
                <span key={testId} style={{
                  padding: '6px 12px',
                  background: '#0f172a',
                  borderRadius: '6px',
                  color: color,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {test.name} (${test.price})
                  <button
                    onClick={() => toggleTest(testId)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      padding: 0,
                      lineHeight: 1
                    }}
                  >
                    ✕
                  </button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div style={{
        color: '#94a3b8',
        fontSize: '0.9rem',
        marginBottom: '15px',
        paddingLeft: '5px'
      }}>
        {filteredTests.length === testCatalog.length 
          ? `Showing all ${filteredTests.length} tests`
          : `Found ${filteredTests.length} test${filteredTests.length !== 1 ? 's' : ''} matching your criteria`
        }
      </div>

      {/* Test Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
        maxHeight: '600px',
        overflowY: 'auto',
        paddingRight: '10px'
      }}>
        {filteredTests.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '60px 20px',
            color: '#64748b'
          }}>
            <div style={{fontSize: '3rem', marginBottom: '15px'}}>🔍</div>
            <div style={{fontSize: '1.2rem', marginBottom: '10px'}}>No tests found</div>
            <div style={{fontSize: '0.95rem'}}>
              Try adjusting your search or filters
            </div>
          </div>
        ) : (
          filteredTests.map(test => {
            const isSelected = selectedTests.includes(test.id);
            return (
              <div
                key={test.id}
                onClick={() => toggleTest(test.id)}
                style={{
                  background: isSelected ? `rgba(${parseInt(color.slice(1,3), 16)}, ${parseInt(color.slice(3,5), 16)}, ${parseInt(color.slice(5,7), 16)}, 0.2)` : '#0f172a',
                  border: `2px solid ${isSelected ? color : '#334155'}`,
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  if (!isSelected) e.currentTarget.style.borderColor = color;
                }}
                onMouseLeave={e => {
                  if (!isSelected) e.currentTarget.style.borderColor = '#334155';
                }}
              >
                {/* Popular Badge */}
                {test.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#f59e0b',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700'
                  }}>
                    ⭐ POPULAR
                  </div>
                )}

                {/* Category Tag */}
                <div style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  background: '#334155',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  marginBottom: '12px',
                  fontWeight: '600'
                }}>
                  {test.category}
                </div>

                {/* Test Name */}
                <h3 style={{
                  color: color,
                  fontSize: '1.1rem',
                  marginBottom: '10px',
                  fontWeight: '700'
                }}>
                  {test.name}
                </h3>

                {/* Description */}
                <p style={{
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                  marginBottom: '12px',
                  lineHeight: '1.5'
                }}>
                  {test.description}
                </p>

                {/* Parameters */}
                <div style={{marginBottom: '15px'}}>
                  <div style={{
                    color: '#64748b',
                    fontSize: '0.75rem',
                    marginBottom: '6px',
                    fontWeight: '600'
                  }}>
                    PARAMETERS TESTED:
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                    {test.parameters.slice(0, 6).map((param, i) => (
                      <span key={i} style={{
                        padding: '3px 8px',
                        background: '#1e293b',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        color: '#06b6d4'
                      }}>
                        {param}
                      </span>
                    ))}
                    {test.parameters.length > 6 && (
                      <span style={{
                        padding: '3px 8px',
                        color: '#64748b',
                        fontSize: '0.75rem'
                      }}>
                        +{test.parameters.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '15px',
                  borderTop: '1px solid #334155'
                }}>
                  <div style={{
                    fontSize: '1.3rem',
                    fontWeight: '900',
                    color: '#10b981'
                  }}>
                    ${test.price}
                  </div>
                  <div style={{
                    padding: '8px 16px',
                    background: isSelected ? color : '#334155',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    color: 'white'
                  }}>
                    {isSelected ? '✓ SELECTED' : 'SELECT'}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        div::-webkit-scrollbar {
          width: 10px;
        }
        div::-webkit-scrollbar-track {
          background: #0f172a;
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: ${color};
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: ${color}dd;
        }
      `}</style>
    </div>
  );
}