import { useSession } from "next-auth/react";
import MainLayout from "./layout/MainLayout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import CheckInHistory from "~/components/CheckInHistory";
import Observations from "~/components/Observations";
import Chat from "~/components/Chat";
import classNames from "classnames";

export const LazyMap = dynamic(import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: "center", paddingTop: 20 }}>Loading…</div>
  ),
});

export enum Page {
  MAP,
  OBSERVATIONS,
  CHECK_IN_HISTORY,
}

export default function Home() {
  const router = useRouter();
  const [selectedSport, setSelectedSport] = useState("TABLE_TENNIS");
  const [selectedPage, setSelectedPage] = useState(Page.MAP);

  const [sportPlaceId, setSportPlaceId] = useState<string>();
  const [showChat, setShowChat] = useState(false);

  const wrapperSetSportPlaceId = useCallback(
    (sportPlaceId: string) => {
      setSportPlaceId(sportPlaceId);
    },
    [setSportPlaceId]
  );

  const wrapperToggleChatOpen = useCallback((showChat: boolean) => {
    setShowChat(showChat);
  }, [setShowChat]);

  let pageToRender;
  switch (selectedPage) {
    case Page.MAP:
      pageToRender = (
        <LazyMap
          selectedSport={selectedSport}
          setSportPlaceId={wrapperSetSportPlaceId}
          setModalOpen={wrapperToggleChatOpen}
        />
      );
      break;
    case Page.OBSERVATIONS:
      pageToRender = (
        <Observations
          selectedSport={selectedSport}
          setSportPlaceId={wrapperSetSportPlaceId}
          setModalOpen={wrapperToggleChatOpen}
        />
      );
      break;
    case Page.CHECK_IN_HISTORY:
      pageToRender = (
        <CheckInHistory
          selectedSport={selectedSport}
          setSportPlaceId={wrapperSetSportPlaceId}
          setModalOpen={wrapperToggleChatOpen}
        />
      );
      break;
  }
  return (
    <MainLayout
      setSelectedSport={setSelectedSport}
      selectedSport={selectedSport}
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
    >
      <div className="flex h-full w-full justify-around ">
        <div
          className={classNames("h-full transition-all", {
            "w-2/3": showChat,
            "w-full": !showChat,
          })}
        >
          {pageToRender}
        </div>
        {showChat && (
          <Chat
            sportPlaceId={sportPlaceId}
            handleCloseChat={wrapperToggleChatOpen}
          />
        )}
      </div>
    </MainLayout>
  );
}
