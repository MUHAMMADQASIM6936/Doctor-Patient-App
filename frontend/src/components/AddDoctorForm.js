import React, { useState } from "react";
import axios from "axios";
import DoctorMapLeaflet from "./DoctorMapLeaflet";

function AddDoctorForm() {
  const [form, setForm] = useState({ name: "", address: "" });
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) return alert("Please select a location on the map.");

    try {
      await axios.post("http://localhost:5000/api/doctors/add", {
        name: form.name,
        address: form.address,
        latitude: location.lat,
        longitude: location.lng,
      });
      setMessage("✅ Doctor added successfully");
      setForm({ name: "", address: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add doctor");
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#f9fafc",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      marginBottom: "25px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "10px 15px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      transition: "border-color 0.3s ease",
    },
    button: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    message: {
      marginTop: "15px",
      textAlign: "center",
      fontWeight: "500",
      color: "#28a745",
    },
    mapWrapper: {
      marginTop: "30px",
      height: "400px", // <-- Bigger map height
      width: "100%",
      borderRadius: "8px",
      overflow: "hidden",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Doctor Clinic</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          name="name"
          placeholder="Doctor Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          name="address"
          placeholder="Clinic Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Add Doctor
        </button>
      </form>

      <div style={styles.mapWrapper}>
        <DoctorMapLeaflet onLocationSelect={setLocation} />
      </div>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

export default AddDoctorForm;
