import React from "react";
export default class ErrorBoundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = { hasError: false, err: null };
  }
  static getDerivedStateFromError(err) {
    return { hasError: true, err };
  }
  componentDidCatch(err, info) {
    console.error("UI error:", err, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          className="card"
          style={{ padding: 18, borderColor: "#fecaca", background: "#fff1f2" }}
        >
          <div style={{ fontWeight: 800, color: "#991b1b" }}>
            Something went wrong
          </div>
          <div style={{ color: "#7f1d1d", marginTop: 6, fontSize: 13 }}>
            {String(this.state.err?.message || "Unknown error")}
          </div>
          <button
            className="btn"
            style={{ marginTop: 10 }}
            onClick={() => location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
