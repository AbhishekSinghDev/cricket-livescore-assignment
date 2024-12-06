"use client";

import React from "react";
import ControlButton from "@/components/shared/control-button";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { axiosInstance } from "@/lib";
import { getAccessToken } from "@/utils";

const AdminControls = () => {
  const searchParams = useSearchParams();
  const matchId = searchParams.get("matchId");

  const handleUpdateScore = async (
    runs: number,
    extras?: number,
    wicket?: boolean,
    wicketType?: string
  ) => {
    if (!matchId) {
      toast.error("match id not provided in params");
      return;
    }

    try {
      const body = {
        matchId: matchId,
        runs: runs,
        extras: extras,
        wicket: wicket,
        wicketType: wicketType,
      };

      const accessToken = getAccessToken();

      const { data } = await axiosInstance.post(
        "/match/update-ball-details",
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("failed to update score");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      {/* First Row */}
      <div className="flex flex-col md:flex-row items-center gap-2">
        <div className="grid grid-rows-3 gap-2">
          <ControlButton
            text="Ball Start"
            className="bg-green-700 py-[37px] px-16"
          />
          <ControlButton
            text="Wide"
            className="bg-orange-600 py-[37px] px-16"
          />
          <ControlButton
            text="No Ball"
            className="bg-blue-950 py-[37px] px-16"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
          <ControlButton
            onClick={() => {
              handleUpdateScore(0);
            }}
            text="0"
            className="bg-blue-500 w-full py-16"
          />
          <ControlButton
            onClick={() => {
              handleUpdateScore(1);
            }}
            text="1"
            className="bg-blue-900 w-full py-16"
          />
          <ControlButton
            onClick={() => {
              handleUpdateScore(0, 0, true);
            }}
            text="Wicket"
            className="bg-red-500 w-full py-16"
          />
          <ControlButton
            onClick={() => {
              handleUpdateScore(2);
            }}
            text="2"
            className="bg-teal-500 w-full py-16"
          />
          <ControlButton
            onClick={() => {
              handleUpdateScore(4);
            }}
            text="4"
            className="bg-teal-300 w-full py-16"
          />
          <ControlButton
            onClick={() => {
              handleUpdateScore(6);
            }}
            text="6"
            className="bg-gray-500 w-full py-16"
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        <ControlButton
          text="Bolwer Stop"
          className="bg-violet-800 w-full py-9"
        />
        <ControlButton text="1 or 2" className="bg-blue-700 w-full py-9" />
        <ControlButton text="2 or 4" className="bg-violet-800 w-full py-9" />
        <ControlButton text="4 or 6" className="bg-orange-800 w-full py-9" />
        <ControlButton
          text="Ball In Air"
          className="bg-violet-800 w-full py-9"
        />
        <ControlButton text="Others" className="bg-blue-950 w-full py-9" />
        <ControlButton text="3" className="bg-violet-800 w-full py-9" />
        <ControlButton
          text="Boundary Check"
          className="bg-blue-950 w-full py-9"
        />
        <ControlButton text="Appeal" className="bg-gray-500 w-full py-9" />
        <ControlButton text="Catch Drop" className="bg-blue-950 w-full py-9" />
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        <ControlButton text="Leg Bye" className="bg-cyan-400 w-full py-9" />
        <ControlButton text="Bye" className="bg-green-600 w-full py-9" />
        <ControlButton
          text="Third Umpire"
          className="bg-gray-500 w-full py-9"
        />
        <ControlButton text="Review" className="bg-red-700 w-full py-9" />
        <ControlButton text="Done" className="bg-green-800 w-full py-9" />
        <ControlButton text="Misfield" className="bg-blue-950 w-full py-9" />
        <ControlButton text="Overthrow" className="bg-violet-600 w-full py-9" />
        <ControlButton text="Wicket" className="bg-red-700 w-full py-9" />
      </div>
    </div>
  );
};

export default AdminControls;
