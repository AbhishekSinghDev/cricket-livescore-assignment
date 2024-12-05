"use client";

import React from "react";

interface ScoreCardProps {
  countryInitial: string;
  runs: number;
  wickets: number;
  overs: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  countryInitial,
  runs,
  wickets,
  overs,
}) => {
  return (
    <div className="flex items-center flex-col text-sm gap-2 w-full">
      <p className="font-medium">{countryInitial}</p>
      {/* i don't know why i am not able use next/image here. when i try to replace the img with <Image /> by next it does not work and stop my next server also. i am seeing this issue for the first time. */}
      <img
        src="/flag.png"
        alt={countryInitial}
        className="size-8 object-cover rounded-full"
      />
      <div className="border rounded-md p-1 flex items-center flex-col">
        <p>
          {runs} / {wickets}
        </p>
        <p>Over {overs}</p>
      </div>
    </div>
  );
};

export default ScoreCard;
