"use client";

import { create } from "zustand";
import { findNode, titleFor } from "./fs";

export type WindowState = {
  id: string;
  filePath: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
};

type OsState = {
  windows: Record<string, WindowState>;
  order: string[];
  paletteOpen: boolean;
  consoleOpen: boolean;
  bootDone: boolean;

  openFile: (path: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  togglePalette: () => void;
  setPalette: (open: boolean) => void;
  setBootDone: (v: boolean) => void;
};

const cascadeOffset = (idx: number) => ({
  x: 80 + idx * 28,
  y: 70 + idx * 28,
});

export const useOs = create<OsState>((set, get) => ({
  windows: {},
  order: [],
  paletteOpen: false,
  consoleOpen: false,
  bootDone: false,

  openFile: (path) => {
    const node = findNode(path);
    if (!node || node.type !== "file") return;
    const id = path;
    const existing = get().windows[id];
    if (existing) {
      get().restoreWindow(id);
      get().focusWindow(id);
      return;
    }
    const offset = cascadeOffset(get().order.length);
    const size = node.defaultSize ?? { width: 560, height: 440 };
    const maxW = typeof window !== "undefined" ? window.innerWidth - 40 : 900;
    const maxH = typeof window !== "undefined" ? window.innerHeight - 100 : 600;
    const win: WindowState = {
      id,
      filePath: path,
      title: titleFor(path),
      x: Math.min(offset.x, Math.max(20, maxW - size.width - 20)),
      y: Math.min(offset.y, Math.max(60, maxH - size.height - 20)),
      width: Math.min(size.width, maxW),
      height: Math.min(size.height, maxH),
      minimized: false,
    };
    set((s) => ({
      windows: { ...s.windows, [id]: win },
      order: [...s.order.filter((x) => x !== id), id],
    }));
  },

  closeWindow: (id) =>
    set((s) => {
      const next = { ...s.windows };
      delete next[id];
      return {
        windows: next,
        order: s.order.filter((x) => x !== id),
      };
    }),

  focusWindow: (id) =>
    set((s) => {
      if (!s.windows[id]) return s;
      return { order: [...s.order.filter((x) => x !== id), id] };
    }),

  moveWindow: (id, x, y) =>
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      return { windows: { ...s.windows, [id]: { ...w, x, y } } };
    }),

  resizeWindow: (id, w, h) =>
    set((s) => {
      const win = s.windows[id];
      if (!win) return s;
      return {
        windows: {
          ...s.windows,
          [id]: { ...win, width: Math.max(280, w), height: Math.max(180, h) },
        },
      };
    }),

  minimizeWindow: (id) =>
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      return { windows: { ...s.windows, [id]: { ...w, minimized: true } } };
    }),

  restoreWindow: (id) =>
    set((s) => {
      const w = s.windows[id];
      if (!w) return s;
      return {
        windows: { ...s.windows, [id]: { ...w, minimized: false } },
        order: [...s.order.filter((x) => x !== id), id],
      };
    }),

  togglePalette: () => set((s) => ({ paletteOpen: !s.paletteOpen })),
  setPalette: (open) => set({ paletteOpen: open }),
  setBootDone: (v) => set({ bootDone: v }),
}));
