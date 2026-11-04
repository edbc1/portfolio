import { ProjectBlock } from "./ProjectBlock";
import { Timeline, type TimelineEntry } from "./Timeline";
import { about, contact, intro, playground, projects, work } from "@/lib/site-content";

const sections = [
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "playground", label: "playground" },
  { id: "contact", label: "contact" },
];

// the rail sits left of the content column on wide screens
const shell = "mx-auto w-full max-w-[760px] lg:max-w-[1008px] lg:grid lg:grid-cols-[200px_760px] lg:gap-x-12";
const column = "px-5 md:px-10";

const timeline: TimelineEntry[] = [
  { id: "about", label: "about", kind: "section" },
  { id: "work", label: "work", kind: "section" },
  ...work
    .filter((w) => projects[w.id])
    .map((w): TimelineEntry => ({ id: projects[w.id].id, label: projects[w.id].title, kind: "item" })),
  { id: "playground", label: "playground", kind: "section" },
  { id: "contact", label: "contact", kind: "section" },
];

const linkClass =
  "text-[var(--color-phosphor-bright)] underline underline-offset-4 decoration-[var(--color-border-bright)] hover:decoration-current";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 pt-16 md:pt-24">
      <h2 className="mb-8 text-[13px] text-[var(--color-phosphor-faint)]">{title}</h2>
      {children}
    </section>
  );
}

export function Site() {
  return (
    <div
      data-view-root="site"
      className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth scroll-hidden bg-[var(--color-bg)] font-sans text-[15px] leading-relaxed"
    >
      <header className="sticky top-0 z-30 bg-[var(--color-bg)]/90 backdrop-blur-sm">
        <div className={`${shell} h-12 md:h-16 items-center`}>
          <a href="#top" className="hidden lg:block font-semibold text-[var(--color-phosphor-bright)]">
            ed bucaille
          </a>
          <div className={`${column} h-full flex items-center gap-6 pr-24 md:pr-10`}>
            <a href="#top" className="hidden sm:block lg:hidden font-semibold text-[var(--color-phosphor-bright)]">
              ed bucaille
            </a>
            <nav className="flex gap-4 text-[14px] text-[var(--color-phosphor-dim)]">
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="hover:text-[var(--color-phosphor-bright)] transition-colors">
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div id="top" className={shell}>
        <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto scroll-none pt-16 pb-10">
          <Timeline entries={timeline} />
        </aside>
        <main className={`${column} pb-32 min-w-0`}>
          <div className="pt-16 md:pt-28">
            <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-[var(--color-phosphor-bright)]">
              ed bucaille
            </h1>
            <div className="mt-5 max-w-[560px] space-y-2 text-[17px] text-[var(--color-phosphor-dim)]">
              {intro.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <Section id="about" title="about">
            <div className="space-y-4 text-[var(--color-phosphor)]">
              {about.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </Section>

          <Section id="work" title="work">
            {work
              .filter((w) => projects[w.id])
              .map((w) => (
                <ProjectBlock key={w.id} project={projects[w.id]} role={w.role} />
              ))}
          </Section>

          <Section id="playground" title="playground">
            {playground
              .filter((id) => projects[id])
              .map((id) => (
                <ProjectBlock key={id} project={projects[id]} />
              ))}
          </Section>

          <Section id="contact" title="contact">
            <p className="mb-4 text-[var(--color-phosphor)]">happy to chat about product, design, or anything you saw here.</p>
            <ul className="space-y-1.5">
              <li>
                <a href={`mailto:${contact.email}`} className={linkClass}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
                  linkedin ↗
                </a>
              </li>
              <li>
                <a href={contact.cv} target="_blank" rel="noreferrer" className={linkClass}>
                  cv (pdf) ↗
                </a>
              </li>
            </ul>
          </Section>
        </main>
      </div>
    </div>
  );
}
