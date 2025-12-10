import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView() {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      <MapContainer
        center={[28.6139, 77.2090]} // Delhi coordinates
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        <Marker position={[28.6139, 77.2090]}>
          <Popup>Delhi — Sample Marker</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
