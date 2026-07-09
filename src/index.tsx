import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import ThemesContainer from "@/components/widgets/Themes";
import TimerContainer from "@/components/widgets/Timer";
import Board from "./components/Board";

import "./styles/index.scss";

const BOARD_SIZE = 9; // TODO это конфиг
const DIFFICULTY = "easy"; // TODO это конфиг
const BOARD_THEME = "blue-gray"; // TODO это конфиг

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main
      className={["sudoku-app flex-justify-center flex-column", BOARD_THEME]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="sudoku-app-header flex-space-between">
        <ThemesContainer defaultTheme={BOARD_THEME} />
        <TimerContainer />
      </div>

      <Board boardSize={BOARD_SIZE} difficulty={DIFFICULTY} />
    </main>
  </StrictMode>
);
