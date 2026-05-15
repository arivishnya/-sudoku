import { useState, useEffect } from "react";

import { SelectedCell } from "../../models/GameState";
import { Board } from "../../models/Board";

import Cell from "../Cell";

import styles from "./Board.module.scss";

const BOARD_SIZE = 4; // TODO это конфиг

function BoardContainer() {
  // хранение board state, отрисовкa клеток, передачу данных в ячейки
  const [board, setBoard] = useState<Board>([
    [
      { value: 1, initial: true },
      { value: 2, initial: true },
      { value: 3, initial: true },
      { value: 4, initial: true },
    ],
    [
      { value: 3, initial: true },
      { value: 4, initial: true },
      { value: 1, initial: true },
      { value: 2, initial: true },
    ],
    [
      { value: 2, initial: true },
      { value: 1, initial: true },
      { value: 4, initial: true },
      { value: 3, initial: true },
    ],
    [
      { value: 4, initial: true },
      { value: 3, initial: true },
      { value: 2, initial: true },
      { value: 1, initial: true },
    ],
  ]);

  const [selectedCell, setSelectedCell] = useState<SelectedCell>(null);
  const selectedCellValue = selectedCell
    ? board[selectedCell.row][selectedCell.cell].value
    : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell) return;

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

    // if (selectedCell && board[selectedCell.row][selectedCell.cell].initial) {
    //   return;
    // }

    setSelectedCell({ row: data.row, cell: data.cell });
  };

  const updateCell = (value: number | null) => {
    setBoard((prev) =>
      prev.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === selectedCell?.row && colIndex === selectedCell?.cell
            ? { ...cell, value }
            : cell
        )
      )
    );
  };

  const blockSize = Math.sqrt(BOARD_SIZE);

  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="d-flex">
          {row.map((cell, colIndex) => {
            const isBottomBorder =
              (rowIndex + 1) % blockSize === 0 && rowIndex !== BOARD_SIZE - 1;
            const isRightBorder =
              (colIndex + 1) % blockSize === 0 && colIndex !== BOARD_SIZE - 1;

            return (
              <Cell
                key={colIndex}
                row={rowIndex}
                cell={colIndex}
                value={cell.value}
                initial={cell.initial}
                selectedCell={selectedCell}
                selectedCellValue={selectedCellValue}
                onSelectCell={onSelectCell}
                isBottomBorder={isBottomBorder}
                isRightBorder={isRightBorder}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default BoardContainer;
