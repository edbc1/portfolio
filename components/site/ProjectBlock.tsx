"use client";

import { useEffect, useState } from "react";
import { projects, type Project } from "@/lib/site-content";

type ZoomItem = { src: string; alt: string; caption: string; isVideo: boolean; frame?: "phone" };
/** a gallery (all images of one project) opened at `index` */
type ZoomTarget = { items: ZoomItem[]; index: number };

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

export function ProjectBlock({
  project,
  role,
  nested,
}: {
  project: Project;
  /** role held, shown next to the year */
  role?: string;
  /** rendered inside a parent project (smaller title, tighter spacing) */
  nested?: boolean;
}) {
  const [zoom, setZoom] = useState<ZoomTarget | null>(null);
  const links = project.links ?? [];
  const described = links.filter((l) => l.description);
  const plain = links.filter((l) => !l.description);
  const childGroups = (project.childGroups ?? [])
    .map((g) => ({ ...g, ids: g.ids.filter((id) => projects[id]) }))
    .filter((g) => g.ids.length > 0);

  const openZoom = (src: string) => {
    const items: ZoomItem[] = project.images
      .filter((im): im is typeof im & { src: string } => !!im.src)
      .map((im) => ({
        src: im.src,
        alt: im.alt ?? im.caption,
        caption: im.caption,
        isVideo: isVideoSrc(im.src),
        frame: project.imageFrame,
      }));
    setZoom({ items, index: Math.max(0, items.findIndex((it) => it.src === src)) });
  };

  return (
    <article className={nested ? "mb-12" : "mb-20"}>
      <h3
        className={
          nested
            ? "text-[17px] font-semibold text-[var(--color-phosphor-bright)]"
            : "text-[22px] font-semibold tracking-tight text-[var(--color-phosphor-bright)]"
        }
      >
        {project.title}
      </h3>
      <div className="mt-1 text-[13px] text-[var(--color-phosphor-faint)]">
        {[project.year, role ?? project.tag].join(" · ")}
      </div>
      <p className="mt-3 text-[var(--color-phosphor-bright)]">{project.oneLiner}</p>
      {project.body.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-[var(--color-phosphor-dim)]">
          {project.body.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      )}

      {project.images.length > 0 && (
        <div className="mt-6 -mx-5 md:-mx-10">
          <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-none px-5 md:px-10 pb-2">
            {project.images.map((img, i) => (
              <ImageTile
                key={i}
                src={img.src}
                alt={img.alt ?? img.caption}
                caption={img.caption}
                index={i}
                total={project.images.length}
                frame={project.imageFrame}
                onZoom={() => img.src && openZoom(img.src)}
              />
            ))}
          </div>
        </div>
      )}

      {described.length > 0 && (
        <div className="mt-5">
          {project.linksTitle && <div className="mb-2 text-[var(--color-phosphor-dim)]">{project.linksTitle}</div>}
          <ul className="space-y-1.5">
            {described.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-phosphor-bright)] underline underline-offset-4 decoration-[var(--color-border-bright)] hover:decoration-current"
                >
                  {l.label}
                </a>
                <span className="text-[var(--color-phosphor-faint)] ml-2">{l.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {plain.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
          {plain.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-phosphor-bright)] underline underline-offset-4 decoration-[var(--color-border-bright)] hover:decoration-current"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      {childGroups.map((g) => (
        <div key={g.title} className="mt-10">
          <div className="mb-6 text-[var(--color-phosphor-dim)]">{g.title}</div>
          <div className="pl-4 md:pl-6 border-l border-[var(--color-border)]">
            {g.ids.map((id) => (
              <ProjectBlock key={id} project={projects[id]} nested />
            ))}
          </div>
        </div>
      ))}

      {zoom && (
        <Lightbox
          target={zoom}
          onClose={() => setZoom(null)}
          onStep={(dir) =>
            setZoom((z) => (z ? { ...z, index: (z.index + dir + z.items.length) % z.items.length } : z))
          }
        />
      )}
    </article>
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        onStep(e.key === "ArrowRight" ? 1 : -1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full text-[var(--color-phosphor-bright)] text-[20px] border border-[var(--color-border-bright)] bg-[var(--color-bg)]/70 hover:bg-[var(--color-phosphor-ghost)] select-none";

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-overlay)] backdrop-blur-sm px-4 py-8 md:px-12 md:py-12"
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="close"
        className="absolute top-4 right-4 text-[var(--color-phosphor-bright)] text-[13px] rounded-full border border-[var(--color-border-bright)] px-3 py-1 hover:bg-[var(--color-phosphor-ghost)]"
      >
        close
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
              : "relative max-h-[82vh] rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elev)] overflow-hidden flex"
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
        <div className="text-[13px] text-[var(--color-phosphor-dim)] text-center px-2">
          {many && (
            <span className="text-[var(--color-phosphor-faint)] mr-3">
              {index + 1} / {items.length}
            </span>
          )}
          {item.caption}
        </div>
      </div>
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
        <div className="relative w-full aspect-[4/3] rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elev)] flex flex-col items-center justify-center text-center px-3">
          <div className="text-[12px] text-[var(--color-phosphor-faint)]">{caption}</div>
          <div className="text-[12px] text-[var(--color-phosphor-dim)] mt-1">
            {index + 1} / {total}
          </div>
        </div>
      </div>
    );
  }

  const isVideo = isVideoSrc(src);

  return (
    <button
      type="button"
      onClick={onZoom}
      aria-label={`zoom: ${alt}`}
      className={
        frame === "phone"
          ? "shrink-0 relative h-[300px] rounded-[20px] bg-black p-[4px] shadow-[0_0_0_1px_var(--color-border-bright)] inline-flex cursor-zoom-in"
          : "shrink-0 relative h-[300px] rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elev)] overflow-hidden inline-flex cursor-zoom-in p-0"
      }
    >
      {isVideo ? (
        <video src={src} autoPlay muted loop playsInline className="h-full w-auto block pointer-events-none" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={frame === "phone" ? "h-[292px] w-auto block pointer-events-none rounded-[16px]" : "h-full w-auto block pointer-events-none"}
        />
      )}
    </button>
  );
}
