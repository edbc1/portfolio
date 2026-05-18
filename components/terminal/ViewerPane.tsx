"use client";

import { useEffect, useState } from "react";
import { projects } from "@/lib/terminal-content";

export function ViewerPane({
  gallery,
  onNavigate,
  onSetIndex,
}: {
  gallery: { projectId: string; index: number } | null;
  onNavigate: (direction: -1 | 1) => void;
  onSetIndex: (index: number) => void;
}) {
  if (!gallery) return <EmptyViewer />;

  const project = projects[gallery.projectId];
  if (!project) return <EmptyViewer />;

  const image = project.images[gallery.index];
  const total = project.images.length;

  return (
    <div className="h-full flex flex-col px-4 py-3 md:px-6 md:py-5">
      <div className="flex items-baseline justify-between text-[12px] text-[var(--color-phosphor-dim)] mb-3">
        <span className="uppercase tracking-[0.08em]">
          viewer · <span className="text-[var(--color-phosphor-bright)]">{project.title}</span>
        </span>
        <span className="text-[var(--color-phosphor-faint)]">
          {gallery.index + 1} / {total}
        </span>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center">
        <ImageFrame
          src={image.src}
          alt={image.alt ?? image.caption}
          label={project.title}
          index={gallery.index}
          total={total}
        />
      </div>

      <div className="mt-3 text-center text-[var(--color-phosphor-bright)]">{image.caption}</div>

      <div className="mt-3 flex items-center justify-between text-[12px] text-[var(--color-phosphor-dim)]">
        <button
          onClick={() => onNavigate(-1)}
          disabled={total <= 1}
          className="px-2 py-1 hover:text-[var(--color-phosphor-bright)] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="previous image"
        >
          ◂ prev
        </button>

        <div className="flex items-center gap-1.5">
          {project.images.map((_, i) => (
            <button
              key={i}
              onClick={() => onSetIndex(i)}
              aria-label={`go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === gallery.index
                  ? "w-6 bg-[var(--color-phosphor-bright)]"
                  : "w-1.5 bg-[var(--color-phosphor-faint)] hover:bg-[var(--color-phosphor-dim)]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => onNavigate(1)}
          disabled={total <= 1}
          className="px-2 py-1 hover:text-[var(--color-phosphor-bright)] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="next image"
        >
          next ▸
        </button>
      </div>

      <div className="mt-2 text-center text-[10px] text-[var(--color-phosphor-faint)]">
        ← → to navigate
      </div>
    </div>
  );
}

function ImageFrame({
  src,
  alt,
  label,
  index,
  total,
}: {
  src?: string;
  alt: string;
  label: string;
  index: number;
  total: number;
}) {
  return (
    <div className="relative w-full max-w-[520px] aspect-[4/3] border border-[var(--color-border-bright)] bg-[var(--color-bg-elev)] overflow-hidden">
      {/* corner ticks */}
      <Tick className="top-0 left-0 border-l border-t" />
      <Tick className="top-0 right-0 border-r border-t" />
      <Tick className="bottom-0 left-0 border-l border-b" />
      <Tick className="bottom-0 right-0 border-r border-b" />

      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "contrast(1.05) saturate(0.85) sepia(0.05) hue-rotate(60deg)" }}
        />
      ) : (
        <Placeholder label={label} index={index} total={total} />
      )}

      {/* scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.18) 3px)",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}

function Tick({ className }: { className: string }) {
  return (
    <span
      className={`absolute w-3 h-3 border-[var(--color-phosphor-bright)] ${className}`}
      style={{ borderWidth: 0 }}
    />
  );
}

function Placeholder({
  label,
  index,
  total,
}: {
  label: string;
  index: number;
  total: number;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(135deg, var(--color-phosphor-ghost) 25%, transparent 25%),
                            linear-gradient(225deg, var(--color-phosphor-ghost) 25%, transparent 25%),
                            linear-gradient(45deg, var(--color-phosphor-ghost) 25%, transparent 25%),
                            linear-gradient(315deg, var(--color-phosphor-ghost) 25%, transparent 25%)`,
          backgroundPosition: "12px 0, 12px 0, 0 0, 0 0",
          backgroundSize: "24px 24px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative text-center">
        <div className="text-[var(--color-phosphor-faint)] text-[10px] uppercase tracking-[0.2em]">
          {label}
        </div>
        <div className="text-[var(--color-phosphor-dim)] text-[12px] mt-1">
          screenshot {index + 1} of {total}
        </div>
        <div className="text-[var(--color-phosphor-faint)] text-[10px] mt-3">
          [ no source image yet ]
        </div>
      </div>
    </div>
  );
}

function EmptyViewer() {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 1000), 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-full flex flex-col px-4 py-3 md:px-6 md:py-5">
      <div className="text-[12px] uppercase tracking-[0.08em] text-[var(--color-phosphor-dim)] mb-3">
        viewer · idle
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="text-center font-mono leading-tight select-none">
          <pre className="text-[var(--color-phosphor-dim)] text-[10px] sm:text-[12px]">
{`        ╔══════════════════╗
        ║                  ║
        ║    PERSONAL/OS   ║
        ║                  ║
        ║   ┌──────────┐   ║
        ║   │  ▮ ▮ ▮   │   ║
        ║   │          │   ║
        ║   │   ░░░    │   ║
        ║   └──────────┘   ║
        ║                  ║
        ╚══════════════════╝`}
          </pre>
          <div className="mt-4 text-[var(--color-phosphor-faint)] text-[11px]">
            {"// no project open"}
          </div>
          <div className="text-[var(--color-phosphor-dim)] text-[11px] mt-1">
            try <span className="text-[var(--color-phosphor-bright)]">[1] work</span> to see projects
            <span className={pulse % 2 === 0 ? "opacity-100" : "opacity-0"}>_</span>
          </div>
        </div>
      </div>
    </div>
  );
}
