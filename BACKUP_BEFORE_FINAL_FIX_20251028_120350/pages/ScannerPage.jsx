import React from "react";
import Scanner from "../components/Scanner";

export default function ScannerPage() {
  return (
    <div>
      <Scanner
        onScanComplete={(data) => {
          console.log("Scan completed:", data);
          // Handle scan completion
        }}
      />
    </div>
  );
}