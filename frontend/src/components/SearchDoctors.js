import React, { useState } from "react";
import axios from "axios";

function SearchDoctors() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [locationText, setLocationText] = useState("");
  const [doctors, setDoctors] = useState([]);

  const handleSearch = async () => {
    try {
      const geoRes = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: locationText,
            format: "json",
            countrycodes: "pk",
            limit: 1,
          },
        }
      );

      const { lat, lon } = geoRes.data[0];
      setLat(lat);
      setLng(lon);

      const res = await axios.get(
        `http://localhost:5000/api/doctors/search?lat=${lat}&lng=${lon}`
      );

      setDoctors(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#f5f5f5",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', sans-serif",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginBottom: "20px",
    },
    input: {
      padding: "10px 15px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "16px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    doctorList: {
      listStyle: "none",
      padding: "0",
    },
    doctorItem: {
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Search Nearby Doctors
      </h2>
      <div style={styles.inputGroup}>
        <input
          style={styles.input}
          placeholder="Search Location (e.g. Lahore, Islamabad)"
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Latitude (optional)"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Longitude (optional)"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
        />
        <button
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <ul style={styles.doctorList}>
        {doctors.map((doc) => (
          <li key={doc._id} style={styles.doctorItem}>
            <strong>{doc.name}</strong>
            <br />
            <span>{doc.address}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchDoctors;
