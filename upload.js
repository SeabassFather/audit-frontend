import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  property: String,
  region: String,
  lab: String,
  testDate: Date,
  certification: String,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Upload", uploadSchema);
