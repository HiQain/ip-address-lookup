import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icon in leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface MapProps {
  center: [number, number];
  zoom?: number;
  label?: string;
}

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function Map({ center, zoom = 13, label = 'Location' }: MapProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-inner border border-white/5 bg-neutral-900">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={center}>
          <Popup>
            {label}
          </Popup>
        </Marker>
        <RecenterMap center={center} />
      </MapContainer>
      <style>{`
        .leaflet-container {
          background: #0f172a;
        }
      `}</style>
    </div>
  );
}
