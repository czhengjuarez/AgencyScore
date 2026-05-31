import { useState, useEffect } from "react";
import AgencyAudit from "./agency-audit.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("of-theme") || "system"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      root.removeAttribute("data-mode");
    } else {
      root.setAttribute("data-mode", theme);
    }
    localStorage.setItem("of-theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

export default function App() {
  const [theme, setTheme] = useTheme();
  return (
    <>
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <AgencyAudit />
    </>
  );
}
