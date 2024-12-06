"use client";

import { ChevronDown, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import ScoreCard from "./score-card";
import Table from "./table";
import {
  BatsmanData,
  BatsmanHeaders,
  BowlersData,
  BowlersHeaders,
} from "@/lib/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import CommentryMessageCard from "./commenty-message-card";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { TStatus } from "@/types";
import { TMatch, TMatchResponse } from "@/types/response";
import { axiosInstance } from "@/lib";
import Loading from "./loading";
import LastBalls from "./last-balls";

const ScoreBoard = () => {
  const [status, setStatus] = useState<TStatus>("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [matchResponse, setMatchResponse] =
    useState<TMatchResponse<true> | null>(null);
  const [match, setMatch] = useState<TMatch | null>(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        setStatus("loading");
        const { data } = await axiosInstance.post("/match/match-details", {
          matchId: "6752b79ae4917164dc897b13",
        });

        if (data.success) {
          const successResponse = data as TMatchResponse<true>;
          setMatchResponse(successResponse);
          setMatch(successResponse.data.match);
          setStatus("success");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorResponse = error.response?.data as
            | TMatchResponse<false>
            | undefined;

          toast.error(errorResponse?.message ?? "An unexpected error occurred");
        } else {
          toast.error("An unexpected error occurred");
        }

        setErrMsg("something went wrong");
        setStatus("error");
      } finally {
        setTimeout(() => setStatus("idle"), 3000);
      }
    };

    if (!matchResponse) {
      void fetchMatchData();
    }
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  console.log(match);

  if (!match) {
    return <div>Match not found</div>;
  }

  return (
    <div className="border w-full p-4 rounded-lg border-gray-400 bg-gray-50 space-y-3">
      {/* title */}
      <p className="flex items-center gap-2 text-sm font-medium">
        <ChevronDown className="size-4" /> Scorecard
      </p>

      {/* country scores */}
      <div className="border rounded-t-lg">
        <div className="rounded-t-lg text-blue-600 font-semibold bg-gray-200 border-b p-2 text-right text-sm">
          View Full Score Card
        </div>
        <div className="flex items-center my-2">
          <ScoreCard
            countryInitial={match.team1.name}
            wickets={match.team1.wickets}
            runs={match.team1.score}
            overs="20.0" // i forget to add over count in database
          />
          <span className="text-red-600 font-semibold">vs</span>
          <ScoreCard
            countryInitial={match.team2.name}
            wickets={match.team2.wickets}
            runs={match.team2.score}
            overs="20.0" // same here i forgot to add over count in database
          />
        </div>

        <p className="font-bold text-sm text-center bg-gray-200 py-2">
          India won by 133 runs
        </p>
      </div>

      {/* batsman details table */}
      <Table headers={BatsmanHeaders} batsman={match.currentBatsmen} />

      {/* bowlers details table */}
      <Table headers={BowlersHeaders} bowler={match.currentBowler} />

      {/* balls count and relvant run data */}
      <LastBalls />

      {/* extra's info box */}
      <div className="p-2 border rounded-lg flex items-center gap-6 justify-between bg-gray-100">
        <p className="text-nowrap font-semibold">Extra</p>
        <ul className="flex items-center gap-2 overflow-scroll w-full no-scrollbar">
          <li>11</li>
          <li>(b 0, lb 4, wd 6, nb 1, P 0)</li>
        </ul>
      </div>

      {/* dropdowns */}
      <div className="flex items-center gap-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Bangladesh" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* search input */}
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors md:text-sm items-center gap-2">
          <Search />
          <input
            className="file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full bg-transparent"
            placeholder="default size"
          />
        </div>
        <span className="bg-red-500 rounded-md p-3">
          <X className="size-6 text-white" />
        </span>
      </div>

      <Separator />

      {/* commentry */}
      <div className="flex flex-col overflow-scroll gap-2 h-52 no-scrollbar">
        {match.ballByBallCommentary.toReversed().map((item) => (
          <CommentryMessageCard
            key={item._id}
            run={item.runs}
            over={2} // actually i forgot to add over in database. so i dont have enough time left to add now so i am leaving it as hardcoded
            ball={item.ball}
            message={item.commentry}
          />
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
