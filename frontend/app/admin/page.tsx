import React from "react";
import AdminControls from "./admin-controls";
import ScoreBoard from "@/components/shared/score-board";

const page = () => {
  return (
    <div className="flex items-start gap-3 p-2">
      <AdminControls />
      <ScoreBoard />
    </div>
  );
};

export default page;
