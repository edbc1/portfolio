"use client";

import { useState } from "react";
import { fileSystem, type FsNode } from "@/lib/fs";
import { useOs } from "@/lib/os-store";

function NodeRow({
  node,
  depth,
  expanded,
  onToggle,
}: {
  node: FsNode;
  depth: number;
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const openFile = useOs((s) => s.openFile);
  const order = useOs((s) => s.order);
  const focused = order[order.length - 1];
  const isOpen = node.type === "directory" ? expanded[node.id] : false;
  const isActiveFile = node.type === "file" && focused === node.path;

  const onClick = () => {
    if (node.type === "directory") onToggle(node.id);
    else openFile(node.path);
  };

  const prefix =
    node.type === "directory" ? (isOpen ? "▾" : "▸") : isActiveFile ? "●" : " ";

  return (
    <>
      <button
        onClick={onClick}
        className={`w-full text-left flex items-center gap-1.5 py-0.5 px-1 hover:bg-[var(--color-bg-titlebar)] ${
          isActiveFile
            ? "text-[var(--color-phosphor-bright)]"
            : "text-[var(--color-phosphor)]"
        }`}
        style={{ paddingLeft: depth * 12 + 4 }}
      >
        <span
          className={`w-3 text-center ${
            node.type === "directory"
              ? "text-[var(--color-phosphor-dim)]"
              : isActiveFile
              ? "text-[var(--color-phosphor-bright)]"
              : "text-[var(--color-phosphor-faint)]"
          }`}
        >
          {prefix}
        </span>
        <span className="truncate">
          {node.name}
          {node.type === "directory" && node.path !== "" ? "/" : ""}
        </span>
      </button>
      {node.type === "directory" &&
        isOpen &&
        node.children?.map((child) => (
          <NodeRow
            key={child.id}
            node={child}
            depth={depth + 1}
            expanded={expanded}
            onToggle={onToggle}
          />
        ))}
    </>
  );
}

export function FileTree() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    projects: true,
  });
  const toggle = (id: string) =>
    setExpanded((s) => ({ ...s, [id]: !s[id] }));

  return (
    <aside className="absolute left-0 top-7 bottom-7 w-56 border-r border-[var(--color-border)] bg-[var(--color-bg-elev)] py-3 overflow-y-auto scroll-hidden z-30 no-select">
      <div className="px-3 mb-3 text-[var(--color-phosphor-bright)]">
        <div className="text-[14px] tracking-[0.08em] uppercase">Rocapine/OS</div>
        <div className="text-[10px] text-[var(--color-phosphor-faint)] mt-0.5">
          ─────────────
        </div>
      </div>
      <div className="text-[12px]">
        {fileSystem.children?.map((node) => (
          <NodeRow
            key={node.id}
            node={node}
            depth={0}
            expanded={expanded}
            onToggle={toggle}
          />
        ))}
      </div>
      <div className="px-3 mt-6 text-[10px] text-[var(--color-phosphor-faint)] leading-relaxed">
        ─────────────
        <div className="mt-2">tip: ⌘K opens search</div>
        <div>click any file to open</div>
      </div>
    </aside>
  );
}
