import React from "react";

const headerLink = {
  color: "#333",
  textDecoration: "none",
  margin: "0 10px",
};

export default function ServicesPage() {
  return (
    <div>
      <header>
        <nav>
          <button style={headerLink}>Services</button>
          <button style={headerLink}>Cases</button>
          <button style={headerLink}>About</button>
        </nav>
      </header>
      <main>
        <h1>Services</h1>
        <p>Welcome to the services page!</p>
      </main>
    </div>
  );
}