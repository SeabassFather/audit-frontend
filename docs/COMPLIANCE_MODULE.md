# AuditDNA Compliance Module

## Overview

The AuditDNA Compliance Module provides a comprehensive framework for managing compliance categories, subcategories, and individual compliance items. It offers both tabbed and tree-view navigation interfaces for browsing, searching, and selecting compliance items for document tagging and audit organization.

## Features

### 🏗️ **Modular Architecture**
- **ComplianceCategories Data Structure**: Centralized, extensible data model
- **Reusable Components**: Tab view and tree view navigation components
- **Easy Extension**: Add new categories, subcategories, and items without code changes

### 📊 **Comprehensive Coverage**
The module includes 8 major compliance categories:

1. **🏢 Business Compliance** (3 subcategories, 12 items)
   - Corporate Governance
   - Financial Reporting
   - Tax Compliance

2. **🤝 Commercial Compliance** (3 subcategories, 12 items)
   - Contract Management
   - Trade & Export Compliance
   - Antitrust & Competition

3. **⚖️ Legal Compliance** (3 subcategories, 12 items)
   - Regulatory Compliance
   - Litigation Management
   - Intellectual Property

4. **🏥 Medical Compliance** (3 subcategories, 12 items)
   - HIPAA Compliance
   - FDA Compliance
   - Medical Billing Compliance

5. **🎓 Educational Compliance** (3 subcategories, 12 items)
   - FERPA Compliance
   - Title IX Compliance
   - Accreditation

6. **✈️ Travel Compliance** (3 subcategories, 12 items)
   - Travel Policies
   - Immigration Compliance
   - International Compliance

7. **🛡️ Insurance Compliance** (3 subcategories, 12 items)
   - Policy Compliance
   - Claims Management
   - Regulatory Reporting

8. **👥 Consumer Protection** (3 subcategories, 12 items)
   - Financial Services Compliance
   - Data Protection & Privacy
   - Consumer Rights & Protection

**Total**: 8 categories, 24 subcategories, 96 compliance items

### 🎛️ **Dual Navigation Modes**

#### Tab View
- Horizontal tab navigation for categories
- Category-specific header with description and statistics
- Expandable subcategory cards with item grids
- Optimized for focused category exploration

#### Tree View
- Hierarchical navigation for all categories
- Expandable/collapsible structure
- Full category overview in single view
- Optimized for broad exploration and selection

### 🔍 **Search & Filter**
- Real-time search across categories, subcategories, and items
- Tag-based filtering
- Search result highlighting
- Context-aware filtering per navigation mode

### 🏷️ **Tagging System**
- Each compliance item includes relevant tags
- Visual tag display with icons
- Tag-based search functionality
- Supports multiple tags per item

### 📤 **Document Upload Integration**
- Custom upload modal with compliance context
- Selected categories/items passed to upload process
- QR code generation for mobile uploads
- Drag-and-drop file support
- Multiple file format support (PDF, DOCX, JPG, PNG, XLSX, ZIP)

## File Structure

```
src/
├── data/
│   └── complianceCategories.js     # Main data structure & helper functions
├── components/
│   ├── ComplianceTabView.jsx       # Tabbed navigation component
│   ├── ComplianceTreeView.jsx      # Tree navigation component
│   └── ComplianceUploadSheet.jsx   # Upload modal component
└── pages/
    └── ModuleCompliance.jsx        # Main compliance module page
```

## Data Schema

### Category Structure
```javascript
{
  id: string,                    // Unique identifier
  name: string,                  // Display name
  description: string,           // Brief description
  icon: string,                  // Emoji or icon identifier
  color: string,                 // CSS color class for theming
  subcategories: [               // Array of subcategory objects
    {
      id: string,
      name: string,
      description: string,
      items: [                   // Array of compliance items
        {
          id: string,
          name: string,
          tags: [string]         // Array of relevant tags
        }
      ]
    }
  ]
}
```

### Helper Functions
- `getAllCategories()` - Get all categories
- `getCategoryById(id)` - Get specific category
- `getSubcategoriesByCategoryId(id)` - Get subcategories for category
- `searchCompliance(term)` - Search across all data
- `getAllTags()` - Get all unique tags

## Component Props

### ComplianceTabView
```javascript
{
  categories: Array,           // Compliance categories data
  onItemSelect: Function,      // Callback for item selection
  onCategorySelect: Function,  // Callback for category selection
  selectedItems: Array,        // Array of selected item IDs
  searchable: Boolean,         // Enable search (default: true)
  selectable: Boolean,         // Enable selection (default: true)
  defaultCategory: String      // Default category ID to show
}
```

### ComplianceTreeView
```javascript
{
  categories: Array,           // Compliance categories data
  onItemSelect: Function,      // Callback for item selection
  onCategorySelect: Function,  // Callback for category selection
  selectedItems: Array,        // Array of selected item IDs
  searchable: Boolean,         // Enable search (default: true)
  selectable: Boolean,         // Enable selection (default: true)
  expandAll: Boolean          // Expand all categories by default
}
```

### ComplianceUploadSheet
```javascript
{
  open: Boolean,              // Modal visibility
  onClose: Function,          // Close callback
  service: {                  // Service configuration
    id: String,               // Service identifier
    name: String,             // Service display name
    selectedCategories: Array, // Selected category IDs
    selectedItems: Array       // Selected item IDs
  }
}
```

## Usage Examples

### Basic Implementation
```javascript
import { COMPLIANCE_CATEGORIES } from '../data/complianceCategories';
import ComplianceTabView from '../components/ComplianceTabView';

function MyComponent() {
  const [selectedItems, setSelectedItems] = useState([]);
  
  const handleItemSelect = (categoryId, subcategoryId, itemId, item) => {
    // Handle item selection
    setSelectedItems(prev => [...prev, itemId]);
  };

  return (
    <ComplianceTabView
      categories={COMPLIANCE_CATEGORIES}
      onItemSelect={handleItemSelect}
      selectedItems={selectedItems}
    />
  );
}
```

### Search Implementation
```javascript
import { searchCompliance } from '../data/complianceCategories';

function SearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(COMPLIANCE_CATEGORIES);
  
  useEffect(() => {
    const results = searchCompliance(searchTerm);
    setFilteredCategories(results);
  }, [searchTerm]);

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search compliance items..."
      />
      <ComplianceTreeView categories={filteredCategories} />
    </div>
  );
}
```

## Styling

The components use Tailwind CSS classes with consistent color schemes:
- **Primary**: Blue tones for active states and selections
- **Category Colors**: Each category has its own color theme for visual distinction
- **Interactive States**: Hover, active, and selected states with appropriate feedback

## Future Enhancements

### Admin Features (Not Yet Implemented)
- Add/edit/delete categories and items
- Bulk import/export functionality
- Category reordering and nesting
- Custom tag management

### Advanced Workflow (Not Yet Implemented)
- Audit workflow integration
- Document status tracking
- Compliance reporting
- Automated compliance checking

### Analytics (Not Yet Implemented)
- Usage analytics per category
- Popular compliance items
- Search analytics
- User interaction patterns

## Route Integration

The compliance module is accessible via:
- `/module-compliance` - Main compliance module interface
- `/compliance` - Legacy compliance view (preserved for backward compatibility)

## Migration Notes

The new compliance module preserves the legacy frameworks (TRID, ECOA, GLBA, CCPA, GDPR, UK GDPR, PIPEDA) in a dedicated "Legacy Frameworks" section while expanding the capability with the comprehensive category system.

## Performance Considerations

- **Virtual Scrolling**: Consider implementing for very large item lists
- **Lazy Loading**: Categories and subcategories load on demand
- **Memoization**: Components use React.memo and useMemo for optimal performance
- **Search Debouncing**: Search operations are debounced to avoid excessive filtering

## Testing

The module has been tested for:
- ✅ Category navigation (both tab and tree views)
- ✅ Item selection and deselection
- ✅ Search functionality across all levels
- ✅ Upload modal integration
- ✅ View mode switching
- ✅ Responsive design
- ✅ Accessibility considerations

## Browser Support

Compatible with all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- React 18+