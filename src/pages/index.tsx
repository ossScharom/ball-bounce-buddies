import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import MainLayout from "./layout/MainLayout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import CheckInHistory from "~/components/CheckInHistory";
import Observe from "~/components/Observe";

export const LazyMap = dynamic(import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: "center", paddingTop: 20 }}>Loading…</div>
  ),
});

export enum Page{
  MAP,
  OBSERVE,
  CHECK_IN_HISTORY
}

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedSport, setSelectedSport] = useState("TABLE_TENNIS");
  const [selectedPage, setSelectedPage] = useState(Page.MAP);

  let pageToRender
  switch(selectedPage){
    case Page.MAP:
      pageToRender = <LazyMap selectedSport={selectedSport} />
      break;
    case Page.OBSERVE:
      pageToRender = <Observe/>
      break
    case Page.CHECK_IN_HISTORY:
      pageToRender = <CheckInHistory/>
      break;
  }
  return (
    <MainLayout
      setSelectedSport={setSelectedSport}
      selectedSport={selectedSport}
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
    >
      {pageToRender}
    </MainLayout>
  );
}
