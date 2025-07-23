import React from "react";
import SearchDoctors from "./components/SearchDoctors";
import AddDoctorForm from "./components/AddDoctorForm";

function App() {
  const styles = {
    appContainer: {
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: "#f0f2f5",
      minHeight: "100vh",
      padding: "30px 15px",
    },
    heading: {
      textAlign: "center",
      fontSize: "2.5rem",
      color: "#2c3e50",
      marginBottom: "40px",
    },
    sectionDivider: {
      margin: "40px auto",
      height: "2px",
      backgroundColor: "#ccc",
      width: "80%",
      borderRadius: "1px",
    },
  };

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.heading}>Doctor Finder</h1>
      <AddDoctorForm />
      <div style={styles.sectionDivider}></div>
      <SearchDoctors />
    </div>
  );
}

export default App;
