import victoryGif from "@/assets/victory.png";

import styles from "./VictoryContainer.module.scss";

function VictoryContainer({
  label = "Победа!",
  updateGame = true,
  updateGameLabel = "Сыграть еще раз",
  updateGameClick,
}: {
  label?: string;
  updateGame?: boolean;
  updateGameLabel?: string;
  updateGameClick?: () => void;
}) {
  return (
    <div className={styles["victory-container"]}>
      <span className={styles["victory-header"]}>{label}</span>

      <img src={victoryGif} alt="Victory" className={styles["victory-gif"]} />

      {updateGame && (
        <button className={styles["victory-button"]} onClick={updateGameClick}>
          {updateGameLabel}
        </button>
      )}
    </div>
  );
}

export default VictoryContainer;
