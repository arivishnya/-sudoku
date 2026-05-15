import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./Main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="app"></main>
  </StrictMode>
);
