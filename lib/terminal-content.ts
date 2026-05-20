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
      "",
      "recent apps shipped:",
    ],
    images: [
      { src: "/projects/rocapine/harmony.png", caption: "harmony" },
      { src: "/projects/rocapine/eve.png", caption: "eve" },
      { src: "/projects/rocapine/unchaind.png", caption: "unchaind" },
      { src: "/projects/rocapine/oly.png", caption: "oly" },
      { src: "/projects/rocapine/img1.png", caption: "design system" },
    ],
    links: [
      { label: "rocapi.ne", url: "https://rocapi.ne/" },
      { label: "harmony", url: "https://apps.apple.com/us/app/harmony-cycle-syncing-period/id6736703227" },
      { label: "eve", url: "https://apps.apple.com/us/app/eve-motherhood-wellness-yoga/id6743140834" },
      { label: "unchaind", url: "https://apps.apple.com/us/app/unchaind-overcome-lust/id6741046019" },
      { label: "oly", url: "https://apps.apple.com/us/app/oly-personal-fitness-coach/id6738780947" },
    ],
  },
  pimento: {
    id: "pimento",
    title: "pimento",
    year: "2024",
    tag: "genai",
    oneLiner: "ai creativity tool to create, edit, and upscale any image with your branding.",
    body: [
      "led design on the generator + editor interface.",
      "shipped a new user-experience to increase conversion rate (using industry-specific templates to get users faster to AHA moment).",
      "re-designed the website to increase SEO.",
    ],
    images: [
      { src: "/projects/pimento/img-1.avif", caption: "platform overview" },
      { src: "/projects/pimento/2.png", caption: "onboarding" },
      { src: "/projects/pimento/pimento.mp4", caption: "editor demo" },
    ],
    links: [{ label: "pimento.design", url: "https://www.pimento.design/" }],
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
      { src: "/projects/tocco/0.avif", caption: "platform header" },
      { src: "/projects/tocco/1.png", caption: "library hero" },
      { src: "/projects/tocco/2.png", caption: "discovery flow" },
      { src: "/projects/tocco/3.png", caption: "supplier co-dev" },
      { src: "/projects/tocco/4.png", caption: "sample box" },
      { src: "/projects/tocco/5.png", caption: "marketplace" },
    ],
    links: [{ label: "tocco.earth", url: "https://tocco.earth/" }],
  },
  tadaa: {
    id: "tadaa",
    title: "tadaa",
    year: "2022 — 2023",
    tag: "saas · co-founder",
    oneLiner: "tool to make any process actionable and collaborative.",
    body: [
      "co-founder & cpo. managed a slack community of 450 product experts.",
      "designed the product + design system (600+ users).",
      "front-end engineering, sales, product & design.",
    ],
    images: [],
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
      { src: "/projects/rdv/img1.avif", caption: "discovery feed" },
      { src: "/projects/rdv/img2.avif", caption: "place detail" },
      { src: "/projects/rdv/img3.avif", caption: "editorial" },
      { src: "/projects/rdv/img4.avif", caption: "brand system" },
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
      { src: "/projects/sourceful/img0.webp", caption: "packaging design" },
      { src: "/projects/sourceful/img1.png", caption: "configurator" },
      { src: "/projects/sourceful/img2.png", caption: "quote flow" },
      { src: "/projects/sourceful/img3.png", caption: "packaging range" },
    ],
    links: [{ label: "sourceful.com", url: "https://www.sourceful.com/" }],
  },
  accenture: {
    id: "accenture",
    title: "accenture",
    year: "2019 — 21",
    tag: "data · consulting",
    oneLiner: "data consultant in london — early career stop before going design-first.",
    body: [
      "worked across data & analytics projects for enterprise clients.",
      "learnt the discipline of structured thinking and stakeholder mgmt.",
      "left to build product, but the rigour stuck.",
    ],
    images: [],
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
    hint: `${p.year} · ${p.tag}`,
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
      { number: 1, command: "open rocapine", label: "rocapine", hint: "2024 — current · wellness · lead product & design" },
      { number: 2, command: "open pimento", label: "pimento", hint: "2024 · genai · freelance founding designer" },
      { number: 3, command: "open tocco", label: "tocco", hint: "2023 — 24 · sustainability · founding designer" },
      { number: 4, command: "open tadaa", label: "tadaa", hint: "2022 — 2023 · saas · co-founder & cpo" },
      { number: 5, command: "open rdv", label: "rdv", hint: "2021 · branding & design · freelance" },
      { number: 6, command: "open sourceful", label: "sourceful", hint: "2021 — 22 · e-commerce · founding designer" },
      { number: 7, command: "open accenture", label: "accenture", hint: "2019 — 21 · data · consultant" },
    ],
  },
  about: {
    id: "about",
    parent: "root",
    greeting: [
      "about/",
      "─────",
      "design engineer based in Amsterdam. i work at the intersection of",
      "design, product, and engineering. I thrive in handyman roles with extreme ownership",
      "where the designer actually ships (design, engineering, branding, you name it).",
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
    ],
    options: [
      { number: 1, command: "email", label: "send an email", hint: "opens your mail client" },
      { number: 2, command: "linkedin", label: "open linkedin", hint: "linkedin.com/in/edouardbucaille" },
      { number: 3, command: "cv", label: "download cv", hint: "pdf · ~600kb" },
      { number: 4, command: "back", label: "back", hint: "return to main menu" },
    ],
  },
};
