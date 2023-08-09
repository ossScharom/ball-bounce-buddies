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
  // Mutations for SportPlaces
  const createCheckInMutation = api.checkIn.createCheckIn.useMutation({
    onSuccess: () => {
      toastOnCreation("🦄 Checked-in!");
      positions.refetch();
    },
  });

  const deactivateCheckInMutation = api.checkIn.deactivateCheckIn.useMutation({
    onSuccess: () => {
      toastOnCreation("🫏 Checked-out!");
      positions.refetch();
    },
  });

  const createObservationMutation =
    api.observation.createObservation.useMutation({
      onSuccess: () => {
        toastOnCreation("👀 Observing this item");
        positions.refetch();
      },
    });

  const deleteObservationMutation =
    api.observation.deleteObservation.useMutation({
      onSuccess: () => {
        toastOnCreation("🙈 Not observing this item");
        positions.refetch();
      },
    });

  // Button handlers
  const handleCheckIn = (sportPlaceId: string) => () => {
    createCheckInMutation.mutate({ sportPlaceId });
  };

  const handleCheckOut = (checkInId: string) => () => {
    deactivateCheckInMutation.mutate({ checkInId });
  };

  const handleObserve = (sportPlaceId: string) => () => {
    createObservationMutation.mutate({ sportPlaceId });
  };

  const handleUnObserve = (sportPlaceId: string) => () => {
    deleteObservationMutation.mutate({ sportPlaceId });
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
      {positions.data.map(({ id, lat, lon, checkIns, isObserved }) => {
        const checkIn = checkIns.find(
          (checkIn) => checkIn.userId === data?.user.id
        );

        return (
          <Marker key={lat + lon} position={[lat, lon]}>
            <Popup>
              <div className="flex flex-col">
                <TrafficLight checkInCount={checkIns.length} />
                {status !== "unauthenticated" && (
                  <div className="join flex-col gap-3">
                    {!!checkIn ? (
                      <SportPlaceButton
                        onClick={handleCheckOut(checkIn.id)}
                        text="Check-out"
                        className="btn-error"
                        loading={
                          deactivateCheckInMutation.isLoading
                        }
                        disabled={
                          positions.isRefetching ||
                          deactivateCheckInMutation.isLoading
                        }
                      />
                    ) : (
                      <SportPlaceButton
                        onClick={handleCheckIn(id)}
                        loading={createCheckInMutation.isLoading}
                        disabled={
                          positions.isRefetching ||
                          createCheckInMutation.isLoading
                        }
                        text="Check-in"
                      />
                    )}
                    {isObserved ? (
                      <SportPlaceButton
                        onClick={handleUnObserve(id)}
                        text="Unobserve"
                        className="btn-error"
                        loading={
                          deleteObservationMutation.isLoading
                        }
                        disabled={
                          positions.isRefetching ||
                          deleteObservationMutation.isLoading
                        }
                      />
                    ) : (
                      <SportPlaceButton
                        onClick={handleObserve(id)}
                        text="Observe"
                        loading={
                          createObservationMutation.isLoading
                        }
                        disabled={
                          positions.isRefetching ||
                          createObservationMutation.isLoading
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  ) : (
    <LoadingSpinner />
  );
}
