import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

const RenderMap = (props) => {
  // Zoom in on marker
  const SetView = ({ coords }) => {
    const map = useMap();
    map.setView(coords);
    return null;
  };

  // Render actual map
  return (
    <div>
      <MapContainer
        center={[props.latitude, props.longitude]}
        zoom={17}
        scrollWheelZoom={false}
        style={{ height: '300px', zIndex: '10' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGtnbnAiLCJhIjoiY2trb3YxbTl6MDAyMjJxanExYTNwZjZ6YiJ9.gPU5MhHFseHNRjeex2poNg"
        />
        <Marker position={[props.latitude, props.longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <SetView coords={[props.latitude, props.longitude]} />
      </MapContainer>
    </div>
  );
};
export default RenderMap;
