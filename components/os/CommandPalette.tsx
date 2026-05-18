"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useOs } from "@/lib/os-store";
import { flattenFiles, fileSystem } from "@/lib/fs";

type Item = {
  id: string;
  label: string;
  hint?: string;
  action: () => void;
};

export function CommandPalette() {
  const open = useOs((s) => s.paletteOpen);
  const setOpen = useOs((s) => s.setPalette);
  const openFile = useOs((s) => s.openFile);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!useOs.getState().paletteOpen);
      } else if (e.key === "Escape") {
        if (useOs.getState().paletteOpen) {
          e.preventDefault();
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const items: Item[] = useMemo(() => {
    const files = flattenFiles(fileSystem).map<Item>((node) => ({
      id: node.path,
      label: node.path,
      hint: "file",
      action: () => {
        openFile(node.path);
        setOpen(false);
      },
    }));
    const commands: Item[] = [
      {
        id: "contact-email",
        label: "email ed@rocapine.com",
        hint: "command",
        action: () => {
          window.location.href = "mailto:ed@rocapine.com";
          setOpen(false);
        },
      },
      {
        id: "open-about",
        label: "open about.me",
        hint: "command",
        action: () => {
          openFile("about");
          setOpen(false);
        },
      },
    ];
    return [...files, ...commands];
  }, [openFile, setOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.action();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[8000] flex items-start justify-center pt-[18vh] px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-[var(--color-bg-window)] border border-[var(--color-phosphor-bright)] w-full max-w-xl window-focused"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--color-border)]">
          <span className="text-[var(--color-phosphor-bright)]">⌘K</span>
          <span className="text-[var(--color-phosphor-faint)]">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="type to search files and commands"
            className="flex-1 bg-transparent outline-none text-[var(--color-phosphor)] placeholder:text-[var(--color-phosphor-faint)]"
          />
        </div>
        <div className="max-h-[42vh] overflow-y-auto scroll-hidden">
          {filtered.length === 0 ? (
            <div className="px-3 py-4 text-[var(--color-phosphor-faint)] text-[12px]">
              no matches
            </div>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.id}
                onMouseEnter={() => setActive(i)}
                onClick={item.action}
                className={`w-full text-left flex items-center gap-2 px-3 py-1.5 ${
                  i === active
                    ? "bg-[var(--color-bg-titlebar)] text-[var(--color-phosphor-bright)]"
                    : "text-[var(--color-phosphor)]"
                }`}
              >
                <span
                  className={
                    i === active
                      ? "text-[var(--color-phosphor-bright)]"
                      : "text-[var(--color-phosphor-faint)]"
                  }
                >
                  {i === active ? "▸" : " "}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.hint && (
                  <span className="text-[10px] text-[var(--color-phosphor-faint)] uppercase tracking-wider">
                    {item.hint}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
        <div className="px-3 py-1.5 border-t border-[var(--color-border)] text-[10px] text-[var(--color-phosphor-faint)] flex items-center gap-3">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
