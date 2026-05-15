import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Board from "./components/Board";

import "./Main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="sudoku-app">
      <Board />
    </main>
  </StrictMode>
);
