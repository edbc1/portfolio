"use client";

import { useSyncExternalStore } from "react";
import { Site } from "./site/Site";
import { Terminal } from "./terminal/Terminal";
import { pixelTransition } from "./pixelTransition";

type View = "site" | "terminal";

// view lives on <html data-view>, set pre-paint by the inline script in layout
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-view"] });
  return () => observer.disconnect();
}
const getView = (): View => (document.documentElement.dataset.view === "terminal" ? "terminal" : "site");
const getServerView = (): View => "site";

export function Views() {
  const view = useSyncExternalStore(subscribe, getView, getServerView);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next: View = view === "site" ? "terminal" : "site";
    const root = document.documentElement;

    pixelTransition(() => {
      if (next === "terminal") root.dataset.view = "terminal";
      else delete root.dataset.view;
      try {
        localStorage.setItem("view", next);
      } catch {}
    });
  };

  return (
    <>
      {view === "terminal" ? <Terminal /> : <Site />}
      <button
        type="button"
        onClick={toggle}
        aria-label={`switch to ${view === "site" ? "terminal" : "default"} view`}
        aria-pressed={view === "terminal"}
        className="fixed top-3 right-4 md:top-5 md:right-6 z-[70] flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-[var(--color-bg)] text-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor-bright)] hover:bg-[var(--color-phosphor-ghost)] transition-colors text-[13px] leading-6 no-select"
      >
        <span aria-hidden className="inline-block w-[10px] h-[10px] rounded-full border border-current overflow-hidden relative">
          <span className={`absolute inset-y-0 left-0 w-1/2 bg-current ${view === "site" ? "" : "translate-x-full"} transition-transform duration-200`} />
        </span>
        {view === "site" ? "terminal" : "light"}
      </button>
    </>
  );
}
