export function Rocapine() {
  return (
    <article>
      <h1>rocapine</h1>
      <p className="text-[var(--color-phosphor-dim)] mt-1 mb-4">
        ios habit tracker · 2024 — ongoing · ● live
      </p>

      <div className="grid grid-cols-[100px_1fr] gap-y-1 text-[12px] mb-5">
        <span className="text-[var(--color-phosphor-faint)]">role</span>
        <span>solo founder · design + engineering</span>
        <span className="text-[var(--color-phosphor-faint)]">stack</span>
        <span>expo · supabase · stripe · typescript</span>
        <span className="text-[var(--color-phosphor-faint)]">status</span>
        <span className="text-[var(--color-phosphor-bright)]">● live on the app store</span>
        <span className="text-[var(--color-phosphor-faint)]">dates</span>
        <span>2024 — ongoing</span>
      </div>

      <h2>problem</h2>
      <p>
        Habit trackers feel like homework. Every check-in is another tiny
        guilt-trip. The market is full of apps that punish you for missing a
        day, then quietly stop being opened after a week.
      </p>

      <h2>approach</h2>
      <p>
        Build a tracker that treats a missed day like nothing happened. No
        streaks broken. No red ❌. The animation when you check a habit is the
        reward, not the streak counter.
      </p>
      <ul>
        <li>one-tap check-in from a widget — no app launch needed</li>
        <li>weekly view that visualises consistency without scoring it</li>
        <li>imports from Apple Health so existing data isn&apos;t wasted</li>
      </ul>

      <h2>outcome</h2>
      <ul>
        <li>shipped to the App Store</li>
        <li>built entirely solo: design, code, infra, copy, marketing</li>
        <li>still my daily driver — the test bed for everything I build</li>
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
