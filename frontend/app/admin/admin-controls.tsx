import React from "react";
import PlayerDropwdownSelect from "@/components/shared/player-dropdown-select";
import { PlayerData, PlayerSelectDropdowns } from "@/lib/constants";
import ScoreExtraDetails from "./score-extras-details";
import ControlButtonGrid from "./control-button-grid";

const AdminControls = () => {
  return (
    <div className="flex flex-col gap-4 border rounded-lg border-gray-400 flex-1 p-4">
      {/* Player Dropdowns */}
      <div className="flex gap-2 items-center justify-between">
        {PlayerSelectDropdowns.map((item, idx) => (
          <PlayerDropwdownSelect key={idx} playerData={PlayerData} {...item} />
        ))}
      </div>

      {/* Score Extra Details */}
      <ScoreExtraDetails />

      {/* Button Controls */}
      <ControlButtonGrid />
    </div>
  );
};

export default AdminControls;