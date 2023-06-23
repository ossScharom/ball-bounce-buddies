import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import MainLayout from "./layout/MainLayout";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

export const LazyMap = dynamic(import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div style={{ textAlign: "center", paddingTop: 20 }}>Loading…</div>
  ),
});

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <MainLayout>
      <LazyMap />
    </MainLayout>
  );
}