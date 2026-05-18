"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { HistoryBlock } from "./Terminal";
import type { TermOption, TermProject } from "@/lib/terminal-content";

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
        <span className="text-[var(--color-phosphor-faint)]"> · terminal mode</span>
      </div>

      {history.map((block, i) => (
        <HistoryRow key={i} block={block} onOption={runOption} />
      ))}

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
          <div className="text-[var(--color-phosphor-faint)] text-[12px] mt-1.5">
            type a number, a name, or click an option · `help` for more
          </div>
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
        <div className="mb-2 text-[#ff9b9b]">
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
      <div className="text-[var(--color-phosphor-faint)] text-[12px] mb-1">
        viewer ▸ {project.images.length} image{project.images.length !== 1 ? "s" : ""} on the right
      </div>
      {project.links && project.links.length > 0 && (
        <div className="mb-1">
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
      <button
        onClick={() => onOption("back")}
        className="text-[var(--color-phosphor-dim)] hover:text-[var(--color-phosphor-bright)] underline-offset-4 hover:underline mt-1"
      >
        ← back to work
      </button>
    </div>
  );
}
