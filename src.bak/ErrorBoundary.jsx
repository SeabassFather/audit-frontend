import React from "react";
export default class ErrorBoundary extends React.Component{
  constructor(p){ super(p); this.state={err:null}; }
  static getDerivedStateFromError(err){ return {err}; }
  componentDidCatch(err,info){ console.error("App crash:", err, info); }
  render(){
    if(this.state.err){ return (
      <div style={{padding:24,fontFamily:"system-ui"}}>
        <h2>Something broke rendering the UI.</h2>
        <pre style={{whiteSpace:"pre-wrap",opacity:.8}}>
{String(this.state.err?.message||this.state.err)}
        </pre>
      </div>
    );}
    return this.props.children;
  }
}