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
  rocapine: {
    id: "rocapine",
    title: "rocapine",
    year: "2024 — now",
    tag: "wellness · current",
    oneLiner: "founding designer in a mobile-app wellness studio shipping ~150 apps a year.",
    body: [
      "leading the product & design team (6 people).",
      "we ship a new app every ~2 hours — design system + tooling matter a lot.",
      "currently focused on the pipeline from idea → published app.",
    ],
    images: [
      { caption: "studio overview" },
      { caption: "design system" },
      { caption: "shipping pipeline" },
    ],
  },
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
      "head of design & product — 1st employee, founding designer.",
      "led sales, product & design. shipped the platform used by 100k+ users.",
      "built the discovery flow + supplier↔brand co-development surface.",
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
    year: "2022 — now",
    tag: "saas · co-founder",
    oneLiner: "tool to make any process actionable and collaborative.",
    body: [
      "co-founder & cpo. managed a slack community of 450 product experts.",
      "designed the product + design system (600+ users).",
      "front-end engineering, sales, product & design.",
    ],
    images: [
      { caption: "workflow canvas" },
      { caption: "handoff view" },
    ],
  },
  rdv: {
    id: "rdv",
    title: "rdv",
    year: "2021 — 23",
    tag: "branding & design",
    oneLiner: "b2c app to find the coolest events and places in your city.",
    body: [
      "freelance founding designer on rendezvous.",
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
      "1st product designer — pm & designer dual role.",
      "built the design practices and implemented processes.",
      "led the in-browser packaging configurator and quote flow.",
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
      "i'm ed — design engineer based in amsterdam,",
      "currently leading product & design at rocapine.",
      "what would you like to know?",
    ],
    options: [
      { number: 1, command: "about", label: "about", hint: "who i am, how i work" },
      { number: 2, command: "work", label: "work", hint: "recent projects + case studies" },
      { number: 3, command: "contact", label: "contact", hint: "email, cv, socials" },
    ],
  },
  work: {
    id: "work",
    parent: "root",
    greeting: ["work/ — current first, then most recent"],
    options: [
      projectOption(1, "rocapine"),
      projectOption(2, "pimento"),
      projectOption(3, "tocco"),
      projectOption(4, "tadaa"),
      projectOption(5, "rdv"),
      projectOption(6, "sourceful"),
    ],
  },
  about: {
    id: "about",
    parent: "root",
    greeting: [
      "about/",
      "─────",
      "design engineer based in amsterdam. i work at the intersection of",
      "design and engineering — i prefer roles where the line between the",
      "two is thin (founding engineer, design engineer #1, etc.).",
      "",
      "currently leading the product & design team at rocapine — a mobile",
      "app wellness studio shipping ~150 apps a year.",
      "",
      "previously: head of design & product at tocco, co-founder & cpo at",
      "tadaa, founding designer at sourceful, and a stint as a data",
      "consultant at accenture in london.",
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
      "experiments, side things, and hobbies.",
    ],
    options: [
      projectOption(1, "ride-on"),
      { number: 2, command: "back", label: "back", hint: "return to main menu" },
    ],
  },
  contact: {
    id: "contact",
    parent: "root",
    greeting: [
      "contact/",
      "────────",
      "email      edouard.bucaille@gmail.com",
      "linkedin   linkedin.com/in/edouardbucaille",
      "github     github.com/edbc1",
      "cv         download (pdf)",
      "",
      "best to email — i reply within a day.",
    ],
    options: [
      { number: 1, command: "email", label: "send an email", hint: "opens your mail client" },
      { number: 2, command: "linkedin", label: "open linkedin", hint: "linkedin.com/in/edouardbucaille" },
      { number: 3, command: "cv", label: "download cv", hint: "pdf · ~600kb" },
      { number: 4, command: "back", label: "back", hint: "return to main menu" },
    ],
  },
};
