import { axiosInstance } from "@/lib";
import { TBallDetail, TStatus } from "@/types";
import { TBallsDetailsResponse } from "@/types/response";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "./loading";
import { useSocket } from "@/hooks/use-socket";
import SocketEvents from "@/lib/socket-events";

const NumberOfBalls = 10; // adjust on the basis of how many number of last ball you want to display

interface LastBallsProps {
  lastBalls: TBallDetail[] | null;
}

const LastBalls: React.FC<LastBallsProps> = ({ lastBalls }) => {
  return (
    <div className="p-2 border rounded-lg flex items-center gap-6 justify-between bg-gray-100">
      <p className="text-nowrap font-semibold">Last {NumberOfBalls} Balls</p>
      <ul className="flex items-center gap-2 overflow-scroll w-full no-scrollbar justify-end">
        {lastBalls && lastBalls.length > 0 ? (
          lastBalls.map((item) => (
            <li
              key={item._id}
              className="border rounded-sm px-1 text-sm bg-gray-200 border-gray-300"
            >
              {item.runs}
            </li>
          ))
        ) : (
          <li>No Record</li>
        )}
      </ul>
    </div>
  );
};

export default LastBalls;
