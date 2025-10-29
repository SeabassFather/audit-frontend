import React from "react";
import FacialRecognition from "../components/FacialRecognition";

export default function FacialRecognitionPage() {
  return (
    <div>
      <FacialRecognition
        onVerificationComplete={(data) => {
          console.log("Verification completed:", data);
          if (data.success) {
            alert("Identity verified successfully!");
          } else {
            alert("Identity verification failed. Please try again.");
          }
        }}
        mode="verification"
      />
    </div>
  );
}