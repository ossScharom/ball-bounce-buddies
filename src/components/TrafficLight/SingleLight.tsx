import classNames from "classnames";
import React from "react";

type Props = {
  color: "red" | "yellow" | "green";
  toggled?: boolean;
};
const colorMapping = {
  red: classNames("bg-red-600"),
  yellow: classNames("bg-yellow-500"),
  green: classNames("bg-green-800"),
};

export default function SingleLight({ color, toggled = false }: Props) {
  return (
    <span
      className={classNames('h-4 w-4 rounded-lg', {
        [colorMapping[color]]: toggled,
        "bg-gray-500": !toggled,
      })}
    ></span>
  );
}
