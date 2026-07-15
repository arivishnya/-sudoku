import { Board } from "../Board";
import { Position } from "../Cell";

export type GameState = {
  board: Board;
  size: number;
};

export type Difficulty = "easy" | "medium" | "hard";

export type SelectedCell = Position | null;
export type SelectedCellValue = number | null;
