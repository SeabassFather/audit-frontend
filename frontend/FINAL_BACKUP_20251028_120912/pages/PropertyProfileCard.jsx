import React, { useEffect, useState } from "react";
import { fetchPropertyProfile } from "../api/propertyProfile";

export default function PropertyProfileCard({ property }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchPropertyProfile(property.address).then(setProfile);
  }, [property]);

  if (!profile) return <div>Loading property profile...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 my-8 border">
      <h3 className="text-lg font-bold mb-2">Property Profile</h3>
      <div>Owner: {profile.owner}</div>
      <div>Assessed Value: ${profile.assessedValue}</div>
      <div>Property Tax: ${profile.propertyTax}</div>
      <div>Last Mortgage: ${profile.lastMortgageAmount} ({profile.lastMortgageDate})</div>
      {/* Add more fields as available */}
    </div>
  );
}