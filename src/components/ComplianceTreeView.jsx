import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Search, Tag, FileText } from 'lucide-react';

/**
 * ComplianceTreeView Component
 * 
 * A browsable, expandable tree view for compliance categories and subcategories.
 * Supports searching, filtering, and item selection for tagging/categorization.
 * 
 * Props:
 * - categories: Array of compliance categories from complianceCategories.js
 * - onItemSelect: Callback when an item is selected (categoryId, subcategoryId, itemId, item)
 * - onCategorySelect: Callback when a category is selected (categoryId, category)
 * - onSubcategorySelect: Callback when a subcategory is selected (categoryId, subcategoryId, subcategory)
 * - selectedItems: Array of selected item IDs for highlighting
 * - searchable: Whether to show search functionality (default: true)
 * - selectable: Whether items are selectable (default: true)
 * - expandAll: Whether to expand all categories by default (default: false)
 */
const ComplianceTreeView = ({
  categories = [],
  onItemSelect,
  onCategorySelect,
  onSubcategorySelect,
  selectedItems = [],
  searchable = true,
  selectable = true,
  expandAll = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(
    expandAll ? new Set(categories.map(cat => cat.id)) : new Set()
  );
  const [expandedSubcategories, setExpandedSubcategories] = useState(
    expandAll ? new Set(categories.flatMap(cat => 
      cat.subcategories.map(sub => `${cat.id}-${sub.id}`)
    )) : new Set()
  );

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return categories;

    return categories.map(category => {
      const matchingSubcategories = category.subcategories.map(subcategory => {
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

      const categoryMatches = 
        category.name.toLowerCase().includes(term) ||
        category.description.toLowerCase().includes(term);

      if (matchingSubcategories.length > 0 || categoryMatches) {
        return {
          ...category,
          subcategories: matchingSubcategories.length > 0 ? matchingSubcategories : category.subcategories
        };
      }
      return null;
    }).filter(Boolean);
  }, [categories, searchTerm]);

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubcategory = (categoryId, subcategoryId) => {
    const key = `${categoryId}-${subcategoryId}`;
    const newExpanded = new Set(expandedSubcategories);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedSubcategories(newExpanded);
  };

  const handleCategoryClick = (category) => {
    toggleCategory(category.id);
    if (onCategorySelect) {
      onCategorySelect(category.id, category);
    }
  };

  const handleSubcategoryClick = (categoryId, subcategory) => {
    toggleSubcategory(categoryId, subcategory.id);
    if (onSubcategorySelect) {
      onSubcategorySelect(categoryId, subcategory.id, subcategory);
    }
  };

  const handleItemClick = (categoryId, subcategoryId, item) => {
    if (onItemSelect) {
      onItemSelect(categoryId, subcategoryId, item.id, item);
    }
  };

  return (
    <div className="compliance-tree-view">
      {searchable && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search compliance categories, items, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              {filteredCategories.length} categories found
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        {filteredCategories.map((category) => {
          const isCategoryExpanded = expandedCategories.has(category.id);
          
          return (
            <div key={category.id} className="border rounded-lg overflow-hidden">
              {/* Category Header */}
              <div
                className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${category.color}`}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {isCategoryExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-600" />
                    )}
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-600">{category.description}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {category.subcategories.length} subcategories
                    </div>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              {isCategoryExpanded && (
                <div className="bg-white">
                  {category.subcategories.map((subcategory) => {
                    const subcategoryKey = `${category.id}-${subcategory.id}`;
                    const isSubcategoryExpanded = expandedSubcategories.has(subcategoryKey);

                    return (
                      <div key={subcategory.id} className="border-t border-gray-100">
                        {/* Subcategory Header */}
                        <div
                          className="p-3 pl-8 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => handleSubcategoryClick(category.id, subcategory)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              {isSubcategoryExpanded ? (
                                <ChevronDown className="h-3 w-3 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-3 w-3 text-gray-500" />
                              )}
                              <FileText className="h-4 w-4 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-800">{subcategory.name}</div>
                              <div className="text-sm text-gray-600">{subcategory.description}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                {subcategory.items.length} items
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Items */}
                        {isSubcategoryExpanded && (
                          <div className="bg-gray-50">
                            {subcategory.items.map((item) => {
                              const isSelected = selectedItems.includes(item.id);

                              return (
                                <div
                                  key={item.id}
                                  className={`p-3 pl-16 cursor-pointer transition-colors ${
                                    selectable ? 'hover:bg-gray-100' : ''
                                  } ${
                                    isSelected ? 'bg-blue-100 border-l-4 border-blue-500' : ''
                                  }`}
                                  onClick={() => selectable && handleItemClick(category.id, subcategory.id, item)}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="flex-1">
                                      <div className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                                        {item.name}
                                      </div>
                                      {item.tags && item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                          {item.tags.map((tag) => (
                                            <span
                                              key={tag}
                                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-700"
                                            >
                                              <Tag className="h-3 w-3 mr-1" />
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    {selectable && isSelected && (
                                      <div className="text-blue-600">
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
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredCategories.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <div>No compliance categories found for "{searchTerm}"</div>
            <div className="text-sm mt-1">Try adjusting your search terms</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplianceTreeView;