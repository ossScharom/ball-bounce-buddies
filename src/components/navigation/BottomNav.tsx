import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faClockRotateLeft,
  faBinoculars,
} from "@fortawesome/free-solid-svg-icons";
import BottomNavButton from "./BottomNavButton";
import { Page } from "~/pages";
type Props = {
  setSelectedPage: Dispatch<SetStateAction<Page>>;
  selectedPage: Page;
};

export default function BottomNav({ setSelectedPage, selectedPage }: Props) {
  return (
    <div className="btm-nav relative">
      <BottomNavButton
        iconDef={faMapLocationDot}
        active={selectedPage === Page.MAP}
        onClick={()=>setSelectedPage(Page.MAP)}
      />
      <BottomNavButton
        iconDef={faBinoculars}
        active={selectedPage === Page.OBSERVE}
        onClick={()=>setSelectedPage(Page.OBSERVE)}
      />
      <BottomNavButton
        iconDef={faClockRotateLeft}
        active={selectedPage === Page.CHECK_IN_HISTORY}
        onClick={()=>setSelectedPage(Page.CHECK_IN_HISTORY)}
      />
    </div>
  );
}
