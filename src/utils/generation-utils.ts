import { Difficulty } from "../models/GameState";
import { Board } from "../models/Board";
import { hasInBox, hasInColumn, hasInRow } from "./validation-utils";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const difficultyMap = {
  easy: 35,
  medium: 45,
  hard: 55,
};

export function generateSudoku(
  boardSize: number,
  boxSize: number,
  difficulty: Difficulty
): {
  solution: Board;
  gameBoard: Board;
} {
  const workNumbers = numbers.slice(0, boardSize);

  const solution = generateFullBoard(boardSize, boxSize, workNumbers);

  const gameBoard = removeCells(
    solution,
    boardSize,
    boxSize,
    workNumbers,
    difficultyMap[difficulty]
  );

  return {
    solution,
    gameBoard,
  };
}

export function generateFullBoard(
  boardSize: number,
  boxSize: number,
  workNumbers: number[]
): Board {
  const board: Board = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({
      value: null,
      initial: true,
    }))
  );

  solveBoard(board, boardSize, boxSize, workNumbers);

  return board;
}

function solveBoard(
  board: Board,
  boardSize: number,
  boxSize: number,
  workNumbers: number[]
): boolean {
  // Поставь цифру → попробуй решить остаток
  // → если упёрся в тупик, откатись назад и попробуй другую цифру.
  const empty = findEmptyCell(board, boardSize);
  if (!empty) return true;

  const { row, col } = empty;
  const numbers = shuffle(workNumbers);
  for (const num of numbers) {
    if (canPlaceNumber(num, row, col, board, boxSize)) {
      board[row][col].value = num;

      if (solveBoard(board, boardSize, boxSize, workNumbers)) {
        return true;
      }

      board[row][col].value = null;
    }
  }

  return false;
}

function findEmptyCell(board: Board, boardSize: number) {
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      if (board[r][c].value === null) {
        return { row: r, col: c };
      }
    }
  }

  return null;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function canPlaceNumber(
  value: number,
  row: number,
  col: number,
  board: Board,
  boxSize: number
): boolean {
  return (
    !hasInRow({ board, row, value }) &&
    !hasInColumn({ board, col, value }) &&
    !hasInBox({ board, boxSize, row, col, value })
  );
}

export function removeCells(
  board: Board,
  boardSize: number,
  boxSize: number,
  workNumbers: number[],
  percentCount: number
): Board {
  const removedCount = (Math.pow(boardSize, 2) * percentCount) / 100;
  let removed = 0;

  while (removed < removedCount) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);

    if (board[row][col].value === null) continue;

    const backup = board[row][col].value;
    board[row][col].value = null;

    const copy = structuredClone(board);

    const solutions = countSolutions(copy, boardSize, boxSize, workNumbers);
    if (solutions !== 1) {
      board[row][col].value = backup;
    } else {
      board[row][col].initial = false;
      removed++;
    }
  }

  return board;
}

function countSolutions(
  board: Board,
  boardSize: number,
  boxSize: number,
  workNumbers: number[],
  limit = 2
): number {
  let count = 0;

  function solve(): Boolean {
    if (count >= limit) return true;

    const empty = findEmptyCell(board, boardSize);
    if (!empty) {
      count++;
      return false;
    }

    const { row, col } = empty;
    const numbers = shuffle(workNumbers);
    for (const num of numbers) {
      if (canPlaceNumber(num, row, col, board, boxSize)) {
        board[row][col].value = num;
        solve();
        board[row][col].value = null;
      }
    }

    return false;
  }

  solve();
  return count;
}
