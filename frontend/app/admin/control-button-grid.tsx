import React from "react";
import ControlButton from "@/components/shared/control-button";

const AdminControls = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <div className="grid grid-rows-3 gap-1">
          <ControlButton
            text="Ball Start"
            className="bg-green-700 py-6 px-16"
          />
          <ControlButton text="Wide" className="bg-orange-600 py-6 px-16" />
          <ControlButton text="No Ball" className="bg-blue-950 py-6 px-16" />
        </div>

        <div className="grid grid-cols-3 gap-1 w-full">
          <ControlButton text="0" className="bg-blue-500 w-full py-11" />
          <ControlButton text="1" className="bg-blue-900 w-full py-11" />
          <ControlButton text="Wicket" className="bg-red-500 w-full py-11" />
          <ControlButton text="2" className="bg-teal-500 w-full py-11" />
          <ControlButton text="4" className="bg-teal-300 w-full py-11" />
          <ControlButton text="6" className="bg-gray-500 w-full py-11" />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1">
        <ControlButton
          text="Bolwer Stop"
          className="bg-violet-800 w-full py-6"
        />
        <ControlButton text="1 or 2" className="bg-blue-700 w-full py-6" />
        <ControlButton text="2 or 4" className="bg-violet-800 w-full py-6" />
        <ControlButton text="4 or 6" className="bg-orange-800 w-full py-6" />
        <ControlButton
          text="Ball In Air"
          className="bg-violet-800 w-full py-6"
        />
        <ControlButton text="Others" className="bg-blue-950 w-full py-6" />
        <ControlButton text="3" className="bg-violet-800 w-full py-6" />
        <ControlButton
          text="Boundary Check"
          className="bg-blue-950 w-full py-6"
        />
        <ControlButton text="Appeal" className="bg-gray-500 w-full py-6" />
        <ControlButton text="Catch Drop" className="bg-blue-950 w-full py-6" />
      </div>

      <div className="grid grid-cols-4 gap-1">
        <ControlButton text="Leg Bye" className="bg-cyan-400 w-full py-6" />
        <ControlButton text="Bye" className="bg-green-600 w-full py-6" />
        <ControlButton
          text="Third Umpire"
          className="bg-gray-500 w-full py-6"
        />
        <ControlButton text="Review" className="bg-red-700 w-full py-6" />
        <ControlButton text="Done" className="bg-green-800 w-full py-6" />
        <ControlButton text="Misfield" className="bg-blue-950 w-full py-6" />
        <ControlButton text="Overthrow" className="bg-violet-600 w-full py-6" />
        <ControlButton text="Wicket" className="bg-red-700 w-full py-6" />
      </div>
    </div>
  );
};

export default AdminControls;
