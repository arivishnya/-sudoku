import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import TimerContainer from "@/components/widgets/Timer";
import Board from "./components/Board";

import "./styles/index.scss";

const BOARD_SIZE = 9; // TODO это конфиг
const DIFFICULTY = "easy"; // TODO это конфиг

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="sudoku-app flex-justify-center">
      <div className="sudoku-app-header">
        <TimerContainer />
      </div>

      <Board boardSize={BOARD_SIZE} difficulty={DIFFICULTY} />
    </main>
  </StrictMode>
);
