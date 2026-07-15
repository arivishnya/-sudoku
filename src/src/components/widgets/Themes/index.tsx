import { useState, useEffect, useRef } from "react";

import styles from "./ThemesContainer.module.scss";

const themes = [
  {
    name: "blue-white", // классика светлая
    background:
      "linear-gradient(120deg, var(--white-100) 0%, var(--blue-10) 35%, var(--blue-30) 70%, var(--blue-70) 100%)",
  },
  {
    name: "blue-gray", // классика темная
    background:
      "linear-gradient(145deg, var(--black-90) 15%, var(--blue-70) 45%, var(--blue-30) 100%",
  },
  {
    name: "green-pink", // лотос
    background:
      "linear-gradient(120deg, var(--beige-40) 0%, var(--pink-40) 35%, var(--green-15) 70%, var(--green-40) 100%)",
  },
];

function ThemesContainer({
  defaultTheme = "blue-gray",
}: {
  defaultTheme: string;
}) {
  const themesRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState(
    themes.find((t) => t.name === defaultTheme) || themes[0]
  );
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themesRef.current &&
        !themesRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPopup(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const app = document.querySelector(".sudoku-app");
    if (!app) return;

    app.classList.remove(...themes.map((theme) => theme.name));
    app.classList.add(theme.name);
  }, [theme]);

  return (
    <div className={styles["themes-container"]} ref={themesRef}>
      <button
        className={styles["themes-select-button"]}
        style={{ background: theme.background }}
        onClick={() => setShowPopup((prev) => !prev)}
      />

      {showPopup && (
        <div className={styles["themes-popup"]}>
          {themes
            .filter((t) => t.name !== theme.name)
            .map((t, tIndex) => (
              <button
                key={tIndex}
                className={styles["themes-select-button"]}
                style={{ background: t.background }}
                onClick={() => {
                  setTheme(t);
                  setShowPopup(false);
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default ThemesContainer;
