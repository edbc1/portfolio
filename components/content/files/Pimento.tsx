export function Pimento() {
  return (
    <article>
      <h1>pimento</h1>
      <p className="text-[var(--color-phosphor-dim)] mt-1 mb-4">
        genai · 2024 — ongoing · ● live
      </p>

      <div className="grid grid-cols-[100px_1fr] gap-y-1 text-[12px] mb-5">
        <span className="text-[var(--color-phosphor-faint)]">role</span>
        <span>design + engineering</span>
        <span className="text-[var(--color-phosphor-faint)]">stack</span>
        <span>react · fine-tuned stable diffusion · llama · fal</span>
        <span className="text-[var(--color-phosphor-faint)]">status</span>
        <span className="text-[var(--color-phosphor-bright)]">● live · €3.2M raised</span>
        <span className="text-[var(--color-phosphor-faint)]">team</span>
        <span>paris-based startup, founded 2022</span>
      </div>

      <h2>problem</h2>
      <p>
        Creative teams burn the first half of every project on mood-boarding —
        scraping references, juggling tabs, then chasing brand consistency
        through a stack of Slack threads. Generative AI tools that exist
        either output generic stock-feel images or require prompt-engineering
        skill the team doesn&apos;t have.
      </p>

      <h2>approach</h2>
      <ul>
        <li>
          turn a one-paragraph creative brief into a full mood board —
          images, type, palette — in a single pass
        </li>
        <li>
          fine-tune image models on each brand&apos;s visual identity so
          outputs stay on-brand
        </li>
        <li>
          collaborative canvas: art directors, animation studios, and
          marketing teams iterate together
        </li>
      </ul>

      <h2>outcome</h2>
      <ul>
        <li>raised €3.2M to scale the platform</li>
        <li>used in branding, advertising, and animation pipelines</li>
        <li>customers include agencies and in-house creative teams</li>
      </ul>

      <h2>links</h2>
      <ul>
        <li>
          <a href="https://pimento.design" target="_blank" rel="noreferrer">
            pimento.design
          </a>
        </li>
      </ul>

      <p className="text-[var(--color-phosphor-faint)] mt-6 text-[11px]">
        Inferred from public coverage (TechCrunch, fal.ai case study) —
        ground-truth specifics with Ed.
      </p>
    </article>
  );
}
