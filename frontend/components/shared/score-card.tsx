import React from "react";

interface ScoreCardProps {
  countryInitial: string;
  runs: number;
  wickets: number;
  overs: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  countryInitial,
  runs,
  wickets,
  overs,
}) => {
  return (
    <div>
      {countryInitial}
      {/* <Image
        src="/flag.png"
        alt={countryInitial}
        height={100}
        width={100}
        className="size-6"
      /> */}
      <div>
        <p>
          {runs} / {wickets}
        </p>
        <p>Over {overs}</p>
      </div>
    </div>
  );
};

export default ScoreCard;
