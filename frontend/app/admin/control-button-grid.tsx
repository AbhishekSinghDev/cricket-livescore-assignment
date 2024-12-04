import ControlButton from "@/components/shared/control-button";
import { ButtonConfigurations } from "@/lib/constants";
import React from "react";

const ControlButtonGrid = () => {
  const renderButtonGrid = (
    buttons: Array<{ text: string; className: string }>,
    gridClass: string
  ) => (
    <div className={gridClass}>
      {buttons.map((button, idx) => (
        <ControlButton
          key={`${button.text}-${idx}`}
          text={button.text}
          className={button.className}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        {/* Ball Start Buttons */}
        {renderButtonGrid(
          ButtonConfigurations.ballStart,
          "grid grid-rows-3 gap-1"
        )}

        {/* Run Buttons */}
        {renderButtonGrid(
          ButtonConfigurations.runs,
          "grid grid-cols-3 gap-1 w-full"
        )}
      </div>

      {/* Additional Controls */}
      {renderButtonGrid(
        ButtonConfigurations.additionalControls,
        "grid grid-cols-5 gap-1"
      )}

      {/* Final Controls */}
      {renderButtonGrid(
        ButtonConfigurations.finalControls,
        "grid grid-cols-4 gap-1"
      )}
    </div>
  );
};

export default ControlButtonGrid;
