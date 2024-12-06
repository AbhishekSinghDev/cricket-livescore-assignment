import React from "react";
import AdminControls from "./admin-controls";
import ScoreBoard from "@/components/shared/score-board";
import { cookies } from "next/headers";
import { getServerAuthStatus } from "@/utils";
import Navbar from "@/components/shared/navbar";
import { redirect } from "next/navigation";

const page = async () => {
  const cookieStore = await cookies();
  const isAuth = getServerAuthStatus(cookieStore);

  if (!isAuth) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <Navbar />
      <div className="flex flex-col flex-wrap lg:grid lg:grid-cols-3 gap-3">
        <AdminControls />
        <ScoreBoard />
      </div>
    </div>
  );
};

export default page;
