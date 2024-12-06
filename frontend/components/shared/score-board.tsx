import { ChevronDown, Search, X } from "lucide-react";
import React from "react";
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

const Length = 24;

const ScoreBoard = () => {
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
          <ScoreCard countryInitial="IND" wickets={7} runs={160} overs="20.0" />
          <span className="text-red-600 font-semibold">vs</span>
          <ScoreCard countryInitial="IND" wickets={7} runs={160} overs="20.0" />
        </div>

        <p className="font-bold text-sm text-center bg-gray-200 py-2">
          India won by 133 runs
        </p>
      </div>

      {/* batsman details table */}
      <Table headers={BatsmanHeaders} data={BatsmanData} />

      {/* bowlers details table */}
      <Table headers={BowlersHeaders} data={BowlersData} />

      {/* balls count and relvant run data */}
      <div className="p-2 border rounded-lg flex items-center gap-6 justify-between bg-gray-100">
        <p className="text-nowrap font-semibold">{Length} Balls</p>
        <ul className="flex items-center gap-2 overflow-scroll w-full no-scrollbar">
          {Array.from({ length: Length }).map((_, idx) => (
            <li
              key={idx}
              className="border rounded-sm px-1 text-sm bg-gray-200 border-gray-300"
            >
              {idx}
            </li>
          ))}
        </ul>
      </div>

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
        {Array.from({ length: 5 }).map((_, idx) => (
          <CommentryMessageCard
            key={idx}
            run={1}
            over={19}
            ball={4}
            message="Abhishek To Shiva: "
          />
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
