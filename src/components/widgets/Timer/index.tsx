import { useState, useEffect } from "react";

import { formatTime } from "@/utils/common/time-utils";
import PauseIcon from "@/components/widgets/Icons/Pause";
import PlayIcon from "@/components/widgets/Icons/Play";

import styles from "./TimerContainer.module.scss";

function TimerContainer({
  hasTimerPanel = true,
  hasPause = true,
}: {
  hasTimerPanel?: boolean;
  hasPause?: boolean;
}) {
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, startTime]);

  return (
    <div className={styles["timer-container"]}>
      <span className={styles.timer}>{formatTime(elapsedTime)}</span>

      {hasTimerPanel && (
        <div className={styles["timer-panel-container"]}>
          {hasPause && (
            <button
              className={styles["play-pause-button"]}
              onClick={() => {
                if (isRunning) {
                  setElapsedTime(Date.now() - startTime);
                } else {
                  setStartTime(Date.now() - elapsedTime);
                }

                setIsRunning((prev) => !prev);
              }}
            >
              {isRunning ? <PauseIcon /> : <PlayIcon />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TimerContainer;
