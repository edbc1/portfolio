import { ProjectBlock } from "./ProjectBlock";
import { Timeline, type TimelineEntry } from "./Timeline";
import { contact, intro, playground, projects, work } from "@/lib/site-content";

// the rail sits left of the content column on wide screens
const shell = "mx-auto w-full max-w-[760px] lg:max-w-[992px] lg:grid lg:grid-cols-[200px_760px] lg:gap-x-8";
const column = "px-5 md:px-10";

const timeline: TimelineEntry[] = [
  { id: "about", label: "about", kind: "section" },
  { id: "work", label: "work", kind: "section" },
  ...work
    .filter((w) => projects[w.id])
    .map((w): TimelineEntry => ({ id: projects[w.id].id, label: projects[w.id].title.replace(/ \(.*\)$/, ""), kind: "item" })),
  { id: "playground", label: "playground", kind: "section" },
  { id: "contact", label: "contact", kind: "section" },
];

const linkClass =
  "text-[var(--color-phosphor-bright)] underline underline-offset-4 decoration-[var(--color-border-bright)] hover:decoration-current";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 mt-12 md:mt-16 border-t border-[var(--color-border)] pt-10 md:pt-12">
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
      {/* no header: just room to breathe above the page */}
      <div aria-hidden className="h-12 md:h-16" />

      <div id="top" className={shell}>
        <aside className="hidden lg:block sticky top-0 self-start max-h-screen overflow-y-auto scroll-none pl-10 pt-12 pb-10">
          <Timeline entries={timeline} />
        </aside>
        <main className={`${column} pb-32 min-w-0`}>
          <div id="about" className="scroll-mt-24 pt-6 md:pt-12">
            <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold tracking-tight text-[var(--color-phosphor-bright)]">
              ed bucaille
            </h1>
            <div className="mt-6 max-w-[600px] space-y-4 text-[17px] text-[var(--color-phosphor-dim)] [&>p:first-child]:text-[var(--color-phosphor-bright)]">
              {intro.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

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
