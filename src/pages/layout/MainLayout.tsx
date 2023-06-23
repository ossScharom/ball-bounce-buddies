import React from "react";
import Drawer from "react-daisyui";
import Navbar from "../../components/Navbar"
import Sports from "~/components/Sports";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="drawer h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar/>
        <div className="w-3/4 flex-grow my-10 m-auto bg-slate-700">
            {children}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <Sports className="menu h-full w-80 bg-base-200 p-4"/>
      </div>
    </div>
  );
}
