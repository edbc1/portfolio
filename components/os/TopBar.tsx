"use client";

import { useEffect, useState } from "react";
import { useOs } from "@/lib/os-store";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatUptime(ms: number) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function TopBar() {
  const [now, setNow] = useState<Date | null>(null);
  const [bootTime, setBootTime] = useState<number | null>(null);
  const togglePalette = useOs((s) => s.togglePalette);

  useEffect(() => {
    setNow(new Date());
    setBootTime(Date.now());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const clock = now ? `${pad(now.getHours())}:${pad(now.getMinutes())}` : "--:--";
  const uptime = bootTime && now ? formatUptime(now.getTime() - bootTime) : "00:00:00";

  return (
    <div className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 text-[12px] border-b border-[var(--color-border)] bg-[var(--color-bg-elev)] z-50 no-select">
      <div className="flex items-center gap-3">
        <span className="text-[var(--color-phosphor-bright)]">●</span>
        <span>ed@rocapine.os</span>
        <span className="text-[var(--color-phosphor-faint)]">·</span>
        <span className="text-[var(--color-phosphor-dim)]">v1.0.0</span>
      </div>
      <div className="flex-1" />
      <button
        onClick={togglePalette}
        className="text-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor-bright)] px-2"
      >
        ⌘K search
      </button>
      <span className="text-[var(--color-phosphor-faint)] mx-2">·</span>
      <span className="text-[var(--color-phosphor-dim)]">up {uptime}</span>
      <span className="text-[var(--color-phosphor-faint)] mx-2">·</span>
      <span>{clock}</span>
    </div>
  );
}
