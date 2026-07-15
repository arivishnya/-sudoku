import { useState, useEffect } from "react";

import { SelectedCell, Difficulty } from "@/models/GameState";
import { Board } from "@/models/Board";

import { isConflictedInSelectZone } from "@/utils/validation-utils";
import { generateSudoku } from "@/utils/generation-utils";

import Loader from "@/components/widgets/Loader";
import Cell from "../Cell";

import styles from "./Board.module.scss";

function BoardContainer({
  boardSize,
  difficulty,
  hasOverlay,
  setCountMistake,
}: {
  boardSize: number;
  difficulty: Difficulty;
  hasOverlay?: boolean;
  setCountMistake: () => void;
}) {
  // хранение board state, отрисовкa клеток, передачу данных в ячейки

  const boxSize = Math.sqrt(boardSize);
  const [solution, setSolution] = useState<Board>();
  const [board, setBoard] = useState<Board>();

  const start = () => {
    const { solution, gameBoard } = generateSudoku(
      boardSize,
      boxSize,
      difficulty
    );
    setSolution(solution);
    setBoard(gameBoard);
  };

  useEffect(() => {
    start();
    return () => {};
  }, []);

  const [selectedCell, setSelectedCell] = useState<SelectedCell>(null);
  const selectedCellValue =
    selectedCell && board
      ? board[selectedCell.row][selectedCell.col].value
      : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell || board?.[selectedCell.row][selectedCell.col].initial)
        return;

      if (/^[1-9]$/.test(e.key)) {
        updateCell(Number(e.key));
      }

      if (e.key === "Backspace") {
        updateCell(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCell]);

  const onSelectCell = (data: SelectedCell) => {
    if (!data) {
      setSelectedCell(null);
      return;
    }

    setSelectedCell({ row: data.row, col: data.col });
  };

  const updateCell = (value: number | null) => {
    setBoard((prev) =>
      prev?.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === selectedCell?.row && colIndex === selectedCell?.col
            ? { ...cell, value }
            : cell
        )
      )
    );

    if (selectedCell && value) {
      console.log(selectedCell);

      const isMistake =
        solution?.[selectedCell.row][selectedCell.col].value !== value;
      if (isMistake) setCountMistake();
    }
  };

  return (
    <div
      className={["sudoku-app-board flex-justify-center", styles.board].join(
        " "
      )}
    >
      {!board ? (
        <Loader />
      ) : (
        board.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex">
            {row.map((cell, colIndex) => {
              const isBottomBorder =
                (rowIndex + 1) % boxSize === 0 && rowIndex !== boardSize - 1;
              const isRightBorder =
                (colIndex + 1) % boxSize === 0 && colIndex !== boardSize - 1;

              return (
                <Cell
                  key={colIndex}
                  row={rowIndex}
                  col={colIndex}
                  value={cell.value}
                  initial={cell.initial}
                  selectedCell={selectedCell}
                  selectedCellValue={selectedCellValue}
                  onSelectCell={onSelectCell}
                  isBottomBorder={isBottomBorder}
                  isRightBorder={isRightBorder}
                  error={
                    selectedCell
                      ? isConflictedInSelectZone({
                          board,
                          boxSize,
                          row: rowIndex,
                          col: colIndex,
                          selectRow: selectedCell.row,
                          selectCol: selectedCell.col,
                          value: selectedCellValue,
                        })
                      : false
                  }
                />
              );
            })}
          </div>
        ))
      )}

      {hasOverlay && <span className="sudoku-app-overlay" />}
    </div>
  );
}

export default BoardContainer;
