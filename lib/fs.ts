export type FsNode = {
  id: string;
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FsNode[];
  defaultSize?: { width: number; height: number };
  external?: string;
};

export const fileSystem: FsNode = {
  id: "root",
  name: "/",
  path: "",
  type: "directory",
  children: [
    {
      id: "projects",
      name: "projects",
      path: "projects",
      type: "directory",
      children: [
        {
          id: "rocapine",
          name: "rocapine",
          path: "projects/rocapine",
          type: "file",
          defaultSize: { width: 620, height: 520 },
        },
        {
          id: "customer-support",
          name: "customer-support",
          path: "projects/customer-support",
          type: "file",
          defaultSize: { width: 600, height: 500 },
        },
        {
          id: "website",
          name: "website",
          path: "projects/website",
          type: "file",
          defaultSize: { width: 600, height: 500 },
        },
        {
          id: "portfolio-os",
          name: "portfolio-os",
          path: "projects/portfolio-os",
          type: "file",
          defaultSize: { width: 600, height: 500 },
        },
      ],
    },
    {
      id: "writing",
      name: "writing",
      path: "writing",
      type: "directory",
      children: [],
    },
    {
      id: "play",
      name: "play",
      path: "play",
      type: "directory",
      children: [],
    },
    {
      id: "about",
      name: "about.me",
      path: "about",
      type: "file",
      defaultSize: { width: 520, height: 440 },
    },
    {
      id: "contact",
      name: "contact.sh",
      path: "contact",
      type: "file",
      defaultSize: { width: 480, height: 360 },
    },
  ],
};

export function findNode(path: string, node: FsNode = fileSystem): FsNode | null {
  if (node.path === path) return node;
  if (!node.children) return null;
  for (const child of node.children) {
    const found = findNode(path, child);
    if (found) return found;
  }
  return null;
}

export function flattenFiles(node: FsNode = fileSystem): FsNode[] {
  const out: FsNode[] = [];
  if (node.type === "file") out.push(node);
  if (node.children) {
    for (const child of node.children) out.push(...flattenFiles(child));
  }
  return out;
}

export function titleFor(path: string): string {
  const node = findNode(path);
  if (!node) return path;
  if (node.path === "about") return "about.me";
  if (node.path === "contact") return "contact.sh";
  return `${node.path}.md`;
}
