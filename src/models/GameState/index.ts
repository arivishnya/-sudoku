import { Board } from "../Board";

export type SelectedCell = { row: number; cell: number } | null;
export type SelectedCellValue = number | null;

export type GameState = {
  board: Board;
  size: number;
};
