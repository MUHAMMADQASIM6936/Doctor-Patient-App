const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  address: String,
  location: {
    type: {
      type: String, // GeoJSON type
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
});

// ✅ Required for $near, $geoWithin, etc.
doctorSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Doctor", doctorSchema);
