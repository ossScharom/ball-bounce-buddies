import React, { Dispatch, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import Signin from "../auth/Signin";
import UserProfileIcon from "../UserProfileIcon";
import SportButtons from "./SportButtons";

export type Props = {
  setSelectedSport: Dispatch<SetStateAction<string>>;
  selectedSport: string;
};

export default function Navbar({ setSelectedSport, selectedSport }: Props) {
  const { data, status } = useSession();
  return (
    <div className="flex min-h-fit w-full flex-wrap justify-around sm:justify-normal items-center gap-y-2 bg-base-300 p-3">
      <div className="basis-1/3">
        <h1 className="text-2xl whitespace-nowrap">Ball Bounce Buddies</h1>
      </div>
      <div className="flex basis-1/3 justify-center">
        <SportButtons
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
        />
      </div>

      <div className="flex basis-1/3 justify-center sm:justify-end">
        {status !== "unauthenticated" && data ? (
          <UserProfileIcon userSessionData={data} />
        ) : (
          <Signin />
        )}
      </div>
    </div>
  );
}
