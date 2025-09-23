import React from "react";
export default class ErrorBoundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="max-w-3xl mx-auto p-6 text-red-700">
          <h2 className="text-xl font-semibold">Something went wrong.</h2>
          <pre className="mt-3 bg-red-50 border p-3 rounded">
            {String(this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
