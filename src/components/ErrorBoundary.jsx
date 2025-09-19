import React from "react";
export default class ErrorBoundary extends React.Component{
  constructor(p){ super(p); this.state={err:null,info:null}; }
  static getDerivedStateFromError(err){ return {err}; }
  componentDidCatch(err,info){ this.setState({info}); console.error("UI error:", err, info); }
  render(){
    if(this.state.err){
      return (
        <div style={{padding:"16px"}}>
          <div style={{color:"#dc2626", fontWeight:700, marginBottom:8}}>Runtime error</div>
          <pre style={{whiteSpace:"pre-wrap"}}>{String(this.state.err)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}