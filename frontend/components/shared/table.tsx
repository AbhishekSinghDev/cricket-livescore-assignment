import { cn } from "@/lib/utils";
import { TBatsman, TBowler, TPlayer } from "@/types";
import React from "react";

interface TableProps {
  headers: string[];
  batsman?: TBatsman[];
  bowler?: TBowler;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
}

const Table: React.FC<TableProps> = ({
  headers,
  batsman,
  bowler,
  className = "",
  headerClassName = "",
  rowClassName = "",
}) => {
  return (
    <table
      className={cn(
        "border-collapse border border-gray-300 rounded-lg w-full text-sm",
        className
      )}
    >
      <thead className={cn("bg-gray-200 text-gray-700", headerClassName)}>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className={cn(
                "px-4 py-1",
                index === 0 ? "text-left" : "text-center"
              )}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {batsman &&
          batsman.map((item, cellIndex) => (
            <tr key={item._id} className={rowClassName}>
              <td className="px-4 py-1 text-start">{item.name}</td>
              <td className="px-4 py-1 text-center">{item.runs}</td>
              <td className="px-4 py-1 text-center">{item.ballsFaced}</td>
              <td className="px-4 py-1 text-center">{item.fours}</td>
            </tr>
          ))}

        {bowler && (
          <tr className={rowClassName}>
            <td className="px-4 py-1 text-start">{bowler.name}</td>
            <td className="px-4 py-1 text-center">{bowler.overs}</td>
            <td className="px-4 py-1 text-center">{bowler.runsConceded}</td>
            <td className="px-4 py-1 text-center">{bowler.wickets}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
