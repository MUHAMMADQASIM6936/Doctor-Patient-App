const Doctor = require("../models/Doctor");

// Add doctor
const addDoctor = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const doctor = new Doctor({
      name,
      address,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    await doctor.save();
    res.status(201).json({ message: "Doctor added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const searchDoctors = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: "Invalid coordinates" });
    }

    const doctors = await Doctor.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $minDistance: 0,
          $maxDistance: 5000,
        },
      },
    });

    res.json(doctors);
  } catch (err) {
    console.error("Geo query failed:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addDoctor,
  searchDoctors,
};
