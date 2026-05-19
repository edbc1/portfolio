"use client";

import { useCallback, useEffect, useReducer } from "react";
import { TerminalPane } from "./TerminalPane";
import { ViewerPane } from "./ViewerPane";
import { projects, routes, type TermOption, type TermProject } from "@/lib/terminal-content";

export type HistoryBlock =
  | { kind: "greeting"; lines: string[] }
  | { kind: "menu"; options: TermOption[]; routeId: string }
  | { kind: "input"; cwd: string; text: string }
  | { kind: "text"; lines: string[] }
  | { kind: "project"; project: TermProject }
  | { kind: "error"; text: string };

type State = {
  history: HistoryBlock[];
  cwd: string;
  gallery: { projectId: string; index: number } | null;
};

type Action =
  | { type: "submit"; text: string }
  | { type: "navigate-gallery"; direction: -1 | 1 }
  | { type: "set-gallery-index"; index: number }
  | { type: "close-gallery" }
  | { type: "init" };

const EMAIL = "edouard.bucaille@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/edouardbucaille/";
const CV_PATH = "/edouard-bucaille-cv.pdf";

const greet = (routeId: string): HistoryBlock[] => {
  const route = routes[routeId];
  return [
    { kind: "greeting", lines: route.greeting },
    { kind: "menu", options: route.options, routeId },
  ];
};

const initialState: State = {
  history: greet("root"),
  cwd: "root",
  gallery: null,
};

function cwdLabel(cwd: string): string {
  if (cwd === "root") return "~";
  return `~/${cwd}`;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "init":
      return initialState;

    case "close-gallery":
      return { ...state, gallery: null };

    case "navigate-gallery": {
      if (!state.gallery) return state;
      const p = projects[state.gallery.projectId];
      if (!p) return state;
      const len = p.images.length;
      const next = (state.gallery.index + action.direction + len) % len;
      return { ...state, gallery: { ...state.gallery, index: next } };
    }

    case "set-gallery-index": {
      if (!state.gallery) return state;
      return { ...state, gallery: { ...state.gallery, index: action.index } };
    }

    case "submit": {
      const raw = action.text.trim();
      if (!raw) return state;

      const history = [
        ...state.history,
        { kind: "input" as const, cwd: state.cwd, text: raw },
      ];

      const route = routes[state.cwd];
      const numberMatch = raw.match(/^\d+$/);
      if (numberMatch) {
        const n = parseInt(raw, 10);
        const opt = route?.options.find((o) => o.number === n);
        // Skip the number echo — let the resolved command decide what to print.
        if (opt) return reducer(state, { type: "submit", text: opt.command });
        return {
          ...state,
          history: [...history, { kind: "error", text: `no option [${n}] here. try \`help\` or click an option.` }],
        };
      }

      const [cmd, ...rest] = raw.toLowerCase().split(/\s+/);
      const arg = rest.join(" ");

      if (cmd === "help" || cmd === "?") {
        return {
          ...state,
          history: [
            ...history,
            {
              kind: "text",
              lines: [
                "commands:",
                "  <number>           pick a menu option",
                "  ls                 list options here",
                "  open <project>     open a project + gallery",
                "  back  /  cd ..     go up one level",
                "  clear              clear the screen",
                "  email / linkedin   open mail / linkedin",
                "  cv                 download cv (pdf)",
                "  help               this",
                "",
                "tip: every option is clickable too.",
              ],
            },
          ],
        };
      }

      if (cmd === "clear" || cmd === "cls") {
        return { ...state, history: greet(state.cwd) };
      }

      if (cmd === "ls" || cmd === "dir") {
        if (!route) return state;
        return { ...state, history: [...history, { kind: "menu", options: route.options, routeId: state.cwd }] };
      }

      if (cmd === "back" || raw === "cd .." || cmd === "..") {
        const parent = route?.parent ?? "root";
        return {
          ...state,
          cwd: parent,
          history: [...history, ...greet(parent)],
        };
      }

      if (cmd === "email") {
        if (typeof window !== "undefined") {
          window.location.href = `mailto:${EMAIL}`;
        }
        return {
          ...state,
          history: [...history, { kind: "text", lines: [`opening mail client → ${EMAIL}`] }],
        };
      }

      if (cmd === "linkedin") {
        if (typeof window !== "undefined") {
          window.open(LINKEDIN, "_blank", "noopener,noreferrer");
        }
        return {
          ...state,
          history: [...history, { kind: "text", lines: [`opening linkedin → ${LINKEDIN}`] }],
        };
      }

      if (cmd === "cv" || cmd === "resume") {
        if (typeof window !== "undefined") {
          window.open(CV_PATH, "_blank", "noopener,noreferrer");
        }
        return {
          ...state,
          history: [...history, { kind: "text", lines: ["downloading cv (pdf) →"] }],
        };
      }

      if (cmd === "open") {
        const projectId = arg;
        const project = projects[projectId];
        if (!project) {
          return {
            ...state,
            history: [...history, { kind: "error", text: `no project "${projectId}". try \`work\` to see the list.` }],
          };
        }
        // Skip even the input echo so the left side stays 100% static while
        // the user flicks through projects. Visual feedback is the right pane.
        return {
          ...state,
          gallery: { projectId, index: 0 },
        };
      }

      if (routes[cmd]) {
        return {
          ...state,
          cwd: cmd,
          history: [...history, ...greet(cmd)],
        };
      }

      if (projects[cmd]) {
        return reducer({ ...state, history: state.history }, { type: "submit", text: `open ${cmd}` });
      }

      return {
        ...state,
        history: [...history, { kind: "error", text: `unknown command: \`${raw}\` — try \`help\`.` }],
      };
    }
  }
}

export function Terminal() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const submit = useCallback((text: string) => dispatch({ type: "submit", text }), []);
  const navGallery = useCallback(
    (direction: -1 | 1) => dispatch({ type: "navigate-gallery", direction }),
    [],
  );
  const setGalleryIndex = useCallback(
    (index: number) => dispatch({ type: "set-gallery-index", index }),
    [],
  );
  const closeGallery = useCallback(() => dispatch({ type: "close-gallery" }), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!state.gallery) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        if (e.key === "Escape") closeGallery();
        return;
      }
      if (e.key === "ArrowLeft") navGallery(-1);
      if (e.key === "ArrowRight") navGallery(1);
      if (e.key === "Escape") closeGallery();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.gallery, navGallery, closeGallery]);

  const hasViewer = state.gallery !== null;

  return (
    <div className="terminal-mode absolute inset-0 z-[60] bg-[var(--color-bg)] flex flex-col md:flex-row">
      <div
        className={`flex-1 min-h-0 overflow-hidden transition-[flex-basis] duration-200 ${
          hasViewer
            ? "md:basis-3/5 md:border-r border-b md:border-b-0 border-[var(--color-border)]"
            : "md:basis-full"
        }`}
      >
        <TerminalPane
          history={state.history}
          cwdLabel={cwdLabel(state.cwd)}
          onSubmit={submit}
        />
      </div>
      {hasViewer && (
        <div className="flex-1 min-h-0 md:basis-2/5 overflow-hidden">
          <ViewerPane
            gallery={state.gallery!}
            onNavigate={navGallery}
            onSetIndex={setGalleryIndex}
            onClose={closeGallery}
          />
        </div>
      )}
    </div>
  );
}
