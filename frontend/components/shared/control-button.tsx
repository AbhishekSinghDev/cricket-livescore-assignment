import { cn } from "@/lib/utils";
import React from "react";

interface ControlButtonProps {
  text: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  text,
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-md text-white font-semibold text-nowrap text-sm xl:text-lg cursor-pointer",
        className
      )}
    >
      {text}
    </div>
  );
};

export default ControlButton;
