export function Tadaa() {
  return (
    <article>
      <h1>tadaa</h1>
      <p className="text-[var(--color-phosphor-dim)] mt-1 mb-4">
        saas · 2022 — 2023 · ● shipped
      </p>

      <div className="grid grid-cols-[100px_1fr] gap-y-1 text-[12px] mb-5">
        <span className="text-[var(--color-phosphor-faint)]">role</span>
        <span>design + engineering</span>
        <span className="text-[var(--color-phosphor-faint)]">stack</span>
        <span>react · real-time canvas · websockets</span>
        <span className="text-[var(--color-phosphor-faint)]">status</span>
        <span>● shipped</span>
      </div>

      <h2>problem</h2>
      <p>
        Product teams build in five tools at once — Linear for tickets,
        Notion for docs, Figma for design, Slack for everything else. The
        actual workflow lives in someone&apos;s head, and onboarding takes
        weeks because nobody can see how the pieces connect.
      </p>

      <h2>approach</h2>
      <ul>
        <li>
          one visible canvas: the team&apos;s entire workflow rendered as a
          living diagram, not a static deck
        </li>
        <li>
          granular content — add a doc, a checklist, a video at any step
          without leaving the flow
        </li>
        <li>real-time collaboration so the canvas updates as work happens</li>
        <li>
          designed for product teams specifically, not generic project
          management
        </li>
      </ul>

      <h2>outcome</h2>
      <ul>
        <li>shipped to product teams who replaced multi-tool stacks with it</li>
        <li>positioned as a designops tool — playbook with superpowers</li>
      </ul>

      <p className="text-[var(--color-phosphor-faint)] mt-6 text-[11px]">
        Drafted from Open Makers + landing page snippets — confirm scope and
        outcomes with Ed.
      </p>
    </article>
  );
}
