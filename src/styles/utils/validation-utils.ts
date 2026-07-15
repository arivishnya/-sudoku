import { isConflictedInSelectZoneParams } from "../models/Cell";
import {
  hasInRowParams,
  hasInColumnParams,
  hasInBoxParams,
} from "../models/Cell";

export function isConflictedInSelectZone({
  board,
  boxSize,
  row,
  col,
  selectRow,
  selectCol,
  value,
}: isConflictedInSelectZoneParams): boolean {
  if (value === null) return false;

  const sameRow = row === selectRow;
  const sameCol = col === selectCol;

  const { boxRowStart, boxColStart } = getBoxPosition(
    selectRow,
    selectCol,
    boxSize
  );
  const sameBox =
    row >= boxRowStart &&
    row < boxRowStart + boxSize &&
    col >= boxColStart &&
    col < boxColStart + boxSize;

  const inZone = sameRow || sameCol || sameBox;
  if (!inZone) return false;

  if (row === selectRow && col === selectCol) return false;
  return board[row][col].value === value;
}

export function hasInRow({ board, row, value }: hasInRowParams): boolean {
  return board[row].some((cell) => cell.value === value);
}

export function hasInColumn({ board, col, value }: hasInColumnParams): boolean {
  return board.some((row) =>
    row.some((cell, colIndex) => col === colIndex && cell.value === value)
  );
}

function getBoxPosition(row: number, col: number, boxSize: number) {
  const boxRowStart = Math.floor(row / boxSize) * boxSize;
  const boxColStart = Math.floor(col / boxSize) * boxSize;

  return { boxRowStart, boxColStart };
}

export function hasInBox({
  board,
  boxSize,
  row,
  col,
  value,
}: hasInBoxParams): boolean {
  const { boxRowStart, boxColStart } = getBoxPosition(row, col, boxSize);

  for (let r = boxRowStart; r < boxRowStart + boxSize; r++) {
    for (let c = boxColStart; c < boxColStart + boxSize; c++) {
      if (board[r][c].value === value) {
        return true;
      }
    }
  }

  return false;
}
