import { ChevronDown } from "lucide-react";
import React from "react";
import ScoreCard from "./score-card";

const ScoreBoard = () => {
  return (
    <div className="border max-w-xl w-full p-2 rounded-lg border-gray-400 bg-gray-50">
      <p className="flex items-center gap-2 text-sm font-medium">
        <ChevronDown className="size-4" /> Scorecard
      </p>

      <>
        <div className="rounded-t-lg text-blue-600 font-semibold bg-gray-100 border p-2 text-right text-sm">
          View Full Score Card
        </div>
        <div>
          <ScoreCard countryInitial="IND" wickets={7} runs={160} overs={20.0} />
        </div>
        <div>footer</div>
      </>
    </div>
  );
};

export default ScoreBoard;
