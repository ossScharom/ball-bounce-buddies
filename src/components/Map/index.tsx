import { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Button, Card, Divider } from "react-daisyui";
import TrafficLight from "../TrafficLight";
import { api } from "../../utils/api";
import CheckInButton from "./CheckInButton";
import ObserveButton from "./ObserveButton";

type Props = {selectedSport: string};

export default function Map({selectedSport}: Props) {
  const positionLeipzig = [51.3397, 12.3731] as LatLngExpression;
  const positions = api.sportPlaces.getAllSportPlacesOf.useQuery({
    type: selectedSport,
  });
  return (
    // {positions.data?}
    <MapContainer
      className="h-full"
      center={positionLeipzig}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions.data?.map(({ id, lat, lon }) => (
        <Marker key={lat+lon} position={[lat, lon]}>
          <Popup>
            <div className="flex flex-col">
              <TrafficLight />
              <div className="flex flex-col p-3">
                <span className="font-bold">Address:</span>
                <span>Fun boulevard 6</span>
              </div>
              <div className="join flex-col gap-3">
                <CheckInButton sportPlaceId={id}/>
                <ObserveButton sportPlaceId={id}/>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
