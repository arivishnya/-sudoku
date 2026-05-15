import { SelectedCell, SelectedCellValue } from "../GameState";

export type CellProps = Cell & {
  row: number;
  cell: number;
  selectedCell: SelectedCell;
  selectedCellValue: SelectedCellValue;
  onSelectCell: (pos: SelectedCell) => void;
  isBottomBorder: boolean;
  isRightBorder: boolean;
};

export type Cell = {
  value: number | null;
  initial: boolean; // нельзя менять
  // error: boolean // подсветка ошибок
  // notes?: number[] // будущий “pencil mode”
};
