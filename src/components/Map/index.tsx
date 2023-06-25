import { LatLngExpression } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { api } from "../../utils/api";
import TrafficLight from "../TrafficLight";
import SportPlaceButton from "./SportPlaceButton";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

type Props = { selectedSport: string };

export default function Map({ selectedSport }: Props) {
  const positionLeipzig = [51.3397, 12.3731] as LatLngExpression;
  const { data, status } = useSession();

  // Query Sport Places
  const positions = api.sportPlaces.getAllSportPlacesOf.useQuery({
    type: selectedSport,
  });
  // Mutations for SportPlaces
  const createCheckInMutation = api.checkIn.createCheckIn.useMutation({
    onSuccess: () => {
      toast.success("🦄 Checked-in!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      positions.refetch();
    },
  });

  // Button handlers
  const handleCheckIn = (sportPlaceId: string) => () => {
    createCheckInMutation.mutate({ sportPlaceId });
  };

  const handleObserve = () => {
    console.log("Not implemented yet");
  };

  return positions.data ? (
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
      {positions.data.map(({ id, lat, lon, checkIns }) => (
        <Marker key={lat + lon} position={[lat, lon]}>
          <Popup>
            <div className="flex flex-col">
              <TrafficLight checkInCount={checkIns.length} />
              {status !== "unauthenticated" && (
                <div className="join flex-col gap-3">
                  <SportPlaceButton
                    onClick={handleCheckIn(id)}
                    loading={createCheckInMutation.isLoading}
                    disabled={
                      positions.isRefetching ||
                      createCheckInMutation.isLoading ||
                      !!checkIns.find(
                        (checkIn) => checkIn.userId === data?.user.id
                      )
                    }
                    text="Check-in"
                  />
                  <SportPlaceButton onClick={handleObserve} text="Observe" />
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : (
    <LoadingSpinner />
  );
}
