"use client";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { useGlobalState } from "@/app/context/globalProvider";
import Lowkers from "@/app/Components/Lowkers/Lowkers";

function page() {
  const { userId } = auth();
  const { completedLowkers } = useGlobalState();

  return <Lowkers title="All Resource" lowkers={completedLowkers} isLogin={userId ? true : false}/>;
}

export default page;