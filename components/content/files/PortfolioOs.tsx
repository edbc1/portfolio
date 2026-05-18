export function PortfolioOs() {
  return (
    <article>
      <h1>portfolio-os</h1>
      <p className="text-[var(--color-phosphor-dim)] mt-1 mb-4">
        the site you&apos;re currently inside · 2026 · ● live
      </p>

      <div className="grid grid-cols-[100px_1fr] gap-y-1 text-[12px] mb-5">
        <span className="text-[var(--color-phosphor-faint)]">role</span>
        <span>solo: concept, design, engineering</span>
        <span className="text-[var(--color-phosphor-faint)]">stack</span>
        <span>next.js 16 · react 19 · zustand · tailwind v4</span>
        <span className="text-[var(--color-phosphor-faint)]">status</span>
        <span className="text-[var(--color-phosphor-bright)]">● shipping continuously</span>
      </div>

      <h2>problem</h2>
      <p>
        A portfolio in 2026 has roughly two options: another grid of project
        cards, or a one-page scroll with animations that try too hard. Neither
        proves anything about how you build.
      </p>

      <h2>approach</h2>
      <p>
        Build the portfolio as a fictional operating system. Every project is
        a file. Every detail of the OS — the boot sequence, the draggable
        windows, the command palette, the CRT scanlines — is a small proof
        that the same person designed and engineered it.
      </p>
      <ul>
        <li>real window manager: drag, resize, focus, minimise, z-stack</li>
        <li>command palette with fuzzy file search</li>
        <li>CRT scanlines + phosphor glow rendered in pure CSS</li>
        <li>keyboard-first navigation with mouse parity</li>
      </ul>

      <h2>what&apos;s next</h2>
      <ul>
        <li>WebGL CRT shader (real bloom, barrel distortion)</li>
        <li>a working console — backtick opens a real shell</li>
        <li>play/ — five WebGL experiments</li>
        <li>view-source button on every window</li>
      </ul>

      <p className="text-[var(--color-phosphor-faint)] mt-4 text-[11px]">
        This file is the site explaining itself. That&apos;s the point.
      </p>
    </article>
  );
}
