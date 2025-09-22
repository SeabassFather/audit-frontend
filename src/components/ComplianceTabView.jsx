import React, { useState, useMemo } from 'react';
import { Search, Tag, FileText } from 'lucide-react';

/**
 * ComplianceTabView Component
 * 
 * A tabbed navigation interface for compliance categories with subcategory grids.
 * Provides an alternative to the tree view for easier browsing.
 * 
 * Props:
 * - categories: Array of compliance categories from complianceCategories.js
 * - onItemSelect: Callback when an item is selected (categoryId, subcategoryId, itemId, item)
 * - onCategorySelect: Callback when a category tab is selected (categoryId, category)
 * - onSubcategorySelect: Callback when a subcategory is selected (categoryId, subcategoryId, subcategory)
 * - selectedItems: Array of selected item IDs for highlighting
 * - searchable: Whether to show search functionality (default: true)
 * - selectable: Whether items are selectable (default: true)
 * - defaultCategory: ID of the category to show by default
 */
const ComplianceTabView = ({
  categories = [],
  onItemSelect,
  onCategorySelect,
  onSubcategorySelect,
  selectedItems = [],
  searchable = true,
  selectable = true,
  defaultCategory = null
}) => {
  const [activeCategory, setActiveCategory] = useState(
    defaultCategory || (categories.length > 0 ? categories[0].id : null)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSubcategories, setExpandedSubcategories] = useState(new Set());

  // Get the active category object
  const activeCategoryObj = useMemo(() => 
    categories.find(cat => cat.id === activeCategory), 
    [categories, activeCategory]
  );

  // Filter subcategories and items based on search term
  const filteredSubcategories = useMemo(() => {
    if (!activeCategoryObj) return [];
    
    const term = searchTerm.toLowerCase().trim();
    if (!term) return activeCategoryObj.subcategories;

    return activeCategoryObj.subcategories.map(subcategory => {
      const matchingItems = subcategory.items.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
      );

      const subcategoryMatches = 
        subcategory.name.toLowerCase().includes(term) ||
        subcategory.description.toLowerCase().includes(term);

      if (matchingItems.length > 0 || subcategoryMatches) {
        return {
          ...subcategory,
          items: matchingItems.length > 0 ? matchingItems : subcategory.items
        };
      }
      return null;
    }).filter(Boolean);
  }, [activeCategoryObj, searchTerm]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    const category = categories.find(cat => cat.id === categoryId);
    if (onCategorySelect && category) {
      onCategorySelect(categoryId, category);
    }
    // Clear search when switching categories
    setSearchTerm('');
  };

  const toggleSubcategory = (subcategoryId) => {
    const newExpanded = new Set(expandedSubcategories);
    if (newExpanded.has(subcategoryId)) {
      newExpanded.delete(subcategoryId);
    } else {
      newExpanded.add(subcategoryId);
    }
    setExpandedSubcategories(newExpanded);
  };

  const handleSubcategoryClick = (subcategory) => {
    toggleSubcategory(subcategory.id);
    if (onSubcategorySelect) {
      onSubcategorySelect(activeCategory, subcategory.id, subcategory);
    }
  };

  const handleItemClick = (subcategoryId, item) => {
    if (onItemSelect) {
      onItemSelect(activeCategory, subcategoryId, item.id, item);
    }
  };

  if (!activeCategoryObj) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div>No compliance categories available</div>
      </div>
    );
  }

  return (
    <div className="compliance-tab-view">
      {/* Category Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`py-3 px-1 whitespace-nowrap border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                activeCategory === category.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Active Category Header */}
      <div className={`rounded-lg p-4 mb-6 ${activeCategoryObj.color}`}>
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-2xl">{activeCategoryObj.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{activeCategoryObj.name}</h2>
            <p className="text-gray-700">{activeCategoryObj.description}</p>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {activeCategoryObj.subcategories.length} subcategories • {' '}
          {activeCategoryObj.subcategories.reduce((total, sub) => total + sub.items.length, 0)} total items
        </div>
      </div>

      {/* Search */}
      {searchable && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={`Search in ${activeCategoryObj.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              {filteredSubcategories.length} subcategories found
            </div>
          )}
        </div>
      )}

      {/* Subcategories Grid */}
      <div className="space-y-6">
        {filteredSubcategories.map((subcategory) => {
          const isExpanded = expandedSubcategories.has(subcategory.id);

          return (
            <div key={subcategory.id} className="border rounded-lg overflow-hidden">
              {/* Subcategory Header */}
              <div
                className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSubcategoryClick(subcategory)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{subcategory.name}</h3>
                      <p className="text-sm text-gray-600">{subcategory.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {subcategory.items.length} items
                    </span>
                    <div className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Grid */}
              {isExpanded && (
                <div className="p-4 bg-white">
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {subcategory.items.map((item) => {
                      const isSelected = selectedItems.includes(item.id);

                      return (
                        <div
                          key={item.id}
                          className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          } ${selectable ? '' : 'cursor-default'}`}
                          onClick={() => selectable && handleItemClick(subcategory.id, item)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className={`font-medium text-sm ${
                                isSelected ? 'text-blue-900' : 'text-gray-900'
                              }`}>
                                {item.name}
                              </div>
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {item.tags.slice(0, 3).map((tag) => (
                                    <span
                                      key={tag}
                                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                        isSelected 
                                          ? 'bg-blue-200 text-blue-800' 
                                          : 'bg-gray-200 text-gray-700'
                                      }`}
                                    >
                                      <Tag className="h-3 w-3 mr-1" />
                                      {tag}
                                    </span>
                                  ))}
                                  {item.tags.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                      +{item.tags.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            {selectable && isSelected && (
                              <div className="text-blue-600 ml-2 flex-shrink-0">
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredSubcategories.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <div>No subcategories found for "{searchTerm}"</div>
            <div className="text-sm mt-1">Try adjusting your search terms</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceTabView;