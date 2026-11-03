"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { HistoryBlock } from "./Terminal";
import { projects, routes, type TermOption, type TermProject } from "@/lib/terminal-content";

type ZoomItem = { src: string; alt: string; caption: string; isVideo: boolean; frame?: "phone" };
/** a gallery (all images of one project) opened at `index` */
type ZoomTarget = { items: ZoomItem[]; index: number };

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

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
  const [zoom, setZoom] = useState<ZoomTarget | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        setZoom((z) => (z ? { ...z, index: (z.index + dir + z.items.length) % z.items.length } : z));
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoom]);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // long output (e.g. the playground feed): keep the command at the top
    // instead of jumping past the content to the prompt
    const fresh = el.querySelector<HTMLElement>("[data-fresh-start]");
    const top = fresh ? fresh.offsetTop - 12 : 0;
    el.scrollTop = fresh && el.scrollHeight - top > el.clientHeight ? top : el.scrollHeight;
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
      className="relative h-full overflow-y-auto scroll-hidden px-4 py-3 md:px-6 md:py-5 text-[13px] leading-6"
    >
      <div className="mb-3 text-[var(--color-phosphor-dim)]">
        PERSONAL/OS  v2.0.0
      </div>

      {(() => {
        const freshStart = findFreshStart(history);
        return history.map((block, i) => (
          <div
            key={i}
            data-fresh-start={i === freshStart && freshStart > 0 ? "" : undefined}
            className="transition-opacity duration-300"
            style={{ opacity: i < freshStart ? 0.32 : 1 }}
          >
            <HistoryRow block={block} onOption={runOption} onZoom={setZoom} />
          </div>
        ));
      })()}

      <form onSubmit={handleSubmit} className="flex items-baseline gap-2 mt-10">
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

      {zoom && (
        <Lightbox
          target={zoom}
          onClose={() => setZoom(null)}
          onStep={(dir) =>
            setZoom((z) => (z ? { ...z, index: (z.index + dir + z.items.length) % z.items.length } : z))
          }
        />
      )}
    </div>
  );
}

function Lightbox({
  target,
  onClose,
  onStep,
}: {
  target: ZoomTarget;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const { items, index } = target;
  const item = items[index];
  const many = items.length > 1;
  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 h-12 w-12 md:h-14 md:w-14 flex items-center justify-center text-[var(--color-phosphor-bright)] text-[22px] border border-[var(--color-border-bright)] bg-[var(--color-bg)]/70 hover:bg-[var(--color-phosphor-ghost)] select-none";

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-overlay)] backdrop-blur-sm px-4 py-8 md:px-12 md:py-12"
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="close"
        className="absolute top-4 right-4 text-[var(--color-phosphor-bright)] text-[12px] uppercase tracking-[0.2em] border border-[var(--color-border-bright)] px-2 py-1 hover:bg-[var(--color-phosphor-ghost)]"
      >
        [esc] close
      </button>

      {many && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
            aria-label="previous image"
            className={`${arrowClass} left-2 md:left-6`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
            aria-label="next image"
            className={`${arrowClass} right-2 md:right-6`}
          >
            →
          </button>
        </>
      )}

      <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-3 max-w-[min(1600px,95vw)]">
        <div
          className={
            item.frame === "phone"
              ? "relative max-h-[82vh] rounded-[52px] bg-black p-[10px] shadow-[0_0_0_1px_var(--color-border-bright)] flex"
              : "relative max-h-[82vh] border border-[var(--color-border-bright)] bg-[var(--color-bg-elev)] overflow-hidden flex"
          }
        >
          {item.isVideo ? (
            <video
              key={item.src}
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="max-w-[min(1600px,95vw)] max-h-[82vh] w-auto h-auto block"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className={
                item.frame === "phone"
                  ? "max-w-[min(1600px,95vw)] max-h-[calc(82vh-20px)] w-auto h-auto block rounded-[42px]"
                  : "max-w-[min(1600px,95vw)] max-h-[82vh] w-auto h-auto block"
              }
            />
          )}
        </div>
        <div className="text-[12px] text-[var(--color-phosphor-dim)] text-center px-2">
          {many && (
            <span className="text-[var(--color-phosphor-faint)] mr-3">
              {index + 1} / {items.length}
            </span>
          )}
          {item.caption}
          {many && <span className="text-[var(--color-phosphor-faint)] ml-3 hidden md:inline">← → to browse</span>}
        </div>
      </div>
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
  onZoom,
}: {
  block: HistoryBlock;
  onOption: (cmd: string) => void;
  onZoom: (t: ZoomTarget) => void;
}) {
  switch (block.kind) {
    case "greeting":
      return (
        <div className="mb-2 text-[var(--color-phosphor-bright)]">
          {block.lines.map((line, i) => (
            <div key={i} className={block.heading && i === 0 ? "font-semibold mb-1" : undefined}>
              {line.length === 0 ? " " : line}
            </div>
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
        <div className="text-[var(--color-phosphor-dim)] mt-10 mb-6">
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
      return <ProjectBlock project={block.project} inline={block.inline} onOption={onOption} onZoom={onZoom} />;

    case "error":
      return (
        <div className="mb-2 text-[var(--color-error)]">
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
  inline,
  nested,
  onOption,
  onZoom,
}: {
  project: TermProject;
  inline?: boolean;
  /** rendered inside a parent project (no nav, tighter spacing) */
  nested?: boolean;
  onOption: (cmd: string) => void;
  onZoom: (t: ZoomTarget) => void;
}) {
  const links = project.links ?? [];
  const described = links.filter((l) => l.description);
  const plain = links.filter((l) => !l.description);
  const childGroups = (project.childGroups ?? [])
    .map((g) => ({ ...g, ids: g.ids.filter((id) => projects[id]) }))
    .filter((g) => g.ids.length > 0);

  return (
    <div className={nested ? "mb-8" : inline ? "mb-10" : "mb-3"}>
      <div className="text-[var(--color-phosphor-bright)] font-semibold uppercase tracking-[0.08em] text-[14px] mb-2">
        {project.title}
        <span className="text-[var(--color-phosphor-faint)] font-normal normal-case tracking-normal text-[12px] ml-2">
          {project.year} · {project.tag}
        </span>
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
          <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-none px-4 md:px-6 pt-1 pb-2">
            {project.images.map((img, i) => (
              <ImageTile
                key={i}
                src={img.src}
                alt={img.alt ?? img.caption}
                caption={img.caption}
                index={i}
                total={project.images.length}
                frame={project.imageFrame}
                onZoom={() => {
                  const items: ZoomItem[] = project.images
                    .filter((im): im is typeof im & { src: string } => !!im.src)
                    .map((im) => ({
                      src: im.src,
                      alt: im.alt ?? im.caption,
                      caption: im.caption,
                      isVideo: isVideoSrc(im.src),
                      frame: project.imageFrame,
                    }));
                  const index = Math.max(0, items.findIndex((it) => it.src === img.src));
                  onZoom({ items, index });
                }}
              />
            ))}
          </div>
        </div>
      )}

      {described.length > 0 && (
        <div className="mb-3">
          {project.linksTitle && <div className="mb-1">{project.linksTitle}</div>}
          {described.map((l) => (
            <div key={l.url}>
              <span className="text-[var(--color-phosphor-dim)]">→</span>{" "}
              <a
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-phosphor-bright)] underline underline-offset-4"
              >
                {l.label}
              </a>
              <span className="text-[var(--color-phosphor-faint)] ml-2">{l.description}</span>
            </div>
          ))}
        </div>
      )}

      {childGroups.map((g) => (
        <div key={g.title} className="mt-6 mb-3">
          <div className="mb-4 text-[var(--color-phosphor-dim)]">{g.title}</div>
          <div className="pl-3 md:pl-4 border-l border-[var(--color-border-bright)]">
            {g.ids.map((id) => (
              <ProjectBlock key={id} project={projects[id]} nested onOption={onOption} onZoom={onZoom} />
            ))}
          </div>
        </div>
      ))}

      {plain.length > 0 && (
        <div className="mb-3">
          {plain.map((l) => (
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

      {!inline && !nested && <ProjectNav project={project} onOption={onOption} />}
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
    { number: 1, command: "back", label: idx >= 0 ? "back to work" : "back" },
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
  frame,
  onZoom,
}: {
  src?: string;
  alt: string;
  caption: string;
  index: number;
  total: number;
  frame?: "phone";
  onZoom: () => void;
}) {
  if (!src) {
    return (
      <div className="shrink-0 w-[280px]">
        <div className="relative w-full aspect-[4/3] border border-[var(--color-border-bright)] bg-[var(--color-bg-elev)] overflow-hidden">
          <TilePlaceholder label={caption} index={index} total={total} />
        </div>
      </div>
    );
  }

  const isVideo = isVideoSrc(src);

  return (
    <div className="shrink-0">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onZoom();
        }}
        aria-label={`zoom: ${alt}`}
        className={
          frame === "phone"
            ? "group relative h-[260px] rounded-[18px] bg-black p-[4px] shadow-[0_0_0_1px_var(--color-border-bright)] inline-flex cursor-zoom-in"
            : "group relative h-[260px] border border-[var(--color-border-bright)] bg-[var(--color-bg-elev)] overflow-hidden inline-flex cursor-zoom-in p-0"
        }
      >
        {isVideo ? (
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-auto block pointer-events-none"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className={frame === "phone" ? "h-[252px] w-auto block pointer-events-none rounded-[14px]" : "h-full w-auto block pointer-events-none"}
          />
        )}
        <span className="absolute bottom-1 right-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-phosphor-bright)] bg-[var(--color-bg)]/70 px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          [+] zoom
        </span>
      </button>
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
