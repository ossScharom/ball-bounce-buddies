import React from "react";
import { api } from "~/utils/api";
import LoadingSpinner from "./LoadingSpinner";
import { Table } from "react-daisyui";

type Props = {
  selectedSport: string;
  setSportPlaceId: (sportPlaceId: string) => void;
  setModalOpen: (showChat: boolean) => void;
};

export default function CheckInHistory({ selectedSport }: Props) {
  const queryCheckInHistory = api.checkIn.checkInHistory.useQuery({
    selectedSport,
  });
  return queryCheckInHistory.data ? (
    <Table zebra>
      <Table.Head>
        <span />
        <span>lon</span>
        <span>lat</span>
      </Table.Head>
      <Table.Body>
        {queryCheckInHistory.data.map(
          ({ sportPlace }, idx) =>
            sportPlace && (
              <Table.Row>
                <span>{idx}</span>
                <span>{sportPlace.lon}</span>
                <span>{sportPlace.lat}</span>
              </Table.Row>
            )
        )}
      </Table.Body>
    </Table>
  ) : (
    <LoadingSpinner />
  );
}
