import React, { Dispatch, SetStateAction } from "react";
import {
  faMapLocationDot,
  faClockRotateLeft,
  faBinoculars,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import BottomNavButton from "./BottomNavButton";
import { Page } from "~/pages";
import { useSession } from "next-auth/react";
type Props = {
  setSelectedPage: Dispatch<SetStateAction<Page>>;
  selectedPage: Page;
};

export default function BottomNav({ setSelectedPage, selectedPage }: Props) {
  const { data, status } = useSession();
  return (
    <div className="btm-nav relative">
      <BottomNavButton
        iconDef={faMapLocationDot}
        active={selectedPage === Page.MAP}
        onClick={() => setSelectedPage(Page.MAP)}
      />
      {status !== "unauthenticated" && (
        <>
          <BottomNavButton
            iconDef={faSquarePlus}
            active={selectedPage === Page.ADD_SPORT_PLACE}
            onClick={() => setSelectedPage(Page.ADD_SPORT_PLACE)}
          />
          <BottomNavButton
            iconDef={faBinoculars}
            active={selectedPage === Page.OBSERVATIONS}
            onClick={() => setSelectedPage(Page.OBSERVATIONS)}
          />
          <BottomNavButton
            iconDef={faClockRotateLeft}
            active={selectedPage === Page.CHECK_IN_HISTORY}
            onClick={() => setSelectedPage(Page.CHECK_IN_HISTORY)}
          />
        </>
      )}
    </div>
  );
}
