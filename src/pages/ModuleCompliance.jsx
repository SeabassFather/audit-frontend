import { useState } from "react";
import { Link } from "react-router-dom";
import { Settings, Upload, Eye, BarChart3 } from "lucide-react";
import ComplianceUploadSheet from "../components/ComplianceUploadSheet";
import ComplianceTreeView from "../components/ComplianceTreeView";
import ComplianceTabView from "../components/ComplianceTabView";
import { COMPLIANCE_CATEGORIES, getAllTags } from "../data/complianceCategories";

export default function ModuleCompliance(){
 const [open, setOpen] = useState(false);
 const [viewMode, setViewMode] = useState('tabs'); // 'tabs' or 'tree'
 const [selectedItems, setSelectedItems] = useState([]);
 const [selectedCategories, setSelectedCategories] = useState([]);

 const regs = ["TRID","ECOA","GLBA","CCPA","GDPR","UK GDPR","PIPEDA"];
 const totalCategories = COMPLIANCE_CATEGORIES.length;
 const totalSubcategories = COMPLIANCE_CATEGORIES.reduce((total, cat) => total + cat.subcategories.length, 0);
 const totalItems = COMPLIANCE_CATEGORIES.reduce((total, cat) => 
   total + cat.subcategories.reduce((subTotal, sub) => subTotal + sub.items.length, 0), 0);

 const handleItemSelect = (categoryId, subcategoryId, itemId, item) => {
   setSelectedItems(prev => {
     if (prev.includes(itemId)) {
       return prev.filter(id => id !== itemId);
     } else {
       return [...prev, itemId];
     }
   });
 };

 const handleCategorySelect = (categoryId, category) => {
   setSelectedCategories(prev => {
     if (prev.includes(categoryId)) {
       return prev.filter(id => id !== categoryId);
     } else {
       return [...prev, categoryId];
     }
   });
 };

 const clearSelections = () => {
   setSelectedItems([]);
   setSelectedCategories([]);
 };

 return (
   <div className="dna-section space-y-6">
     <div className="flex items-center justify-between">
       <div>
         <h1 className="text-2xl font-bold">Compliance Module</h1>
         <p className="text-slate-600 mt-1">
           Comprehensive compliance category navigation and document management
         </p>
       </div>
       <div className="flex items-center gap-2">
         <button
           onClick={() => setViewMode(viewMode === 'tabs' ? 'tree' : 'tabs')}
           className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
         >
           <Eye className="h-4 w-4" />
           {viewMode === 'tabs' ? 'Tree View' : 'Tab View'}
         </button>
         <button 
           className="flex items-center gap-2 bg-dnaBlue text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors" 
           onClick={() => setOpen(true)}
         >
           <Upload className="h-4 w-4" />
           Upload Documents
         </button>
       </div>
     </div>

     {/* Statistics Overview */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       <div className="card p-4">
         <div className="flex items-center gap-3">
           <div className="p-2 bg-blue-100 rounded-lg">
             <BarChart3 className="h-5 w-5 text-blue-600" />
           </div>
           <div>
             <div className="text-2xl font-bold">{totalCategories}</div>
             <div className="text-sm text-gray-600">Categories</div>
           </div>
         </div>
       </div>
       <div className="card p-4">
         <div className="flex items-center gap-3">
           <div className="p-2 bg-green-100 rounded-lg">
             <Settings className="h-5 w-5 text-green-600" />
           </div>
           <div>
             <div className="text-2xl font-bold">{totalSubcategories}</div>
             <div className="text-sm text-gray-600">Subcategories</div>
           </div>
         </div>
       </div>
       <div className="card p-4">
         <div className="flex items-center gap-3">
           <div className="p-2 bg-purple-100 rounded-lg">
             <Upload className="h-5 w-5 text-purple-600" />
           </div>
           <div>
             <div className="text-2xl font-bold">{totalItems}</div>
             <div className="text-sm text-gray-600">Compliance Items</div>
           </div>
         </div>
       </div>
       <div className="card p-4">
         <div className="flex items-center gap-3">
           <div className="p-2 bg-orange-100 rounded-lg">
             <Eye className="h-5 w-5 text-orange-600" />
           </div>
           <div>
             <div className="text-2xl font-bold">{selectedItems.length}</div>
             <div className="text-sm text-gray-600">Selected Items</div>
           </div>
         </div>
       </div>
     </div>

     {/* Legacy Frameworks */}
     <div className="card p-4">
       <div className="flex items-center justify-between mb-3">
         <div className="text-lg font-semibold">Legacy Frameworks</div>
         <Link to="/services" className="text-sm text-blue-600 hover:text-blue-800">
           View All Services →
         </Link>
       </div>
       <div className="text-sm text-slate-600 mb-3">Previously included frameworks:</div>
       <div className="flex gap-2 flex-wrap mb-4">
         {regs.map(r => <span key={r} className="badge">{r}</span>)}
       </div>
       <div className="flex gap-2 flex-wrap">
         <Link to="/compliance" className="border rounded px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
           Legacy Compliance View
         </Link>
         <Link to="/services" className="border rounded px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
           All Services
         </Link>
       </div>
     </div>

     {/* Selection Summary */}
     {(selectedItems.length > 0 || selectedCategories.length > 0) && (
       <div className="card p-4 bg-blue-50 border-blue-200">
         <div className="flex items-center justify-between mb-2">
           <div className="font-semibold text-blue-900">Current Selections</div>
           <button 
             onClick={clearSelections}
             className="text-sm text-blue-600 hover:text-blue-800"
           >
             Clear All
           </button>
         </div>
         <div className="text-sm text-blue-800">
           {selectedItems.length} items selected from {selectedCategories.length} categories
         </div>
       </div>
     )}

     {/* Compliance Navigation */}
     <div className="card p-6">
       <div className="mb-4">
         <h2 className="text-lg font-semibold mb-2">Compliance Categories</h2>
         <p className="text-sm text-gray-600">
           Browse and select compliance categories for document tagging and audit organization.
         </p>
       </div>

       {viewMode === 'tabs' ? (
         <ComplianceTabView
           categories={COMPLIANCE_CATEGORIES}
           onItemSelect={handleItemSelect}
           onCategorySelect={handleCategorySelect}
           selectedItems={selectedItems}
           searchable={true}
           selectable={true}
           defaultCategory="business"
         />
       ) : (
         <ComplianceTreeView
           categories={COMPLIANCE_CATEGORIES}
           onItemSelect={handleItemSelect}
           onCategorySelect={handleCategorySelect}
           selectedItems={selectedItems}
           searchable={true}
           selectable={true}
           expandAll={false}
         />
       )}
     </div>

     <ComplianceUploadSheet 
       open={open} 
       onClose={() => setOpen(false)} 
       service={{
         id: "module-compliance", 
         name: "Compliance Document Intake",
         selectedCategories: selectedCategories,
         selectedItems: selectedItems
       }}
     />
   </div>
 );
}
