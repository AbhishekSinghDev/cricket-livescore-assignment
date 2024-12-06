export type TLoginResponse<T extends boolean> = {
  success: T;
  message: string;
  data: T extends true
    ? {
        user: {
          id: string;
          email: string;
          accessToken: string;
          refreshToken: string;
        };
      }
    : never;
  errors: T extends false
    ? {
        formErrors: [];
        fieldErrors: {
          email: string[];
        };
      }
    : never;
};

export type TMatchResponse<T extends boolean> = {
  success: T;
  message: string;
  data: T extends true
    ? {
        match: {
          team1: {
            name: string;
            score: number;
            wickets: number;
          };
          team2: {
            name: string;
            score: number;
            wickets: number;
          };
          _id: string;
          currentBatsmen: {
            name: string;
            runs: number;
            ballsFaced: number;
            fours: number;
            sixes: number;
            strikeRate: number;
            isOnStrike: boolean;
            _id: string;
          }[];
          currentBowler: {
            name: string;
            overs: number;
            runsConceded: number;
            wickets: number;
            economy: number;
            _id: string;
          };
          ballByBallCommentary: {
            runs: number;
            ball: number;
            commentry: string;
            timestamp: Date;
            _id: string;
          }[];
          currentInnings: string;
          status: string;
          createdAt: Date;
          __v: number;
        };
      }
    : never;
};

export type TMatch = {
  team1: {
    name: string;
    score: number;
    wickets: number;
  };
  team2: {
    name: string;
    score: number;
    wickets: number;
  };
  _id: string;
  currentBatsmen: {
    name: string;
    runs: number;
    ballsFaced: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    isOnStrike: boolean;
    _id: string;
  }[];
  currentBowler: {
    name: string;
    overs: number;
    runsConceded: number;
    wickets: number;
    economy: number;
    _id: string;
  };
  ballByBallCommentary: {
    runs: number;
    ball: number;
    commentry: string;
    timestamp: Date;
    _id: string;
  }[];
  currentInnings: string;
  status: string;
  createdAt: Date;
  __v: number;
};

export type TBallsDetailsResponse<T extends boolean> = {
  success: T;
  message: string;
  data: T extends true
    ? {
        balls: {
          _id: string;
          matchId: string;
          runs: number;
          extras: number;
          extraType: string | null;
          wicket: boolean;
          wicketType: string | null;
          __v: 0;
        }[];
      }
    : never;
};
