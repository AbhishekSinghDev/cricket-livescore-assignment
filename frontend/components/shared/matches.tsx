"use client";

import { axiosInstance } from "@/lib";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

const Matches = () => {
  const [matchesId, setMatchesId] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchAllMatches = async () => {
      try {
        const { data } = await axiosInstance.get("/match/all-matches");
        if (data.success) {
          setMatchesId(data.data);
        }
      } catch (er) {
        console.log(er);
      }
    };

    void fetchAllMatches();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      Matches found: {matchesId?.length}
      {matchesId ? (
        matchesId.map((item) => (
          <div className="flex gap-3 items-center" key={item}>
            <Link
              href={`/score-board?matchId=${item}`}
              className="text-blue-600 underline underline-offset-4 font-bold"
            >
              Match 1 Click me
            </Link>
            <Separator orientation="vertical" />
            <Link
              href={`/admin?matchId=${item}`}
              className="text-blue-700 underline underline-offset-4"
            >
              View as Admin this match
            </Link>
          </div>
        ))
      ) : (
        <div>No match found</div>
      )}
      <p className="font-semibold">
        Note: There&apos;s a seed file in the backend folder running the seed
        file will set some initial data in the database.
      </p>
      <span className="absolute bottom-2 right-2">
        sorry for this page bad ui, actually i did&apos;t have enough time left
        to beautify this page. that's why i am making this weird page
      </span>
    </div>
  );
};

export default Matches;
