"use client";

import { useOs } from "@/lib/os-store";

export function BottomBar() {
  const order = useOs((s) => s.order);
  const windows = useOs((s) => s.windows);
  const restore = useOs((s) => s.restoreWindow);
  const focus = useOs((s) => s.focusWindow);
  const focused = order[order.length - 1];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-7 flex items-center px-3 text-[12px] border-t border-[var(--color-border)] bg-[var(--color-bg-elev)] z-50 no-select">
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        {order.map((id) => {
          const w = windows[id];
          if (!w) return null;
          const isFocused = id === focused && !w.minimized;
          return (
            <button
              key={id}
              onClick={() => (w.minimized ? restore(id) : focus(id))}
              className={`flex items-center gap-1.5 px-2 h-5 border max-w-[180px] truncate ${
                isFocused
                  ? "border-[var(--color-phosphor-bright)] text-[var(--color-phosphor-bright)]"
                  : "border-[var(--color-phosphor-faint)] text-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor)]"
              }`}
            >
              <span className="text-[10px]">{isFocused ? "▮" : w.minimized ? "▯" : "▯"}</span>
              <span className="truncate">{w.title}</span>
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-3 text-[var(--color-phosphor-dim)]">
        <span>⌘K search</span>
        <span className="text-[var(--color-phosphor-faint)]">·</span>
        <span>↵ open</span>
        <span className="text-[var(--color-phosphor-faint)]">·</span>
        <span>esc close</span>
      </div>
    </div>
  );
}
