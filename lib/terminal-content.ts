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
  /** projects shown inline under the greeting, no click needed */
  feed?: string[];
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
      { label: "tdy", url: "https://apps.apple.com/us/app/tdy-personal-fitness-coach/id6738780947", description: "personal fitness coach (formerly oly)" },
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
    oneLiner: "Freelance gig — Gen AI to create, edit, and upscale any image",
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
    images: [
      { src: "/projects/moipresident/1.webp", caption: "the programme, 30 policy areas" },
      { src: "/projects/moipresident/2.webp", caption: "ia & numérique, costed" },
      { src: "/projects/moipresident/3.webp", caption: "every source cited" },
    ],
    links: [{ label: "moipresident.org", url: "https://www.moipresident.org/" }],
  },
  "simple-works": {
    id: "simple-works",
    title: "simple works studio",
    year: "2026",
    tag: "side project",
    oneLiner: "solid timber, cut once — storefront concept for a furniture studio.",
    body: [
      "four pieces (tabouret, bench, chair, dining table), four workshops:",
      "le marais, menorca, niseko, utah. open any piece.",
    ],
    images: [
      { src: "/projects/simple-works/1.webp", caption: "menorca" },
      { src: "/projects/simple-works/2.webp", caption: "niseko" },
      { src: "/projects/simple-works/3.webp", caption: "utah" },
      { src: "/projects/simple-works/4.webp", caption: "tabouret" },
    ],
    links: [{ label: "simple-works-studio.vercel.app", url: "https://simple-works-studio.vercel.app/" }],
  },
  gradium: {
    id: "gradium",
    title: "gradium",
    year: "2026",
    tag: "experiment",
    oneLiner: "every voice has a face — same words, eleven different lives.",
    body: [
      "experiment for gradium (voice ai): one script, read by eleven voices.",
      "pick a face, hear how much a voice tells you about who's speaking.",
    ],
    images: [
      { src: "/projects/gradium/1.webp", caption: "pick a face" },
      { src: "/projects/gradium/2.webp", caption: "same words, different life" },
      { src: "/projects/gradium/3.webp", caption: "eleven voices, one script" },
    ],
    links: [{ label: "muidarg.vercel.app", url: "https://muidarg.vercel.app/" }],
  },
  azom: {
    id: "azom",
    title: "azom studio",
    year: "2026",
    tag: "experiment",
    oneLiner: "a 3d recording studio in the browser — with mozart on the keys.",
    body: [
      "five seats: producer desk, drums, guitar, piano and vocal booth.",
      "describe a vibe, let ai lay the foundation, then play along — every key in tune.",
    ],
    images: [
      { src: "/projects/azom/1.webp", caption: "the wooden hall" },
      { src: "/projects/azom/2.webp", caption: "producer desk" },
      { src: "/projects/azom/3.webp", caption: "piano, with mozart" },
    ],
    links: [{ label: "azom-studio.vercel.app", url: "https://azom-studio.vercel.app/" }],
  },
  harmony: {
    id: "harmony",
    title: "harmony",
    year: "2024 — now",
    tag: "rocapine · cycle syncing",
    oneLiner: "more than a period tracker — sync energy, meals, movement and mindset with your cycle.",
    body: [
      "cycle phases, a daily forecast, nutrition and workouts tuned to where you are in your cycle.",
      "top 10 women's app · trusted by 600k users · 4.7 ★ on 10k+ ratings.",
    ],
    images: [
      { src: "/projects/harmony/1.webp", caption: "welcome" },
      { src: "/projects/harmony/2.webp", caption: "today — ovulation, day 15" },
      { src: "/projects/harmony/3.webp", caption: "calendar" },
      { src: "/projects/harmony/4.webp", caption: "tips — food for your phase" },
      { src: "/projects/harmony/5.webp", caption: "explore" },
      { src: "/projects/harmony/6.webp", caption: "profile — cycle analytics" },
      { src: "/projects/harmony/7.webp", caption: "periods recap" },
      { src: "/projects/harmony/8.webp", caption: "onboarding — your phases" },
    ],
    links: [{ label: "app store", url: "https://apps.apple.com/us/app/harmony-cycle-syncing-period/id6736703227" }],
  },
  tdy: {
    id: "tdy",
    title: "tdy",
    year: "2024 — now",
    tag: "rocapine · fitness",
    oneLiner: "train like an athlete — a personal fitness coach built with teddy riner's coaches.",
    body: [
      "a short profiling test places you in one of five training mind types; the plan adapts to your day.",
      "formerly oly · app of the month · trusted by 200k users.",
    ],
    images: [
      { src: "/projects/tdy/1.webp", caption: "train like an athlete" },
      { src: "/projects/tdy/2.webp", caption: "personal fitness coach" },
      { src: "/projects/tdy/3.webp", caption: "transform your body" },
      { src: "/projects/tdy/4.webp", caption: "adapt your trainings" },
      { src: "/projects/tdy/5.webp", caption: "according to your mind type" },
      { src: "/projects/tdy/6.webp", caption: "weekly performance score" },
    ],
    links: [{ label: "app store", url: "https://apps.apple.com/us/app/tdy-personal-fitness-coach/id6738780947" }],
  },
  "off-duty": {
    id: "off-duty",
    title: "off duty",
    year: "2026",
    tag: "sleep training",
    oneLiner: "a 6-week fall-asleep drill, built on a 1942 navy pilot method.",
    body: [
      "one short sortie a night on a dark screen — 42 sorties across 6 missions.",
      "awake at 0300? flip to red and run the drill instead of the feed.",
    ],
    images: [
      { src: "/projects/off-duty/1.webp", caption: "fall asleep in under 2 minutes" },
      { src: "/projects/off-duty/2.webp", caption: "week 6 — major" },
      { src: "/projects/off-duty/3.webp", caption: "the squad, recruit to captain" },
      { src: "/projects/off-duty/4.webp", caption: "tonight's orders" },
      { src: "/projects/off-duty/5.webp", caption: "why you should care about sleep" },
    ],
  },
  ingredex: {
    id: "ingredex",
    title: "ingredex",
    year: "2026",
    tag: "food · collection",
    oneLiner: "a pokédex for ingredients — snap what you cook with, fill the dex.",
    body: [
      "819 ingredients to collect, filtered by season, veg, fruit and herbs.",
      "point the camera at an ingredient to log it and unlock its card.",
    ],
    images: [
      { src: "/projects/ingredex/1.webp", caption: "the dex — 442 / 819" },
      { src: "/projects/ingredex/2.webp", caption: "bell pepper, caught" },
      { src: "/projects/ingredex/3.webp", caption: "fruit" },
      { src: "/projects/ingredex/4.webp", caption: "in season now" },
      { src: "/projects/ingredex/5.webp", caption: "collector profile" },
    ],
  },
  departure: {
    id: "departure",
    title: "departure",
    year: "2026",
    tag: "focus · productivity",
    oneLiner: "turn focus into travel — every deep-work session is a flight.",
    body: [
      "pick a duration, depart, land somewhere new. each completed flight earns a passport stamp.",
      "streaks, focus hours and a weekly leaderboard of top focusers.",
    ],
    images: [
      { src: "/projects/departure/1.webp", caption: "welcome" },
      { src: "/projects/departure/2.webp", caption: "your travel profile" },
      { src: "/projects/departure/3.webp", caption: "your miles" },
      { src: "/projects/departure/4.webp", caption: "closest airport" },
      { src: "/projects/departure/5.webp", caption: "boarding pass" },
      { src: "/projects/departure/6.webp", caption: "where to?" },
      { src: "/projects/departure/7.webp", caption: "ready to board?" },
      { src: "/projects/departure/8.webp", caption: "your passport" },
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
      { number: 3, command: "apps", label: "apps", hint: "mobile apps i built + screenshots" },
      { number: 4, command: "playground", label: "playground", hint: "side projects + experiments" },
      { number: 5, command: "contact", label: "contact", hint: "email, cv, socials" },
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
  apps: {
    id: "apps",
    parent: "root",
    greeting: [
      "mobile apps i built — on the app store, or about to be.",
    ],
    feed: ["harmony", "tdy", "off-duty", "ingredex", "departure"],
    options: [
      { number: 1, command: "back", label: "back", hint: "return to main menu" },
    ],
  },
  playground: {
    id: "playground",
    parent: "root",
    feed: ["simple-works", "gradium", "moipresident", "azom", "ride-on"],
    options: [
      { number: 1, command: "back", label: "back", hint: "return to main menu" },
    ],
  },
  contact: {
    id: "contact",
    parent: "root",
    options: [
      { number: 1, command: "email", label: "send an email", hint: "opens your mail client" },
      { number: 2, command: "linkedin", label: "open linkedin", hint: "linkedin.com/in/edouardbucaille" },
      { number: 3, command: "cv", label: "download cv", hint: "pdf · ~1mb" },
      { number: 4, command: "back", label: "back", hint: "return to main menu" },
    ],
  },
};
