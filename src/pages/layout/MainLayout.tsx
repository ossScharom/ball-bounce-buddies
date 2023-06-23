import React from "react";
import Drawer from "react-daisyui";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const listItems = (
    <>
      <li className="text-xl">
        <a>Table Tennis</a>
      </li>
      <li className="text-xl">
        <a>Basketball</a>
      </li>
    </>
  );
  return (
    <div className="drawer h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar w-full bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn-ghost btn-square btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 text-2xl">
            🏀Ball⚽Bounce🏓Buddies🏐
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">{listItems}</ul>
          </div>
        </div>
        <div className="w-3/4 flex-grow my-10 m-auto bg-slate-700">
            {children}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu h-full w-80 bg-base-200 p-4">{listItems}</ul>
      </div>
    </div>
  );
}
