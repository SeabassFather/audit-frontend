import React from "react";
export default class ErrorBoundary extends React.Component {
  constructor(p){ super(p); this.state={hasError:false,err:null}; }
  static getDerivedStateFromError(err){ return {hasError:true, err}; }
  componentDidCatch(err,info){ console.error(err,info); }
  render(){ return this.state.hasError ? <div className='card'><h2>Something went wrong.</h2><pre>{String(this.state.err)}</pre></div> : this.props.children; }
}