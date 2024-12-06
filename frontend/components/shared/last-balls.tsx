import { axiosInstance } from "@/lib";
import { TStatus } from "@/types";
import { TBallsDetailsResponse } from "@/types/response";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "./loading";

const NumberOfBalls = 10; // adjust on the basis of how many number of last ball you want to display

const LastBalls = () => {
  const [status, setStatus] = useState<TStatus>("idle");
  const [lastBallsDetails, setLastBallsDetails] =
    useState<TBallsDetailsResponse<true> | null>(null);

  useEffect(() => {
    const fetchBallDetails = async () => {
      try {
        const { data } = await axiosInstance.post("/match/last-balls", {
          balls: NumberOfBalls,
        });

        if (data.success) {
          const successResponse = data as TBallsDetailsResponse<true>;
          setLastBallsDetails(successResponse);
          return;
        } else {
          setStatus("error");
        }

        toast.error(`failed to fetch last ${NumberOfBalls} balls.`);
      } catch (err) {
        console.log(err);
        setStatus("error");
      } finally {
        setStatus("idle");
      }
    };

    void fetchBallDetails();
  }, []);

  const balls = lastBallsDetails?.data.balls ?? [];

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="p-2 border rounded-lg flex items-center gap-6 justify-between bg-gray-100">
      <p className="text-nowrap font-semibold">Last {NumberOfBalls} Balls</p>
      <ul className="flex items-center gap-2 overflow-scroll w-full no-scrollbar justify-end">
        {balls.length > 0 ? (
          balls.map((item) => (
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
