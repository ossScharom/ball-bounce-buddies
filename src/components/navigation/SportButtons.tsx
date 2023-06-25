import React, { Dispatch } from "react";
import SportButton from "./SportButton";
import type { Props } from "./TopNav";

export default function SportButtons({
  setSelectedSport,
  selectedSport,
}: Props) {
  return (
    <div className="join">
      <SportButton
        value="BASKETBALL"
        setSelectedSport={setSelectedSport}
        selectedSport={selectedSport}
      >
        🏀
      </SportButton>
      <SportButton
        value="VOLLEYBALL"
        setSelectedSport={setSelectedSport}
        selectedSport={selectedSport}
      >
        🏐
      </SportButton>
      <SportButton
        value="TABLE_TENNIS"
        setSelectedSport={setSelectedSport}
        selectedSport={selectedSport}
      >
        🏓
      </SportButton>
    </div>
  );
}
