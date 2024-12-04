import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PlayerDropwdownSelectProps {
  title: string;
  type: "striker" | "non-striker" | "bowler";
  playerData: Array<string>;
}

const PlayerDropwdownSelect: React.FC<PlayerDropwdownSelectProps> = ({
  title,
  type,
  playerData,
}) => {
  return (
    <div className="flex-1">
      <span className="text-sm font-semibold">{title} </span>
      {type === "bowler" ? null : (
        <span className="text-sm font-medium capitalize">({type})</span>
      )}

      <Select>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${title}`} />
        </SelectTrigger>
        <SelectContent>
          {playerData.map((item, idx) => (
            <SelectItem key={idx} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlayerDropwdownSelect;
