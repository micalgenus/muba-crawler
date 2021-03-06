const mongoose = require("mongoose");

// Define Schemes
const urlSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    referer: { type: String }
  },
  {
    timestamps: true,
    collection: "url"
  }
);

// Create Model & Export
module.exports = mongoose.model("url", urlSchema);
