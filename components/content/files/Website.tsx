export function Website() {
  return (
    <article>
      <h1>rocapine.com</h1>
      <p className="text-[var(--color-phosphor-dim)] mt-1 mb-4">
        marketing site · 2025 · ● live
      </p>

      <div className="grid grid-cols-[100px_1fr] gap-y-1 text-[12px] mb-5">
        <span className="text-[var(--color-phosphor-faint)]">role</span>
        <span>solo: design, motion, code, copy</span>
        <span className="text-[var(--color-phosphor-faint)]">stack</span>
        <span>vanilla html · lottie · GSAP · vercel</span>
        <span className="text-[var(--color-phosphor-faint)]">status</span>
        <span className="text-[var(--color-phosphor-bright)]">● live at rocapine.com</span>
      </div>

      <h2>problem</h2>
      <p>
        Most app marketing sites are a hero with a phone mockup and three
        feature columns. They blur together. I wanted something that felt like
        the app, not a wrapper around App Store screenshots.
      </p>

      <h2>approach</h2>
      <ul>
        <li>Lottie speed-line animation that responds to scroll velocity</li>
        <li>a tweet wall of real milestones — building in public, literally</li>
        <li>hover-triggered audio (amo.co influence) on key CTAs</li>
        <li>no framework — straight HTML, scoped JS modules, ships fast</li>
      </ul>

      <h2>outcome</h2>
      <ul>
        <li>Lighthouse 100/100/100/100 on every page</li>
        <li>doubled the App Store CTR from a previous wordpress template</li>
        <li>still gets compliments from designers I respect</li>
      </ul>

      <h2>links</h2>
      <ul>
        <li>
          <a href="https://rocapine.com" target="_blank" rel="noreferrer">
            rocapine.com
          </a>
        </li>
      </ul>
    </article>
  );
}
