import React, { Dispatch, SetStateAction } from "react";
import Drawer from "react-daisyui";
import Sports from "~/components/Sports";
import BottomNav from "~/components/navigation/BottomNav";
import TopNav from "~/components/navigation/TopNav";
import { Page } from "..";

type Props = {
  setSelectedSport: Dispatch<SetStateAction<string>>;
  selectedSport: string;
  setSelectedPage: Dispatch<SetStateAction<Page>>;
  selectedPage: Page;
  children: React.ReactNode;
};

export default function MainLayout({ children, selectedSport, setSelectedSport, selectedPage, setSelectedPage }: Props) {
  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-between">
        <TopNav setSelectedSport={setSelectedSport} selectedSport={selectedSport}/>
        <div className="w-3/4 h-full mx-auto bg-slate-700">
            {children}
        </div>
        <BottomNav setSelectedPage={setSelectedPage} selectedPage={selectedPage}/>
    </div>
  );
}
