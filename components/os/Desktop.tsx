"use client";

import { useEffect } from "react";
import { useOs } from "@/lib/os-store";
import { Window } from "./Window";
import { FileTree } from "./FileTree";
import { CommandPalette } from "./CommandPalette";
import { FileContent } from "@/components/content/FileContent";
import { MobileShell } from "./MobileShell";

export function Desktop({ initialOpen = "about" }: { initialOpen?: string }) {
  const order = useOs((s) => s.order);
  const windows = useOs((s) => s.windows);
  const openFile = useOs((s) => s.openFile);
  const focused = order[order.length - 1];

  useEffect(() => {
    if (initialOpen) openFile(initialOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialOpen]);

  return (
    <>
      {/* Mobile: simple stacked card view */}
      <div className="md:hidden absolute inset-0 top-7 bottom-7">
        <MobileShell />
      </div>

      {/* Desktop: file tree + windows */}
      <div className="hidden md:block">
        <FileTree />
        <main className="absolute left-56 top-7 bottom-7 right-0 overflow-hidden">
          {order.map((id) => {
            const w = windows[id];
            if (!w) return null;
            return (
              <Window key={id} window={w} focused={id === focused}>
                <FileContent path={w.filePath} />
              </Window>
            );
          })}
          {order.length === 0 && (
            <div className="absolute inset-0 grid place-items-center text-[var(--color-phosphor-faint)]">
              <div className="text-center">
                <div className="text-[24px] mb-2">▮</div>
                <div>click a file to open · or press ⌘K</div>
              </div>
            </div>
          )}
        </main>
      </div>

      <CommandPalette />
    </>
  );
}
