import { cn } from "@/lib/utils";
import React from "react";

interface TableProps {
  headers: string[];
  data: (string | number)[][];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
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
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowClassName}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={cn(
                  "px-4 py-1",
                  cellIndex === 0 ? "" : "text-center"
                )}
              >
                {cell === "-" ? cell : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
