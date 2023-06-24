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
    <div className="p-3 grid grid-flow-row grid-cols-3 min-h-fit w-full bg-base-300">
      <div className="text-2xl self-center">Ball Bounce Buddies</div>
      <SportButtons
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
      />

      {status !== "unauthenticated" && data ? (
        <UserProfileIcon userSessionData={data} />
      ) : (
        <Signin />
      )}
    </div>
  );
}
