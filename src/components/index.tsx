import { useState } from "react";

import ThemesContainer from "@/components/widgets/Themes";
import TimerContainer from "@/components/widgets/Timer";
import Victory from "@/components/widgets/Victory";
import Board from "./Board";

const BOARD_SIZE = 9; // TODO это конфиг
const DIFFICULTY = "easy"; // TODO это конфиг
const BOARD_THEME = "blue-white"; // TODO это конфиг
const difficultyDictionary = {
  easy: "легкая",
  medium: "средняя",
  hard: "тяжелая",
}; // TODO это константа

function MainContainer() {
  const [gameId, setGameId] = useState(0);
  const [countMistake, setCountMistake] = useState(0);
  const [isVictory, setIsVictory] = useState(false);
  const [hasPause, setHasPause] = useState(false);

  // setTimeout(() => {
  //   setIsVictory(true);
  // }, 5000);

  return (
    <main
      className={["sudoku-app flex-justify-center flex-column", BOARD_THEME]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="sudoku-app-header flex-space-between">
        <ThemesContainer defaultTheme={BOARD_THEME} />
        <span className="sudoku-app-header-text">
          {difficultyDictionary[DIFFICULTY]}
        </span>
        <span className="sudoku-app-header-text">{`${countMistake} / 5`}</span>
        <TimerContainer
          key={gameId}
          endGame={isVictory}
          setHasPause={() => setHasPause((prev) => !prev)}
        />
      </div>

      <Board
        key={gameId}
        boardSize={BOARD_SIZE}
        difficulty={DIFFICULTY}
        hasOverlay={hasPause || isVictory}
        setCountMistake={() => setCountMistake((prev) => prev + 1)}
      />

      {hasPause && <div className="sudoku-app-state-pause" />}

      {isVictory && (
        <Victory
          updateGameClick={() => {
            setGameId((prev) => prev + 1);
            setIsVictory(false);
            setHasPause(false);
            setCountMistake(0);
          }}
        />
      )}
    </main>
  );
}

export default MainContainer;
