import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function LocationSelector({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

function DoctorMapLeaflet({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  const handleSelect = (latlng) => {
    setPosition(latlng);
    onLocationSelect({ lat: latlng.lat, lng: latlng.lng });
  };

  return (
    <MapContainer
      center={[31.5204, 74.3587]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationSelector onSelect={handleSelect} />
      {position && <Marker position={position} />}
    </MapContainer>
  );
}

export default DoctorMapLeaflet;
