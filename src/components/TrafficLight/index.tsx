import React from "react";
import SingleLight from "./SingleLight";

type Props = {};

export default function TrafficLight({}: Props) {
  return (
    <div className="flex justify-center p-2">
      <span className="flex flex-col p-1 gap-0.5 rounded-sm bg-black">
        <SingleLight color="red" toggled />
        <SingleLight color="yellow" toggled />
        <SingleLight color="green" toggled />
      </span>
    </div>
  );
}
