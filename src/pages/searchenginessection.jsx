import React, { useState } from "react";

const ENGINES = [
  {
    name: "Google",
    url: "https://www.google.com/search?q=",
    color: "#4285F4",
    icon: "🔎"
  },
  {
    name: "Bing",
    url: "https://www.bing.com/search?q=",
    color: "#2580d5",
    icon: "🟦"
  },
  {
    name: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
    color: "#DE5833",
    icon: "🦆"
  },
  {
    name: "USDA",
    url: "https://www.usda.gov/topics/farming/grants-and-loans",
    color: "#417505",
    icon: "🌱"
  },
];

const DEFAULT_QUERIES = [
  "agricultural mortgage",
  "farm mortgage rates",
  "agricultural invoice factoring",
  "farm receivables finance"
];

export default function SearchEnginesSection() {
  const [query, setQuery] = useState(DEFAULT_QUERIES[0]);

  return (
    <div style={{padding: "1.2rem 0"}}>
      <h2 style={{fontSize:"1.25rem", fontWeight:700, marginBottom:14}}>Mortgage & Factoring Search Engines</h2>
      <div style={{display:"flex", gap:22, flexWrap:"wrap"}}>
        {ENGINES.map(engine => (
          <div key={engine.name} style={{
            background:"#fff",
            borderRadius:15,
            border:`2px solid ${engine.color}33`,
            boxShadow:"0 2px 12px 0 rgba(0,0,0,0.05)",
            minWidth: 240,
            padding:"1.3rem 1.1rem 1.5rem 1.1rem",
            display:"flex",
            flexDirection:"column",
            alignItems:"flex-start"
          }}>
            <span style={{
              fontWeight:700,
              fontSize:"1.13rem",
              color: engine.color,
              marginBottom: 8
            }}>{engine.icon} {engine.name}</span>
            {engine.name !== "USDA" ? (
              <>
                <input
                  type="text"
                  value={query}
                  onChange={e=>setQuery(e.target.value)}
                  style={{
                    width:"100%",
                    padding:"8px 12px",
                    fontSize:".98rem",
                    borderRadius:8,
                    border:"1.5px solid #e5e5e5",
                    marginBottom: 9
                  }}
                  placeholder="Search mortgage or factoring..."
                />
                <button
                  onClick={()=>
                    window.open(engine.url + encodeURIComponent(query), "_blank")
                  }
                  style={{
                    background: engine.color,
                    color:"#fff",
                    border:"none",
                    borderRadius:8,
                    fontWeight:600,
                    fontSize:".98rem",
                    padding:"7px 18px",
                    cursor:"pointer"
                  }}
                >
                  Search
                </button>
              </>
            ) : (
              <>
                <div style={{fontSize:".97rem",color:"#222",marginBottom:7}}>
                  Direct link to USDA farming loans, grants, and related data.
                </div>
                <a href={engine.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    background: engine.color,
                    color:"#fff",
                    border:"none",
                    borderRadius:8,
                    fontWeight:600,
                    fontSize:".98rem",
                    padding:"7px 18px",
                    textDecoration:"none",
                    display:"inline-block"
                  }}>USDA Programs</a>
              </>
            )}
          </div>
        ))}
      </div>
      <div style={{marginTop:13, fontSize:".93rem", color:"#888"}}>
        Tip: Try queries like: {DEFAULT_QUERIES.map(q=><span key={q} style={{marginRight:9}}><code>{q}</code></span>)}
      </div>
    </div>
  );
}