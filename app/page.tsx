"use client";
import Lowkers from "./Components/Lowkers/Lowkers";
import { useGlobalState } from "./context/globalProvider";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { lowkers } = useGlobalState();
  const { isSignedIn } = useUser();
  return (
    <main className="">
      <Lowkers title="All Lowker" lowkers={lowkers} isLogin={isSignedIn ? true : false}></Lowkers>
    </main>
  );
}
