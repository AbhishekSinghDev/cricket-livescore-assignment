import { Switch } from "@/components/ui/switch";
import React from "react";

const ScoreExtraDetails = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <p className="text-sm font-semibold">Score: </p>
        <p className="text-sm font-semibold">Extra:</p>
      </div>

      <div className="flex items-center flex-col border rounded-lg p-1">
        <Switch />
        <span className="text-xs">Mute & Text Off</span>
      </div>
    </div>
  );
};

export default ScoreExtraDetails;
