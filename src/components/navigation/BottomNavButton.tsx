import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  children: React.ReactNode;
  value: string;
  setSelectedSport: Dispatch<SetStateAction<string>>;
  selectedSport: string;
};

export default function BottomNavButton({
  children,
  value,
  setSelectedSport,
  selectedSport,
}: Props) {
  return (
    <button
      onClick={() => setSelectedSport(value)}
      className={classNames("p-2 text-3xl text-primary", {
        active: selectedSport === value,
      })}
    >
      {children}
    </button>
  );
}
