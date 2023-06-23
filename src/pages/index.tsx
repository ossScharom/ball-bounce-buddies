import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import MainLayout from "./layout/MainLayout";
import dynamic from "next/dynamic"

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const Map = dynamic(() => import("./components/Map"), {
    ssr: false
  });


  return (
    <MainLayout>
      <Map/>
    </MainLayout>
  );
}
