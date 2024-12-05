import { TPlayerSelectDropdown } from "@/types";

const PlayerData = ["Abhishek", "Shiva", "Ashish"];

// Player Dropdown Configuration
const PlayerSelectDropdowns: TPlayerSelectDropdown[] = [
  { title: "Batsman", type: "striker" },
  { title: "Batsman", type: "non-striker" },
  { title: "Bowler", type: "bowler" },
];

// Button Configuration
const ButtonConfigurations = {
  ballStart: [
    { text: "Ball Start", className: "bg-green-700 py-6 px-16" },
    { text: "Wide", className: "bg-orange-600 py-6 px-16" },
    { text: "No Ball", className: "bg-blue-950 py-6 px-16" },
  ],
  runs: [
    { text: "0", className: "bg-blue-500 w-full py-11" },
    { text: "1", className: "bg-blue-900 w-full py-11" },
    { text: "Wicket", className: "bg-red-500 w-full py-11" },
    { text: "2", className: "bg-teal-500 w-full py-11" },
    { text: "4", className: "bg-teal-300 w-full py-11" },
    { text: "6", className: "bg-gray-500 w-full py-11" },
  ],
  additionalControls: [
    { text: "Bolwer Stop", className: "bg-violet-800 w-full py-6" },
    { text: "1 or 2", className: "bg-blue-700 w-full py-6" },
    { text: "2 or 4", className: "bg-violet-800 w-full py-6" },
    { text: "4 or 6", className: "bg-orange-800 w-full py-6" },
    { text: "Ball In Air", className: "bg-violet-800 w-full py-6" },
    { text: "Others", className: "bg-blue-950 w-full py-6" },
    { text: "3", className: "bg-violet-800 w-full py-6" },
    { text: "Boundary Check", className: "bg-blue-950 w-full py-6" },
    { text: "Appeal", className: "bg-gray-500 w-full py-6" },
    { text: "Catch Drop", className: "bg-blue-950 w-full py-6" },
  ],
  finalControls: [
    { text: "Leg Bye", className: "bg-cyan-400 w-full py-6" },
    { text: "Bye", className: "bg-green-600 w-full py-6" },
    { text: "Third Umpire", className: "bg-gray-500 w-full py-6" },
    { text: "Review", className: "bg-red-700 w-full py-6" },
    { text: "Done", className: "bg-green-800 w-full py-6" },
    { text: "Misfield", className: "bg-blue-950 w-full py-6" },
    { text: "Overthrow", className: "bg-violet-600 w-full py-6" },
    { text: "Wicket", className: "bg-red-700 w-full py-6" },
  ],
};

// Batsman table data
const BatsmanHeaders = ["Batsman", "R", "B", "4s"];
const BatsmanData = [
  ["Abhishek*", "63", "42", "-"],
  ["Shiva", "8", "1", "-"],
];

// Bowlers table data
const BowlersHeaders = ["Bowler", "0", "M", "R", "W"];
const BowlersData = [
  ["Sanjay*", "3.0", "0", "31", "1"],
  ["Ayush", "8", "0", "20", "2"],
];

export {
  PlayerData,
  PlayerSelectDropdowns,
  ButtonConfigurations,
  BatsmanData,
  BatsmanHeaders,
  BowlersData,
  BowlersHeaders,
};
