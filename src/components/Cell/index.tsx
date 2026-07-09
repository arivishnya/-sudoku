import { CellProps } from "@/models/Cell";

import styles from "./Cell.module.scss";

function CellContainer({
  row,
  col,
  value,
  error,
  selectedCell,
  selectedCellValue,
  onSelectCell,
  isBottomBorder,
  isRightBorder,
}: CellProps) {
  // отображение значения, ввод, визуальное состояние

  return (
    <div
      className={[
        "flex-justify-center",
        styles.cell,
        value && value === selectedCellValue && styles["selected-value"],
        selectedCell &&
          row === selectedCell.row &&
          col === selectedCell.col &&
          styles.selected,
        error && styles["selected-error"],
        isBottomBorder && styles["bottom-border"],
        isRightBorder && styles["right-border"],
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={(ev) => {
        ev.preventDefault();
        onSelectCell({ row, col });
      }}
    >
      {value}
    </div>
  );
}

export default CellContainer;
