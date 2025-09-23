import React from "react";
import FileUpload from "../components/FileUpload";
import { endpoints } from "../utils/api";
export default function WaterTechUploads(){
  return (
    <div className="p-4">
      <h2 className="h2">Water Technology  Reports & Tests</h2>
      <div className="grid">
        <FileUpload label="Upload Water Quality Report" accept=".pdf,.png,.jpg" endpoint={endpoints.uploadWater()} />
        <FileUpload label="Upload Irrigation Test" accept=".pdf,.png,.jpg" endpoint={endpoints.uploadWater()} />
        <FileUpload label="Upload Other Evidence" accept=".pdf,.png,.jpg" endpoint={endpoints.uploadWater()} />
      </div>
    </div>
  );
}