import { LoaderCircle } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen gap-2">
      <LoaderCircle className="animate-spin size-10" strokeWidth={3} />
    </div>
  );
};

export default Loading;
