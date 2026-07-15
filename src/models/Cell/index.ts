import { SelectedCell, SelectedCellValue } from "../GameState";
import { Board } from "../Board";

export type Position = {
  row: number;
  col: number;
};

export type CellProps = Cell &
  Position & {
    selectedCell: SelectedCell;
    selectedCellValue: SelectedCellValue;
    onSelectCell: (pos: SelectedCell) => void;
    isBottomBorder: boolean;
    isRightBorder: boolean;
  };

export type Cell = {
  value: number | null;
  initial?: boolean; // нельзя менять
  error?: boolean; // подсветка ошибок
  // notes?: number[] // будущий “pencil mode”
};

export type BoardData = {
  board: Board;
  boxSize: number;
};

export type isConflictedInSelectZoneParams = Position &
  BoardData & {
    selectRow: number;
    selectCol: number;
    value: number | null;
  };

export type hasInRowParams = {
  board: Board;
  row: number;
  value: number | null;
};

export type hasInColumnParams = {
  board: Board;
  col: number;
  value: number | null;
};

export type hasInBoxParams = Position &
  BoardData & {
    value: number | null;
  };
