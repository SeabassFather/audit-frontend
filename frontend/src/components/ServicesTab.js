<div className="category-card">
  <div
    className="category-header"
    onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
  >
    <div className="header-left">
      <span className="cat-icon">{cat.icon}</span>
      <div>
        <div className="cat-title">{cat.category}</div>
        <div className="cat-count">{cat.items?.length || 0} services</div>
      </div>
    </div>
<<<<<<< HEAD
    <span className="cat-arrow">{expandedCategory === idx ? '▲' : '▼'}</span>
=======
    <span className="cat-arrow">{expandedCategory === idx ? 'Ã¢â€“Â²' : 'Ã¢â€“Â¼'}</span>
>>>>>>> my/push-branch
  </div>
  {expandedCategory === idx && (
    <div className="service-grid">
      {cat.items.map((svc, i) => (
        <div key={i} className="service-item">{svc}</div>
      ))}
    </div>
  )}
</div>
