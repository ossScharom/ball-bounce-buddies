import React from "react";
import SingleLight from "./SingleLight";

type Props = { checkInCount: number };

export default function TrafficLight({ checkInCount }: Props) {
  const red = 2 <= checkInCount
  const yellow = 1 <=checkInCount && checkInCount<2
  const green = checkInCount==0
  return (
    <div className="flex justify-center p-2">
      <span className="flex flex-col gap-0.5 rounded-sm bg-black p-1">
        <SingleLight color="red" toggled={!green && !yellow && red} />
        <SingleLight color="yellow" toggled={!green && yellow && !red} />
        <SingleLight color="green" toggled={green && !yellow && !red} />
      </span>
    </div>
  );
}
