import { LatLngExpression, Icon, Point } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { type Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { api } from "../../utils/api";
// import SportPlaceButton from "./SportPlaceButton";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "react-daisyui";
import { useRouter } from "next/router";

type Props = {
  selectedSport: string;
  setSportPlaceId: (sportPlaceId: string) => void;
  setModalOpen: (showChat: boolean) => void;
};

const redIcon = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function AddSportPlaceMap({
  selectedSport,
  setSportPlaceId,
  setModalOpen,
}: Props) {
  const positionLeipzig = [51.3397, 12.3731] as LatLngExpression;
  const { data, status } = useSession();

  const toastOnCreation = (message: String) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Query Sport Places
  const positions = api.sportPlaces.getAllSportPlacesOf.useQuery({
    type: selectedSport,
  });

  const router = useRouter()

  const [position, setPosition] = useState(positionLeipzig);
  const markerRef = useRef<LeafletMarker<any> | null>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          marker.openPopup();
        }
      },
    }),
    []
  );
  const createSportPlaceMutation = api.sportPlaces.createSportPlace.useMutation(
    {
      onSuccess: () => {
        toastOnCreation("Created new sport place 👩‍🔧");
        router.reload()
      },
    }
  );

  function handleSubmit() {
    if (markerRef && markerRef.current) {
      const latLng = markerRef.current.getLatLng();
      createSportPlaceMutation.mutate({
        lat: latLng.lat,
        lon: latLng.lng,
        type: selectedSport,
      });
    }
  }

  return positions.data ? (
    <>
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
        {positions.data.map(({ id, lat, lon, checkIns, isObserved }) => {
          const checkIn = checkIns.find(
            (checkIn) => checkIn.userId === data?.user.id
          );

          return <Marker key={lat + lon} position={[lat, lon]} />;
        })}

        <Marker
          icon={redIcon}
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        >
          <Popup minWidth={90}>
            <Button
              className="btn-secondary"
              onClick={handleSubmit}
              disabled={
                createSportPlaceMutation.isLoading ||
                createSportPlaceMutation.isSuccess

              }
            >
              Submit
            </Button>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  ) : (
    <LoadingSpinner />
  );
}
