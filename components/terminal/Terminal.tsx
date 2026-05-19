"use client";

import { useCallback, useReducer } from "react";
import { TerminalPane } from "./TerminalPane";
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
  projectView: string | null;
};

function nextProjectId(currentId: string): string | null {
  const ids = (routes.work?.options ?? [])
    .map((o) => o.command.replace(/^open\s+/, ""))
    .filter((id) => projects[id]);
  const idx = ids.indexOf(currentId);
  if (idx === -1) return null;
  return ids[(idx + 1) % ids.length];
}

type Action =
  | { type: "submit"; text: string }
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
  projectView: null,
};

function cwdLabel(cwd: string): string {
  if (cwd === "root") return "~";
  return `~/${cwd}`;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "init":
      return initialState;

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
        if (state.projectView) {
          if (n === 1) return reducer(state, { type: "submit", text: "back" });
          if (n === 2) {
            const next = nextProjectId(state.projectView);
            if (next) return reducer(state, { type: "submit", text: `open ${next}` });
          }
          return {
            ...state,
            history: [...history, { kind: "error", text: `no option [${n}] here. try \`help\` or click an option.` }],
          };
        }
        const opt = route?.options.find((o) => o.number === n);
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
                "  open <project>     open a project + images",
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
        return { ...state, projectView: null, history: greet(state.cwd) };
      }

      if (cmd === "ls" || cmd === "dir") {
        if (!route) return state;
        return {
          ...state,
          projectView: null,
          history: [...history, { kind: "menu", options: route.options, routeId: state.cwd }],
        };
      }

      if (cmd === "back" || raw === "cd .." || cmd === "..") {
        if (state.projectView) {
          return {
            ...state,
            projectView: null,
            cwd: "work",
            history: [...history, ...greet("work")],
          };
        }
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
        return {
          ...state,
          projectView: projectId,
          history: [...history, { kind: "project", project }],
        };
      }

      if (routes[cmd]) {
        return {
          ...state,
          cwd: cmd,
          projectView: null,
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

  return (
    <div className="absolute inset-0 z-[60] bg-[var(--color-bg)]">
      <TerminalPane
        history={state.history}
        cwdLabel={cwdLabel(state.cwd)}
        onSubmit={submit}
      />
    </div>
  );
}
