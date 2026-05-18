"use client";

import { useState } from "react";
import { fileSystem, flattenFiles } from "@/lib/fs";
import { FileContent } from "@/components/content/FileContent";

const topLevel = fileSystem.children ?? [];

export function MobileShell() {
  const [activePath, setActivePath] = useState<string>("about");
  const [openSection, setOpenSection] = useState<string | null>("projects");
  const allFiles = flattenFiles(fileSystem);

  return (
    <div className="h-full flex flex-col">
      {/* Tab bar */}
      <div className="flex overflow-x-auto scroll-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-elev)] no-select">
        {topLevel.map((node) => {
          if (node.type === "file") {
            const active = activePath === node.path;
            return (
              <button
                key={node.id}
                onClick={() => setActivePath(node.path)}
                className={`px-3 py-2 text-[12px] whitespace-nowrap border-r border-[var(--color-border)] ${
                  active
                    ? "text-[var(--color-phosphor-bright)] bg-[var(--color-bg-titlebar)]"
                    : "text-[var(--color-phosphor-dim)]"
                }`}
              >
                {active ? "● " : "  "}
                {node.name}
              </button>
            );
          }
          const open = openSection === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setOpenSection(open ? null : node.id)}
              className={`px-3 py-2 text-[12px] whitespace-nowrap border-r border-[var(--color-border)] ${
                open
                  ? "text-[var(--color-phosphor-bright)] bg-[var(--color-bg-titlebar)]"
                  : "text-[var(--color-phosphor-dim)]"
              }`}
            >
              {open ? "▾ " : "▸ "}
              {node.name}/
            </button>
          );
        })}
      </div>

      {/* Sub-list for open section */}
      {openSection && (
        <div className="flex overflow-x-auto scroll-hidden border-b border-[var(--color-border)] bg-[var(--color-bg)] no-select">
          {allFiles
            .filter((f) => f.path.startsWith(`${openSection}/`))
            .map((f) => {
              const active = activePath === f.path;
              return (
                <button
                  key={f.id}
                  onClick={() => setActivePath(f.path)}
                  className={`px-3 py-1.5 text-[11px] whitespace-nowrap ${
                    active
                      ? "text-[var(--color-phosphor-bright)]"
                      : "text-[var(--color-phosphor-dim)]"
                  }`}
                >
                  {active ? "● " : "  "}
                  {f.name}
                </button>
              );
            })}
        </div>
      )}

      {/* Content card */}
      <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-4">
        <div className="border border-[var(--color-border-bright)] bg-[var(--color-bg-window)] window-focused">
          <div className="px-3 py-1.5 border-b border-[var(--color-border)] text-[12px] text-[var(--color-phosphor-bright)] bg-[var(--color-bg-titlebar)]">
            ▮ {activePath === "about" ? "about.me" : activePath === "contact" ? "contact.sh" : `${activePath}.md`}
          </div>
          <div className="p-4 prose-os">
            <FileContent path={activePath} />
          </div>
        </div>
      </div>
    </div>
  );
}
