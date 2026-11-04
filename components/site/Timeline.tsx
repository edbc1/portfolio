"use client";

import { useEffect, useState } from "react";

export type TimelineEntry = {
  /** id of the element on the page this entry jumps to */
  id: string;
  label: string;
  /** section heading vs. an item inside a section */
  kind: "section" | "item";
};

/** sticky rail next to the content: every section and experience, the one in view highlighted */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-view-root='site']");
    if (!root) return;
    const onScroll = () => {
      // the last entry whose top has passed the line under the sticky header
      const line = root.getBoundingClientRect().top + 140;
      let current: string | null = null;
      for (const e of entries) {
        const el = document.getElementById(e.id);
        if (el && el.getBoundingClientRect().top <= line) current = e.id;
      }
      setActive(current);
    };
    onScroll();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
  }, [entries]);

  // a section stays lit while one of its items is the active entry
  const activeIndex = entries.findIndex((e) => e.id === active);
  let activeSection: string | null = null;
  for (let i = activeIndex; i >= 0; i--) {
    if (entries[i].kind === "section") {
      activeSection = entries[i].id;
      break;
    }
  }

  return (
    <nav aria-label="timeline" className="relative">
      <span aria-hidden className="absolute left-[3px] top-2 bottom-2 w-px bg-[var(--color-border)]" />
      <ol>
        {entries.map((e) => {
          const on = e.id === active || e.id === activeSection;
          return (
            <li key={e.id} className={e.kind === "section" ? "mt-5 first:mt-0" : "mt-1.5 pl-4"}>
              <a href={`#${e.id}`} className="group relative flex gap-3 pl-0">
                <span
                  aria-hidden
                  className={`relative mt-[7px] shrink-0 rounded-full transition-colors ${
                    e.kind === "section" ? "h-[7px] w-[7px]" : "ml-[1px] h-[5px] w-[5px]"
                  } ${on ? "bg-[var(--color-phosphor-bright)]" : "bg-[var(--color-border-bright)] group-hover:bg-[var(--color-phosphor-dim)]"}`}
                />
                <span className="min-w-0">
                  <span
                    className={`block truncate transition-colors ${
                      e.kind === "section" ? "text-[13px] font-semibold" : "text-[13px]"
                    } ${on ? "text-[var(--color-phosphor-bright)]" : "text-[var(--color-phosphor-faint)] group-hover:text-[var(--color-phosphor-dim)]"}`}
                  >
                    {e.label}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
