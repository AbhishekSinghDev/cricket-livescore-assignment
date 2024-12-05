import React from "react";
import AdminControls from "./admin-controls";
import ScoreBoard from "@/components/shared/score-board";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-3 p-1">
      <AdminControls />
      <ScoreBoard />
    </div>
  );
};

export default page;
