import React from "react";
import { useParams, Link } from "react-router-dom";
import Page from "../ui/Page";
import Card from "../ui/Card";
import serviceTree from "../data/serviceTree";

export default function Category(){
  const { slug } = useParams();
  const cat = serviceTree.find(c => c.key === slug);
  if (!cat) return <Page title="Not found"><div className="small-muted">Unknown category.</div></Page>;
  return (
    <Page title={cat.title} subtitle={cat.description}>
      <Card title="Modules & Services">
        <ul className="ticker-list">
          {(cat.services||[]).map(s=>(
            <li key={s.key}>
              <span>{s.title}</span>
              <Link to={s.route} className="btn" style={{padding:"6px 10px"}}>Open</Link>
            </li>
          ))}
        </ul>
      </Card>
    </Page>
  );
}