import { CellProps } from "../../models/Cell";

import styles from "./Cell.module.scss";

function CellContainer({
  row,
  cell,
  value,
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
        value === selectedCellValue && styles["selected-value"],
        selectedCell &&
          row === selectedCell.row &&
          cell === selectedCell.cell &&
          styles.selected,
        isBottomBorder && styles["bottom-border"],
        isRightBorder && styles["right-border"],
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={(ev) => {
        ev.preventDefault();
        onSelectCell({ row, cell });
      }}
    >
      {value}
    </div>
  );
}

export default CellContainer;
