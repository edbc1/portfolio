export function Sourceful() {
  return (
    <article>
      <h1>sourceful</h1>
      <p className="text-[var(--color-phosphor-dim)] mt-1 mb-4">
        e-commerce · 2021 — 2022 · ● live
      </p>

      <div className="grid grid-cols-[100px_1fr] gap-y-1 text-[12px] mb-5">
        <span className="text-[var(--color-phosphor-faint)]">role</span>
        <span>design + engineering</span>
        <span className="text-[var(--color-phosphor-faint)]">stack</span>
        <span>react · in-browser design tool · manufacturer api</span>
        <span className="text-[var(--color-phosphor-faint)]">status</span>
        <span className="text-[var(--color-phosphor-bright)]">● live</span>
      </div>

      <h2>problem</h2>
      <p>
        E-commerce brands want sustainable packaging but the path to get
        there is brutal: find a manufacturer, vet their certifications,
        design the artwork in a tool that doesn&apos;t talk to production,
        ship samples, iterate. Most teams give up and order another roll of
        bubble wrap.
      </p>

      <h2>approach</h2>
      <ul>
        <li>
          a B2B platform that combines material sourcing, in-browser design,
          and direct manufacturer connectivity
        </li>
        <li>
          an in-house customization tool: brands lay out artwork and dielines
          without leaving the platform
        </li>
        <li>
          tight loop between design intent and production specs — what you
          design is what gets made
        </li>
      </ul>

      <h2>outcome</h2>
      <ul>
        <li>shipped as the core of sourceful.com&apos;s packaging platform</li>
        <li>
          foundation for the company&apos;s later generative-AI packaging
          tool, Spring (2024 — first free GenAI tool in packaging)
        </li>
      </ul>

      <h2>links</h2>
      <ul>
        <li>
          <a href="https://www.sourceful.com" target="_blank" rel="noreferrer">
            sourceful.com
          </a>
        </li>
      </ul>

      <p className="text-[var(--color-phosphor-faint)] mt-6 text-[11px]">
        Inferred from sourceful.com and packaging-industry coverage. Ed to
        confirm role and dates.
      </p>
    </article>
  );
}
