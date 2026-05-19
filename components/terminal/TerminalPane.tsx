"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { HistoryBlock } from "./Terminal";
import { projects, routes, type TermOption, type TermProject } from "@/lib/terminal-content";

export function TerminalPane({
  history,
  cwdLabel,
  onSubmit,
}: {
  history: HistoryBlock[];
  cwdLabel: string;
  onSubmit: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = () => inputRef.current?.focus();

  const runOption = (cmd: string) => {
    onSubmit(cmd);
    setValue("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <div
      ref={scrollRef}
      onClick={focusInput}
      className="h-full overflow-y-auto scroll-hidden px-4 py-3 md:px-6 md:py-5 text-[13px] leading-6"
    >
      <div className="mb-3 text-[var(--color-phosphor-dim)]">
        PERSONAL/OS  v2.0.0
      </div>

      {(() => {
        const freshStart = findFreshStart(history);
        return history.map((block, i) => (
          <div
            key={i}
            className="transition-opacity duration-300"
            style={{ opacity: i < freshStart ? 0.32 : 1 }}
          >
            <HistoryRow block={block} onOption={runOption} />
          </div>
        ));
      })()}

      <form onSubmit={handleSubmit} className="flex items-baseline gap-2 mt-1">
        <span className="text-[var(--color-phosphor-dim)] select-none">
          ed@personal.os <span className="text-[var(--color-phosphor-faint)]">{cwdLabel}</span> $
        </span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          className="flex-1 bg-transparent outline-none text-[var(--color-phosphor-bright)] caret-[var(--color-phosphor-bright)]"
        />
      </form>

      <div className="h-8" />
    </div>
  );
}

function findFreshStart(history: HistoryBlock[]): number {
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].kind === "input") return i;
  }
  return 0;
}

function HistoryRow({
  block,
  onOption,
}: {
  block: HistoryBlock;
  onOption: (cmd: string) => void;
}) {
  switch (block.kind) {
    case "greeting":
      return (
        <div className="mb-2 text-[var(--color-phosphor-bright)]">
          {block.lines.map((line, i) => (
            <div key={i}>{line.length === 0 ? " " : `> ${line}`}</div>
          ))}
        </div>
      );

    case "menu":
      return (
        <div className="mb-3">
          {block.options.map((opt) => (
            <OptionRow key={opt.number} opt={opt} onClick={() => onOption(opt.command)} />
          ))}
        </div>
      );

    case "input":
      return (
        <div className="text-[var(--color-phosphor-dim)] mt-1 mb-1">
          ed@personal.os{" "}
          <span className="text-[var(--color-phosphor-faint)]">
            {block.cwd === "root" ? "~" : `~/${block.cwd}`}
          </span>{" "}
          ${" "}
          <span className="text-[var(--color-phosphor-bright)]">{block.text}</span>
        </div>
      );

    case "text":
      return (
        <div className="mb-2">
          {block.lines.map((line, i) => (
            <div key={i}>{line.length === 0 ? " " : line}</div>
          ))}
        </div>
      );

    case "project":
      return <ProjectBlock project={block.project} onOption={onOption} />;

    case "error":
      return (
        <div className="mb-2 text-[#d97a7a]">
          <span className="text-[var(--color-phosphor-faint)]">!</span> {block.text}
        </div>
      );
  }
}

function OptionRow({ opt, onClick }: { opt: TermOption; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group block w-full text-left -mx-1 px-1 py-0.5 rounded-sm hover:bg-[var(--color-phosphor-ghost)] transition-colors"
    >
      <span className="text-[var(--color-phosphor-dim)] group-hover:text-[var(--color-phosphor-bright)]">
        [{opt.number}]
      </span>{" "}
      <span className="text-[var(--color-phosphor-bright)] group-hover:underline underline-offset-4">
        {opt.label}
      </span>
      {opt.hint && (
        <span className="text-[var(--color-phosphor-faint)] ml-2 group-hover:text-[var(--color-phosphor-dim)]">
          {opt.hint}
        </span>
      )}
    </button>
  );
}

function ProjectBlock({
  project,
  onOption,
}: {
  project: TermProject;
  onOption: (cmd: string) => void;
}) {
  return (
    <div className="mb-3">
      <div className="text-[var(--color-phosphor-bright)] uppercase tracking-[0.08em] text-[14px]">
        {project.title}
        <span className="text-[var(--color-phosphor-faint)] normal-case tracking-normal text-[12px] ml-2">
          {project.year} · {project.tag}
        </span>
      </div>
      <div className="text-[var(--color-phosphor-dim)] mb-2">
        ─────────────────────────────
      </div>
      <div className="mb-2">{project.oneLiner}</div>
      <div className="mb-3">
        {project.body.map((line, i) => (
          <div key={i}>
            <span className="text-[var(--color-phosphor-dim)]">·</span> {line}
          </div>
        ))}
      </div>

      {project.images.length > 0 && (
        <div className="mb-3 -mx-4 md:-mx-6">
          <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-hidden px-4 md:px-6 pb-2">
            {project.images.map((img, i) => (
              <ImageTile
                key={i}
                src={img.src}
                alt={img.alt ?? img.caption}
                caption={img.caption}
                index={i}
                total={project.images.length}
              />
            ))}
          </div>
        </div>
      )}

      {project.links && project.links.length > 0 && (
        <div className="mb-3">
          {project.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-phosphor-bright)] underline underline-offset-4 mr-3"
            >
              {l.label} →
            </a>
          ))}
        </div>
      )}

      <ProjectNav project={project} onOption={onOption} />
    </div>
  );
}

function ProjectNav({
  project,
  onOption,
}: {
  project: TermProject;
  onOption: (cmd: string) => void;
}) {
  const workOpts = routes.work?.options ?? [];
  const ids = workOpts
    .map((o) => o.command.replace(/^open\s+/, ""))
    .filter((id) => projects[id]);
  const idx = ids.indexOf(project.id);
  const nextId = idx >= 0 ? ids[(idx + 1) % ids.length] : null;
  const next = nextId ? projects[nextId] : null;

  const options: TermOption[] = [
    { number: 1, command: "back", label: "back to work" },
  ];
  if (next) {
    options.push({
      number: 2,
      command: `open ${next.id}`,
      label: `next experience — ${next.title}`,
    });
  }

  return (
    <div className="mt-1">
      {options.map((opt) => (
        <OptionRow key={opt.number} opt={opt} onClick={() => onOption(opt.command)} />
      ))}
    </div>
  );
}

function ImageTile({
  src,
  alt,
  caption,
  index,
  total,
}: {
  src?: string;
  alt: string;
  caption: string;
  index: number;
  total: number;
}) {
  return (
    <div className="shrink-0 w-[320px]">
      <div className="relative w-full aspect-[4/3] border border-[var(--color-border-bright)] bg-[var(--color-bg-elev)] overflow-hidden">
        {src ? (
          /\.(mp4|webm|mov)$/i.test(src) ? (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          <TilePlaceholder label={caption} index={index} total={total} />
        )}
      </div>
      <div className="text-[var(--color-phosphor-faint)] text-[11px] mt-2 leading-snug">
        {caption}
      </div>
    </div>
  );
}

function TilePlaceholder({
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
      <div className="relative text-center px-3">
        <div className="text-[var(--color-phosphor-faint)] text-[10px] uppercase tracking-[0.2em]">
          {label}
        </div>
        <div className="text-[var(--color-phosphor-dim)] text-[12px] mt-1">
          {index + 1} / {total}
        </div>
      </div>
    </div>
  );
}
