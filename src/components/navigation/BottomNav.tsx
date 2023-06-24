import React, { Dispatch, SetStateAction } from "react";
import { BottomNavigation } from "react-daisyui";
import BottomNavButton from "./BottomNavButton";

type Props = {
  setSelectedSport: Dispatch<SetStateAction<string>>;
  selectedSport: string;
};

export default function BottomNav({ setSelectedSport, selectedSport }: Props) {
  return (
    <div className="btm-nav relative">
      <BottomNavButton
        value="BASKETBALL"
        setSelectedSport={setSelectedSport}
        selectedSport={selectedSport}
      >
        🏀
      </BottomNavButton>
      <BottomNavButton
        value="VOLLEYBALL"
        setSelectedSport={setSelectedSport}
        selectedSport={selectedSport}
      >
        🏐
      </BottomNavButton>
      <BottomNavButton
        value="TABLE_TENNIS"
        setSelectedSport={setSelectedSport}
        selectedSport={selectedSport}
      >
        🏓
      </BottomNavButton>
    </div>
  );
}
