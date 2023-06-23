import { LatLngExpression } from 'leaflet'
import React from 'react'
import { MapContainer , Marker, Popup, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { Button, Card, Divider } from 'react-daisyui';
import TrafficLight from './TrafficLight';

type Props = {}

export default function Map({}: Props) {
    const position = [51.3397,12.3731] as LatLngExpression
    return (
        <MapContainer className="h-full" center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            <Popup>
                <div className='flex flex-col'>
                    <TrafficLight/>
                    <div className='flex flex-col p-3'>
                        <span className='font-bold'>Address:</span>
                        <span>Fun boulevard 6</span>
                    </div>
                    <div className='join flex-col gap-3'>
                        <Button className='w-full btn-sm btn-primary'>Check-in</Button>
                        <Button className='w-full btn-sm btn-primary'>Observe</Button>
                    </div>
                </div>
            </Popup>
            </Marker>
        </MapContainer>
    )
}