export type ProjectImage = {
  src?: string;
  caption: string;
  alt?: string;
};

/** one line of detail under an experience: what was done there */
export type ProjectRow = {
  tag: string;
  text: string;
  /** badge after the text; archived rows are faded */
  status?: "live" | "soon" | "archived";
  /** shown on hover (underlined row), click opens the gallery */
  images?: ProjectImage[];
  /** overrides the project's imageFrame for this row's images */
  imageFrame?: "phone";
};

export type Project = {
  id: string;
  title: string;
  year: string;
  tag: string;
  oneLiner: string;
  body: string[];
  images: ProjectImage[];
  /** detail rows listed under the body */
  rows?: ProjectRow[];
  links?: { label: string; url: string; description?: string }[];
  linksTitle?: string;
  /** wrap every image in a device shell (phone screenshots) */
  imageFrame?: "phone";
  /** groups of project ids rendered inline under this one (e.g. apps shipped at a company) */
  childGroups?: { title: string; ids: string[] }[];
};

export const projects: Record<string, Project> = {
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
    rows: [
      { tag: "Branding", text: "Logo #1", status: "live" },
      { tag: "Branding", text: "Website iteration #1", status: "archived" },
      { tag: "Design", text: "Onboarding studio to ship new apps without coding experience", status: "live", images: [{ src: "/projects/onboarding-studio/1.webp", caption: "overview — what's live" }, { src: "/projects/onboarding-studio/2.webp", caption: "onboarding flow analytics" }, { src: "/projects/onboarding-studio/3.webp", caption: "user detail — why did they get a paywall?" }] },
      { tag: "People", text: "2 exceptional Product Managers with 3+ years of exp." },
      { tag: "Branding", text: "Website iteration #2", status: "archived" },
      { tag: "People", text: "4 promising Junior Product Managers talents" },
      { tag: "Product", text: "Decrease App delivery time from 2 months to 2 weeks", status: "archived" },
      { tag: "Design", text: "Build 75 apps in 2025 (TDY, Harmony, Eve, Victus, etc.)", images: [{ src: "/projects/harmony/2.webp", caption: "harmony — today" }, { src: "/projects/harmony/3.webp", caption: "harmony — calendar" }, { src: "/projects/harmony/6.webp", caption: "harmony — cycle analytics" }], imageFrame: "phone" },
      { tag: "Branding", text: "Visual branding assets on socials (linkedin, instagram, etc.)" },
      { tag: "People", text: "Designed Peer Performance Review system across the company", status: "live" },
      { tag: "Product", text: "Decrease App delivery time from 2 weeks to 2 days", status: "live" },
      { tag: "Design", text: "Publishing platform to monitor apps KPIs and share results with studios in one tool", status: "live" },
      { tag: "Branding", text: "Website iteration #3", status: "live" },
      { tag: "Product", text: "Create internal skills to build faster app onboarding", status: "live" },
      { tag: "Product", text: "Create internal skills to reduce App Store review time", status: "live" },
      { tag: "Design", text: "Replace current toolstack (Amplitude, Adjust, Superwall) with internal tools", status: "live" },
      { tag: "Design", text: "Build 150 apps in 2026 (Off-duty, Departure, Ingredex, etc.)", images: [{ src: "/projects/off-duty/1.webp", caption: "off duty" }, { src: "/projects/departure/6.webp", caption: "departure" }, { src: "/projects/ingredex/1.webp", caption: "ingredex" }], imageFrame: "phone" },
      { tag: "Growth", text: "Build creatives ads across our scaling apps" },
      { tag: "People", text: "Open the Barcelona office for internal mobility", status: "soon" },
    ],
    images: [],
    childGroups: [
      { title: "Some of the tools I shipped", ids: ["onboarding-studio"] },
      { title: "Some of the apps I shipped", ids: ["harmony", "tdy", "off-duty", "ingredex", "departure"] },
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
    rows: [
      { tag: "Branding", text: "Website iteration #1", status: "archived" },
      { tag: "Design", text: "Search experience to use referenced styles" },
      { tag: "Design", text: "Generation / Minimalist prompt bar with lowest amount of parameters", status: "archived" },
      { tag: "Design", text: "Generation / Canvas with generated assets", status: "live", images: [{ src: "/projects/pimento/editor.mp4", caption: "editor demo" }] },
      { tag: "Design", text: "Generation / Parameters panel to fork generated assets", status: "live" },
      { tag: "Design", text: "Edit mode / Parameters panel", status: "live" },
      { tag: "Design", text: "Edit mode / Create upscale mode", status: "live" },
      { tag: "Design", text: "Edit mode / Create \"Remove element\" mode", status: "live" },
      { tag: "Design", text: "Edit mode / Create \"Add element\" mode", status: "live" },
      { tag: "Design", text: "Build whole Design system" },
      { tag: "Branding", text: "Website iteration #2", status: "live" },
      { tag: "Design", text: "FTUE / Increase # of generated assets on D1", images: [{ src: "/projects/pimento/2.webp", caption: "onboarding" }] },
    ],
    images: [
      { src: "/projects/pimento/1.webp", caption: "brand" },
      { src: "/projects/pimento/2.webp", caption: "onboarding" },
      { src: "/projects/pimento/editor.mp4", caption: "editor demo" },
    ],
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
    rows: [
      { tag: "Branding", text: "Logo #1", status: "live", images: [{ src: "/projects/tocco/1.webp", caption: "brand" }] },
      { tag: "Branding", text: "Website iteration #1", status: "archived" },
      { tag: "Design", text: "Search function", images: [{ src: "/projects/tocco/2.webp", caption: "materials that create a cleaner tomorrow" }] },
      { tag: "Design", text: "Result page with online scraped data" },
      { tag: "Design", text: "Supplier product page with digestible material information", images: [{ src: "/projects/tocco/4.webp", caption: "supplier profile — earth score" }] },
      { tag: "Branding", text: "Website iteration #2", status: "archived" },
      { tag: "Design", text: "Editorial newsletter to send latest trends to clients" },
      { tag: "Design", text: "Contact + pre-order form" },
      { tag: "Design", text: "Generated 500+ visual materials assets to enhance result quality", images: [{ src: "/projects/tocco/3.webp", caption: "material renders" }, { src: "/projects/tocco/5.webp", caption: "material renders" }] },
      { tag: "Branding", text: "Website iteration #3", status: "archived" },
      { tag: "Growth", text: "GTM projects to get suppliers onboard" },
      { tag: "Branding", text: "Visual branding assets on socials (linkedin, instagram, etc.)" },
      { tag: "Branding", text: "Website iteration #4", status: "live" },
      { tag: "Growth", text: "Tocco Awards to attract new clients on the platform" },
    ],
    images: [
      { src: "/projects/tocco/1.webp", caption: "brand" },
      { src: "/projects/tocco/2.webp", caption: "materials that create a cleaner tomorrow" },
      { src: "/projects/tocco/3.webp", caption: "material library" },
      { src: "/projects/tocco/4.webp", caption: "supplier profile — earth score" },
      { src: "/projects/tocco/5.webp", caption: "sample box" },
      { src: "/projects/tocco/6.webp", caption: "marketplace — trending themes" },
    ],
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
    rows: [
      { tag: "Design", text: "New item funnel", status: "live", images: [{ src: "/projects/sourceful/10.webp", caption: "create new" }, { src: "/projects/sourceful/8.webp", caption: "ai packaging brief" }] },
      { tag: "Design", text: "Discover / Packaging library page", status: "live" },
      { tag: "Design", text: "Discover / Packaging theme page", status: "live", images: [{ src: "/projects/sourceful/9.webp", caption: "design gallery" }] },
      { tag: "Design", text: "Select / Product page details (digestible data)", status: "live", images: [{ src: "/projects/sourceful/2.webp", caption: "mailer box — presets" }] },
      { tag: "Design", text: "Select / Similar items section (recommendation upsell)", status: "live" },
      { tag: "Branding", text: "Visuals iteration", status: "archived", images: [{ src: "/projects/sourceful/7.webp", caption: "packaging design" }] },
      { tag: "Design", text: "Build the whole Design system", status: "live" },
      { tag: "Design", text: "Edit / Packaging 3D page", status: "live", images: [{ src: "/projects/sourceful/1.webp", caption: "add tape — configurator" }] },
      { tag: "Design", text: "Edit / Parameters panel", status: "live", images: [{ src: "/projects/sourceful/3.webp", caption: "artwork editor — filters" }] },
      { tag: "Design", text: "Buy / Cart page", status: "live", images: [{ src: "/projects/sourceful/6.webp", caption: "order summary" }] },
    ],
    images: [
      { src: "/projects/sourceful/1.webp", caption: "add tape — configurator" },
      { src: "/projects/sourceful/2.webp", caption: "mailer box — presets" },
      { src: "/projects/sourceful/3.webp", caption: "artwork editor — filters" },
      { src: "/projects/sourceful/4.webp", caption: "shop + platform" },
      { src: "/projects/sourceful/5.webp", caption: "tape configurator, v1" },
      { src: "/projects/sourceful/6.webp", caption: "order summary" },
      { src: "/projects/sourceful/7.webp", caption: "packaging design" },
      { src: "/projects/sourceful/8.webp", caption: "ai packaging brief" },
      { src: "/projects/sourceful/9.webp", caption: "design gallery" },
      { src: "/projects/sourceful/10.webp", caption: "create new" },
    ],
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
  "onboarding-studio": {
    id: "onboarding-studio",
    title: "onboarding studio",
    year: "2025 — now",
    tag: "internal tool",
    oneLiner: "our in-house platform to build, ship and measure onboardings and paywalls — no app release needed.",
    body: [
      "one cockpit for everything live: onboardings, paywalls, moments, per app version. replaced superwall.",
      "flow analytics per step: where users quit, who skips, how branches split and merge.",
      "user-level debugging: why this user got a paywall, which audience matched, what they answered.",
    ],
    images: [
      { src: "/projects/onboarding-studio/1.webp", caption: "overview — what's live" },
      { src: "/projects/onboarding-studio/2.webp", caption: "onboarding flow analytics" },
      { src: "/projects/onboarding-studio/3.webp", caption: "user detail — why did they get a paywall?" },
    ],
  },
  harmony: {
    id: "harmony",
    title: "harmony",
    year: "2024 — now",
    tag: "cycle syncing",
    oneLiner: "more than a period tracker — sync energy, meals, movement and mindset with your cycle.",
    body: [
      "cycle phases, a daily forecast, nutrition and workouts tuned to where you are in your cycle.",
      "top 10 women's app · trusted by 600k users · 4.7 ★ on 10k+ ratings.",
    ],
    imageFrame: "phone",
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
    tag: "fitness",
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
    imageFrame: "phone",
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
    imageFrame: "phone",
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
    imageFrame: "phone",
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

export const intro = [
  "hey, thanks for stopping by.",
  "i'm ed, product designer with 7 years of exp., based in amsterdam, currently leading product & design at rocapine.",
];

export const about = [
  "Product designer with 7 years of exp. in early-stage startups. I work at the intersection of design, product, and engineering.",
  "I thrive in handyman roles with extreme ownership, where the designer actually ships (design, engineering, branding, you name it).",
  "currently leading the product & design team at rocapine — a mobile consumer app studio shipping ~150 apps a year.",
  "Previously: head of design & product at tocco, founding designer at Pimento (acq. by Mistral AI), founding designer at sourceful, and a stint as a data consultant at accenture in london.",
];

/** experience, newest first, with the role held */
export const work: { id: string; role: string }[] = [
  { id: "rocapine", role: "lead product & design" },
  { id: "pimento", role: "freelance founding designer" },
  { id: "tocco", role: "founding designer" },
  { id: "tadaa", role: "co-founder & cpo" },
  { id: "rdv", role: "freelance designer" },
  { id: "sourceful", role: "founding designer" },
  { id: "accenture", role: "consultant" },
];

/** side projects + experiments, newest first */
export const playground = ["simple-works", "gradium", "moipresident", "azom", "ride-on"];

export const contact = {
  email: "edouard.bucaille@gmail.com",
  linkedin: "https://www.linkedin.com/in/edouardbucaille/",
  cv: "/edouard-bucaille-cv.pdf",
};
