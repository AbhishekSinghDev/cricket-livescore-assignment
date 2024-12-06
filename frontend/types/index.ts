export type TPlayerSelectDropdown = {
  title: string;
  type: "striker" | "non-striker" | "bowler";
};

export type TStatus = "loading" | "idle" | "error" | "success";

export type TBatsman = {
  name: string;
  runs: number;
  ballsFaced: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOnStrike: boolean;
  _id: string;
};

export type TBowler = {
  economy: number;
  name: string;
  overs: number;
  runsConceded: number;
  wickets: number;
  _id: string;
};

export type TPlayer<T extends boolean> = {
  isBatsman: T;
  player: T extends true
    ? {
        name: string;
        runs: number;
        ballsFaced: number;
        fours: number;
        sixes: number;
        strikeRate: number;
        isOnStrike: boolean;
        _id: string;
      }
    : {
        economy: number;
        name: string;
        overs: number;
        runsConceded: number;
        wickets: number;
        _id: string;
      };
};

export type TBatsmanKeys = keyof TPlayer<true>["player"];

export type TBowlerKeys = keyof TPlayer<false>["player"];

export type TBallDetail = {
  _id: string;
  matchId: string;
  runs: number;
  extras: number;
  extraType: string | null;
  wicket: boolean;
  wicketType: string | null;
  __v: 0;
};
