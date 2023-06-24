import classNames from "classnames";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  children: React.ReactNode;
  value: string;
  setSelectedSport: Dispatch<SetStateAction<string>>;
  selectedSport: string;
};

export default function SportButton({
  children,
  value,
  setSelectedSport,
  selectedSport,
}: Props) {
  return (
    <button
      onClick={() => setSelectedSport(value)}
      className={classNames("btn w-1/3 min-w-fit join-item text-3xl text-primary", {
        'btn-primary': selectedSport === value,
        'btn-neutral': selectedSport !== value
      })}
    >
      {children}
    </button>
  );
}
