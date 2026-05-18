export type TermImage = {
  src?: string;
  caption: string;
  alt?: string;
};

export type TermProject = {
  id: string;
  title: string;
  year: string;
  tag: string;
  oneLiner: string;
  body: string[];
  images: TermImage[];
  links?: { label: string; url: string }[];
};

export type TermOption = {
  number: number;
  command: string;
  label: string;
  hint?: string;
};

export type TermRoute = {
  id: string;
  parent?: string;
  greeting: string[];
  options: TermOption[];
};

export const projects: Record<string, TermProject> = {
  pimento: {
    id: "pimento",
    title: "pimento",
    year: "2024",
    tag: "genai",
    oneLiner: "ai creativity tool to create, edit, and upscale any image with your branding.",
    body: [
      "led design + frontend on the editor surface.",
      "shipped the brand-style pipeline (upload assets → generate on-brand images).",
      "designed the upscale flow and the credit / billing screens.",
    ],
    images: [
      { caption: "editor — main canvas" },
      { caption: "brand kit picker" },
      { caption: "upscale dialog" },
      { caption: "credits + billing" },
    ],
    links: [{ label: "live", url: "https://pimento.ai" }],
  },
  tocco: {
    id: "tocco",
    title: "tocco",
    year: "2023 — 24",
    tag: "sustainability",
    oneLiner: "sustainable materials marketplace with a 5,000-material library.",
    body: [
      "designed the discovery flow + library browser.",
      "built the supplier ↔ brand co-development surface.",
      "shipped end-to-end with a 3-person team.",
    ],
    images: [
      { caption: "library browser" },
      { caption: "material detail" },
      { caption: "supplier dashboard" },
    ],
  },
  tadaa: {
    id: "tadaa",
    title: "tadaa",
    year: "2022 — 23",
    tag: "saas",
    oneLiner: "tool to make any process actionable and collaborative.",
    body: [
      "led the design of the workflow canvas.",
      "shipped the comment + handoff system.",
      "wrote the first internal design system.",
    ],
    images: [
      { caption: "workflow canvas" },
      { caption: "handoff view" },
    ],
  },
  rdv: {
    id: "rdv",
    title: "rdv",
    year: "2022 — 23",
    tag: "branding & design",
    oneLiner: "b2c app to find the coolest events and places in your city.",
    body: [
      "designed the discovery feed + map.",
      "shaped the editorial voice and brand system.",
    ],
    images: [
      { caption: "discovery feed" },
      { caption: "place detail" },
    ],
  },
  sourceful: {
    id: "sourceful",
    title: "sourceful",
    year: "2021 — 22",
    tag: "e-commerce",
    oneLiner: "sustainable b2b packaging with an in-house customisation tool.",
    body: [
      "led the design of the in-browser packaging configurator.",
      "shipped the quote + checkout flow.",
    ],
    images: [
      { caption: "configurator" },
      { caption: "quote builder" },
    ],
  },
  "ride-on": {
    id: "ride-on",
    title: "ride-on",
    year: "2021 — 22",
    tag: "for fun",
    oneLiner: "lego-style configurator for high-end racing bikes.",
    body: [
      "side project — built the modular part picker and 3d preview.",
      "no real bikes were harmed.",
    ],
    images: [
      { caption: "part picker" },
      { caption: "3d preview" },
    ],
  },
};

const projectOption = (n: number, id: string): TermOption => {
  const p = projects[id];
  return {
    number: n,
    command: `open ${id}`,
    label: p.title,
    hint: `${p.year} · ${p.tag} · ${p.oneLiner.replace(/\.$/, "")}`,
  };
};

export const routes: Record<string, TermRoute> = {
  root: {
    id: "root",
    greeting: [
      "hey, thanks for stopping by.",
      "i'm ed — design engineer based in paris.",
      "what would you like to know?",
    ],
    options: [
      { number: 1, command: "work", label: "work", hint: "recent projects + case studies" },
      { number: 2, command: "about", label: "about", hint: "who i am, how i work" },
      { number: 3, command: "play", label: "play", hint: "experiments + side things" },
      { number: 4, command: "contact", label: "contact", hint: "email, github, the usual" },
    ],
  },
  work: {
    id: "work",
    parent: "root",
    greeting: ["work/ — recent projects (newest first)"],
    options: [
      projectOption(1, "pimento"),
      projectOption(2, "tocco"),
      projectOption(3, "tadaa"),
      projectOption(4, "rdv"),
      projectOption(5, "sourceful"),
      projectOption(6, "ride-on"),
    ],
  },
  about: {
    id: "about",
    parent: "root",
    greeting: [
      "about/",
      "─────",
      "design engineer in paris. ten years across product design and",
      "frontend — i prefer roles where the line between the two is thin.",
      "",
      "currently a solo founder building tools i wish existed.",
      "previously: led design at pimento, tocco, tadaa, and others.",
    ],
    options: [
      { number: 1, command: "work", label: "see my work", hint: "recent projects" },
      { number: 2, command: "contact", label: "get in touch", hint: "email + socials" },
      { number: 3, command: "back", label: "back", hint: "return to main menu" },
    ],
  },
  play: {
    id: "play",
    parent: "root",
    greeting: [
      "play/",
      "─────",
      "experiments, side things, and half-finished ideas.",
      "(this section is being rebuilt — check back soon.)",
    ],
    options: [
      { number: 1, command: "back", label: "back", hint: "return to main menu" },
    ],
  },
  contact: {
    id: "contact",
    parent: "root",
    greeting: [
      "contact/",
      "────────",
      "email   ed@rocapine.com",
      "github  github.com/edbc1",
      "x       @edbucaille",
      "",
      "best to email — i reply within a day.",
    ],
    options: [
      { number: 1, command: "email", label: "send an email", hint: "opens your mail client" },
      { number: 2, command: "back", label: "back", hint: "return to main menu" },
    ],
  },
};
