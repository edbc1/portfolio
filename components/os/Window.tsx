"use client";

import { useRef, type ReactNode } from "react";
import { useOs, type WindowState } from "@/lib/os-store";

export function Window({
  window: w,
  focused,
  children,
}: {
  window: WindowState;
  focused: boolean;
  children: ReactNode;
}) {
  const moveWindow = useOs((s) => s.moveWindow);
  const resizeWindow = useOs((s) => s.resizeWindow);
  const focusWindow = useOs((s) => s.focusWindow);
  const closeWindow = useOs((s) => s.closeWindow);
  const minimizeWindow = useOs((s) => s.minimizeWindow);

  const dragRef = useRef({
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    active: false,
  });
  const resizeRef = useRef({
    startX: 0,
    startY: 0,
    origW: 0,
    origH: 0,
    active: false,
  });

  const onTitleDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-window-button]")) return;
    focusWindow(w.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: w.x,
      origY: w.y,
      active: true,
    };
  };

  const onTitleMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const maxX = typeof globalThis.window !== "undefined" ? globalThis.window.innerWidth - 60 : 9999;
    const maxY = typeof globalThis.window !== "undefined" ? globalThis.window.innerHeight - 60 : 9999;
    const nextX = Math.max(-w.width + 80, Math.min(dragRef.current.origX + dx, maxX));
    const nextY = Math.max(28, Math.min(dragRef.current.origY + dy, maxY));
    moveWindow(w.id, nextX, nextY);
  };

  const onTitleUp = (e: React.PointerEvent) => {
    dragRef.current.active = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const onResizeDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    focusWindow(w.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origW: w.width,
      origH: w.height,
      active: true,
    };
  };

  const onResizeMove = (e: React.PointerEvent) => {
    if (!resizeRef.current.active) return;
    const dx = e.clientX - resizeRef.current.startX;
    const dy = e.clientY - resizeRef.current.startY;
    resizeWindow(w.id, resizeRef.current.origW + dx, resizeRef.current.origH + dy);
  };

  const onResizeUp = (e: React.PointerEvent) => {
    resizeRef.current.active = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  if (w.minimized) return null;

  const zIndex = focused ? 40 : 30;

  return (
    <div
      className={`absolute bg-[var(--color-bg-window)] flex flex-col ${
        focused ? "window-focused" : "window-unfocused"
      }`}
      style={{
        left: w.x,
        top: w.y,
        width: w.width,
        height: w.height,
        zIndex,
      }}
      onPointerDownCapture={() => !focused && focusWindow(w.id)}
    >
      {/* Title bar */}
      <div
        onPointerDown={onTitleDown}
        onPointerMove={onTitleMove}
        onPointerUp={onTitleUp}
        onPointerCancel={onTitleUp}
        className={`h-7 flex items-center px-2.5 gap-2 border-b border-[var(--color-border)] no-select touch-none ${
          focused
            ? "bg-[var(--color-bg-titlebar)] text-[var(--color-phosphor-bright)] cursor-grab active:cursor-grabbing"
            : "bg-[var(--color-bg-elev)] text-[var(--color-phosphor-dim)]"
        }`}
      >
        <span className="text-[10px] tracking-wider">
          {focused ? "▮" : "▯"}
        </span>
        <span className="text-[12px] truncate flex-1">{w.title}</span>
        <div className="flex items-center gap-1 text-[var(--color-phosphor-dim)] text-[12px]">
          <button
            data-window-button
            onClick={() => minimizeWindow(w.id)}
            className="hover:text-[var(--color-phosphor-bright)] w-5 h-5 grid place-items-center"
            aria-label="minimize"
          >
            _
          </button>
          <button
            data-window-button
            onClick={() => closeWindow(w.id)}
            className="hover:text-[var(--color-phosphor-bright)] w-5 h-5 grid place-items-center"
            aria-label="close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-hidden p-5 prose-os">
        {children}
      </div>

      {/* Resize handle */}
      <div
        onPointerDown={onResizeDown}
        onPointerMove={onResizeMove}
        onPointerUp={onResizeUp}
        onPointerCancel={onResizeUp}
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize touch-none"
        style={{
          background:
            "linear-gradient(135deg, transparent 50%, var(--color-phosphor-faint) 50%, var(--color-phosphor-faint) 65%, transparent 65%, transparent 75%, var(--color-phosphor-faint) 75%, var(--color-phosphor-faint) 90%, transparent 90%)",
        }}
      />
    </div>
  );
}
