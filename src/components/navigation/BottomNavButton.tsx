import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

type Props = {
  iconDef: IconDefinition;
  active: boolean;
  onClick: () => void;
};

export default function BottomNavButton({ iconDef, active, onClick }: Props) {
  return (
    <button onClick={onClick} className={classNames({ active: active })}>
      <FontAwesomeIcon className="text-3xl" icon={iconDef} />
    </button>
  );
}
