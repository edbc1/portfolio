export function RideOn() {
  return (
    <article>
      <h1>ride-on</h1>
      <p className="text-[var(--color-phosphor-dim)] mt-1 mb-4">
        for fun · 2021 — 2022
      </p>

      <div className="grid grid-cols-[100px_1fr] gap-y-1 text-[12px] mb-5">
        <span className="text-[var(--color-phosphor-faint)]">role</span>
        <span>design + engineering</span>
        <span className="text-[var(--color-phosphor-faint)]">type</span>
        <span>concept · e-commerce configurator</span>
      </div>

      <h2>the idea</h2>
      <p>
        Selling high-end racing bikes is mostly catalog-shopping in disguise
        — pick a frame, hope the spec sheet matches what you wanted. The
        idea: bring the Lego experience to bikes. Snap modular parts
        together, see the price update, see the build come together.
      </p>

      <h2>approach</h2>
      <ul>
        <li>each part of the bike as a swappable, snappable block</li>
        <li>real-time configurator with the build rendered as you change parts</li>
        <li>identity, product, and prototype designed end-to-end</li>
      </ul>

      <p className="text-[var(--color-phosphor-faint)] mt-6 text-[11px]">
        Concept / personal project. Ed to add stage (prototype vs shipped),
        links, and any visuals.
      </p>
    </article>
  );
}
