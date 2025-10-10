import React, { useState } from 'react';
const commodityContext = require.context('../data/commodities', false, /\.json$/);

const allProducts = commodityContext.keys().map(key => {
  const data = commodityContext(key);
  return {
    id: key.replace('./', '').replace('.json', ''),
    name: data.commodity || key.replace('./', '').replace('.json', ''),
    sizes: data.sizes || [{ id: 'default', label: 'Default Size', baseCost: 0 }]
  };
});

// ... your component code ...
// Replace any place you use `products` with `allProducts`
// For dropdown:
<select
  value={selectedProduct}
  onChange={e => setSelectedProduct(e.target.value)}
>
  <option value="">Select Product...</option>
  {allProducts.map(p => (
    <option key={p.id} value={p.id}>{p.name}</option>
  ))}
</select>