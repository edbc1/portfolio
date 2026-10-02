"use client";

import { useSyncExternalStore } from "react";
import { pixelTransition } from "./pixelTransition";

type Theme = "dark" | "light";

// theme lives on <html data-theme>, set pre-paint by the inline script in layout
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerTheme = (): Theme => "dark";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    pixelTransition(() => {
      if (next === "light") root.dataset.theme = "light";
      else delete root.dataset.theme;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "light"}
      className="fixed top-3 right-4 md:top-5 md:right-6 z-40 flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[var(--color-bg)] text-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor-bright)] hover:bg-[var(--color-phosphor-ghost)] transition-colors text-[13px] leading-6 no-select"
    >
      <span aria-hidden className="inline-block w-[10px] h-[10px] rounded-full border border-current overflow-hidden relative">
        <span className={`absolute inset-y-0 left-0 w-1/2 bg-current ${theme === "light" ? "" : "translate-x-full"} transition-transform duration-200`} />
      </span>
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
}
