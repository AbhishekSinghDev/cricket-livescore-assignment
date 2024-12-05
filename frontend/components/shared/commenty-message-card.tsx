import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface CommentryMessageCardProps {
  run: number | string;
  over: number | string;
  ball: number | string;
  message: string;
}

const CommentryMessageCard: React.FC<CommentryMessageCardProps> = ({
  run,
  over,
  ball,
  message,
}) => {
  return (
    <div className="flex items-center gap-4">
      {/* run box */}
      <div className="rounded-full aspect-square size-14 flex items-center justify-center text-white bg-green-400">
        {run}
      </div>

      {/* message */}
      <div className="flex-1 flex items-center gap-2">
        <span>
          {over}.{ball}
        </span>
        <p>
          {message}
          <span className="font-semibold">{run} run.</span>
        </p>
      </div>

      {/* actions */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CommentryMessageCard;
