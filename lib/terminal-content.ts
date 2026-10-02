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
  links?: { label: string; url: string; description?: string }[];
  linksTitle?: string;
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
  greeting?: string[];
  options: TermOption[];
};

export const projects: Record<string, TermProject> = {
  rocapine: {
    id: "rocapine",
    title: "rocapine",
    year: "2024 — now",
    tag: "wellness",
    oneLiner: "Founding designer in a mobile-app wellness studio shipping ~150 apps a year.",
    body: [
      "Leading the product & design team (6 people). We ship a new app every day.",
      "To achieve this velocity, we build our own CLIs, skills and internal tools",
      "The team is made of 100% AI builders moving from Figma to Claude code.",
    ],
    images: [],
    linksTitle: "Check our work",
    links: [
      { label: "oly", url: "https://apps.apple.com/us/app/oly-personal-fitness-coach/id6738780947", description: "personal fitness coach" },
      { label: "harmony", url: "https://apps.apple.com/us/app/harmony-cycle-syncing-period/id6736703227", description: "cycle syncing & period tracking" },
      { label: "eve", url: "https://apps.apple.com/us/app/eve-motherhood-wellness/id6743140834", description: "wellness through motherhood" },
      { label: "victus", url: "https://apps.apple.com/us/app/victus-hyrox-training-plans/id6752902804", description: "hyrox training plans" },
      { label: "rocapi.ne", url: "https://rocapi.ne/", description: "company website I built" },
    ],
  },
  pimento: {
    id: "pimento",
    title: "pimento (acq. by Mistral AI)",
    year: "2024",
    tag: "genai",
    oneLiner: "Freelance gig - Gen AI to create, edit, and upscale any image",
    body: [
      "Founding product designer working on the Product (generator + editor interface),", 
      "the visuals, and the website. Referred to as the \"French Midjourney\"",
      "Worked with the CEO and the Dev team to increase D1 and D7 retention",
    ],
    images: [],
    links: [{ label: "pimento.design", url: "https://www.pimento.design/" }],
  },
  tocco: {
    id: "tocco",
    title: "tocco",
    year: "2023 — 24",
    tag: "sustainability",
    oneLiner: "sustainable materials marketplace with a 5,000-material library",
    body: [
      "Head of design & product — 1st employee, founding designer post pre-seed ($1.4m)",
      "Led sales, product & design. shipped the platform used by 100k+ users",
      "Built the discovery flow + supplier↔brand co-development surface",
    ],
    images: [],
    links: [{ label: "tocco.earth", url: "https://tocco.earth/" }],
  },
  tadaa: {
    id: "tadaa",
    title: "tadaa",
    year: "2022 — 2023",
    tag: "saas · co-founder",
    oneLiner: "tool to make any product team process actionable and collaborative.",
    body: [
      "Co-founder & CPO. managed a slack community of 450 product experts.",
      "Designed the product + design system (600+ users).",
      "Front-end engineering, sales, product & design.",
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
      "1st product designer role between Seed ($12m) and Series A ($20m).",
      "built the design practices and implemented processes.",
      "led the in-browser packaging configurator and quote flow.",
    ],
    images: [],
    links: [{ label: "sourceful.com", url: "https://www.sourceful.com/" }],
  },
  accenture: {
    id: "accenture",
    title: "accenture",
    year: "2019 — 21",
    tag: "data · consulting",
    oneLiner: "AI consultant in london — early career stop before going design-first.",
    body: [
      "Worked across AI, data & analytics projects for FTSE 100 enterprise clients.",
      "Learnt the discipline of structured thinking and stakeholder mgmt.",
      "Left to build product in a more challenging environment, but the rigour stuck.",
    ],
    images: [],
    links: [{ label: "accenture.com", url: "https://www.accenture.com/" }],
  },
  moipresident: {
    id: "moipresident",
    title: "moi, président",
    year: "2026",
    tag: "side project",
    oneLiner: "a fully costed presidential programme for france, 2027 — 2034.",
    body: [
      "30 policy areas, from democracy and justice to energy, ai and defence.",
      "every measure budgeted: total cost vs. revenues & savings, with sources.",
    ],
    images: [],
    links: [{ label: "moipresident.org", url: "https://www.moipresident.org/" }],
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
      { src: "/projects/ride-on/1.webp", caption: "brand" },
      { src: "/projects/ride-on/2.webp", caption: "homepage" },
      { src: "/projects/ride-on/3.webp", caption: "configurator" },
      { src: "/projects/ride-on/4.webp", caption: "wheels" },
      { src: "/projects/ride-on/5.webp", caption: "drivetrain" },
      { src: "/projects/ride-on/6.webp", caption: "size guide" },
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
      "i'm ed, product designer with 7 years of exp.,",
      "based in amsterdam, currently leading product & design at rocapine.",
      "what would you like to know?",
    ],
    options: [
      { number: 1, command: "about", label: "about", hint: "who i am, how i work" },
      { number: 2, command: "work", label: "work", hint: "recent projects + case studies" },
      { number: 3, command: "playground", label: "playground", hint: "side projects + experiments" },
      { number: 4, command: "contact", label: "contact", hint: "email, cv, socials" },
    ],
  },
  work: {
    id: "work",
    parent: "root",
    options: [
      { number: 1, command: "open rocapine", label: "rocapine", hint: "2024 — current · consumer apps · lead product & design" },
      { number: 2, command: "open pimento", label: "pimento (acq. by Mistral AI)", hint: "2024 · Genai · freelance founding designer" },
      { number: 3, command: "open tocco", label: "tocco", hint: "2023 — 24 · marketplace · founding designer" },
      { number: 4, command: "open tadaa", label: "tadaa", hint: "2022 — 2023 · saas · co-founder & cpo" },
      { number: 5, command: "open rdv", label: "rdv", hint: "2021 · consumer · freelance designer" },
      { number: 6, command: "open sourceful", label: "sourceful", hint: "2021 — 22 · marketplace · founding designer" },
      { number: 7, command: "open accenture", label: "accenture", hint: "2019 — 21 · AI · consultant" },
    ],
  },
  about: {
    id: "about",
    parent: "root",
    greeting: [
      "Product designer with 7 years of exp. in early-stage startups",
      "I work at the intersection of design, product, and engineering.",
      "I thrive in handyman roles with extreme ownership, where the",
      "designer actually ships (design, engineering, branding, you name it).",
      "",
      "currently leading the product & design team at rocapine — a mobile",
      "consumer app studio shipping ~150 apps a year.",
      "",
      "Previously: head of design & product at tocco, founding designer at", 
      "Pimento (acq. by Mistral AI founding designer at sourceful, and a",
      "stint as a data consultant at accenture in london.",
    ],
    options: [
      { number: 1, command: "work", label: "see my work", hint: "recent projects" },
      { number: 2, command: "contact", label: "get in touch", hint: "email + socials" },
      { number: 3, command: "back", label: "back", hint: "return to main menu" },
    ],
  },
  playground: {
    id: "playground",
    parent: "root",
    greeting: [
      "side projects and experiments.",
    ],
    options: [
      projectOption(1, "moipresident"),
      projectOption(2, "ride-on"),
      { number: 3, command: "back", label: "back", hint: "return to main menu" },
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
