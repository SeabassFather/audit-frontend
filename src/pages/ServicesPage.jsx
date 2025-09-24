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
          <a href="#" style={headerLink}>Services</a>
          <a href="#" style={headerLink}>Cases</a>
          <a href="#" style={headerLink}>About</a>
        </nav>
      </header>
      <main>
        <h1>Services</h1>
        <p>Welcome to the services page!</p>
      </main>
    </div>
  );
}