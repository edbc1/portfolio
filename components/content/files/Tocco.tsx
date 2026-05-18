export function Tocco() {
  return (
    <article>
      <h1>tocco</h1>
      <p className="text-[var(--color-phosphor-dim)] mt-1 mb-4">
        sustainability · 2023 — 2024 · ● live
      </p>

      <div className="grid grid-cols-[100px_1fr] gap-y-1 text-[12px] mb-5">
        <span className="text-[var(--color-phosphor-faint)]">role</span>
        <span>design + engineering</span>
        <span className="text-[var(--color-phosphor-faint)]">stack</span>
        <span>next.js · supplier portal · ai-assisted search</span>
        <span className="text-[var(--color-phosphor-faint)]">status</span>
        <span className="text-[var(--color-phosphor-bright)]">● live · 5,000+ materials</span>
      </div>

      <h2>problem</h2>
      <p>
        Sourcing low-carbon materials is slow and opaque. A brand looking for
        recycled cotton has to email twenty suppliers, wait days, and still
        end up comparing PDFs in a spreadsheet. The result: most product
        teams default to whatever&apos;s easy, not what&apos;s sustainable.
      </p>

      <h2>approach</h2>
      <ul>
        <li>
          a B2B marketplace of 5,000+ low-carbon and regenerative materials,
          surfaced by performance, certification, and lead time
        </li>
        <li>
          AI-embedded search so a brief like &quot;recycled stretch denim,
          GRS certified, EU-shipped&quot; returns matches in seconds
        </li>
        <li>
          supplier-side portal: low-friction listings, qualified leads,
          monthly subscription
        </li>
        <li>
          co-development tooling for brands that need to iterate with a
          supplier rather than just buy off the shelf
        </li>
      </ul>

      <h2>outcome</h2>
      <ul>
        <li>live across EU, UK, US, India, China, Vietnam, Singapore, Malaysia</li>
        <li>brands ordering samples directly through the platform</li>
        <li>10× faster material discovery for the teams using it</li>
      </ul>

      <h2>links</h2>
      <ul>
        <li>
          <a href="https://tocco.earth" target="_blank" rel="noreferrer">
            tocco.earth
          </a>
        </li>
      </ul>

      <p className="text-[var(--color-phosphor-faint)] mt-6 text-[11px]">
        Inferred from tocco.earth and Prequel VC profile — confirm role and
        specifics with Ed.
      </p>
    </article>
  );
}
