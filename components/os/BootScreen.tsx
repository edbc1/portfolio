"use client";

import { useEffect, useState } from "react";

const lines: { text: string; delay: number; trailing?: string }[] = [
  { text: "PERSONAL/OS  v1.0.0", delay: 0 },
  { text: "Copyright (c) 2026 Ed Bucaille", delay: 80 },
  { text: "─────────────────────────────────────", delay: 160 },
  { text: "", delay: 200 },
  { text: "POST", delay: 280 },
  { text: "  CPU                          OK", delay: 380, trailing: "ok" },
  { text: "  MEMORY      256MB            OK", delay: 480, trailing: "ok" },
  { text: "  DISPLAY     80×24            OK", delay: 580, trailing: "ok" },
  { text: "  NETWORK                      OK", delay: 680, trailing: "ok" },
  { text: "", delay: 760 },
  { text: "Loading kernel ............... ok", delay: 860 },
  { text: "Mounting /home/ed ............ ok", delay: 960 },
  { text: "Starting portfolio.service ... ok", delay: 1080 },
  { text: "Loading 4 projects ........... ok", delay: 1200 },
  { text: "", delay: 1300 },
  { text: "Welcome, visitor.", delay: 1480 },
  { text: "", delay: 1580 },
  { text: "▮ press any key to enter", delay: 1700 },
];

const TOTAL_DURATION = 2200;

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((line, i) => {
      timers.push(setTimeout(() => setShown((s) => Math.max(s, i + 1)), line.delay));
    });
    timers.push(setTimeout(() => setShown(lines.length), TOTAL_DURATION));
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const finish = () => {
      if (exiting) return;
      setExiting(true);
      setTimeout(onDone, 320);
    };
    const onKey = () => finish();
    const onClick = () => finish();
    const autoTimer = setTimeout(finish, TOTAL_DURATION + 1400);
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onClick);
    return () => {
      clearTimeout(autoTimer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onClick);
    };
  }, [exiting, onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9000] bg-[var(--color-bg)] flex items-start justify-center p-10 sm:p-16 transition-opacity duration-300 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <pre className="text-[var(--color-phosphor)] text-[13px] leading-[1.55] font-mono whitespace-pre">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className="boot-flash">
            {l.text || " "}
          </div>
        ))}
        {shown >= lines.length && (
          <div className="opacity-60 mt-3">[tap, click, or press any key]</div>
        )}
      </pre>
    </div>
  );
}
