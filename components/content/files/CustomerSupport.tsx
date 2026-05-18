export function CustomerSupport() {
  return (
    <article>
      <h1>customer-support</h1>
      <p className="text-[var(--color-phosphor-dim)] mt-1 mb-4">
        internal inbox tool · 2026 · ● in use
      </p>

      <div className="grid grid-cols-[100px_1fr] gap-y-1 text-[12px] mb-5">
        <span className="text-[var(--color-phosphor-faint)]">role</span>
        <span>design + engineering</span>
        <span className="text-[var(--color-phosphor-faint)]">stack</span>
        <span>next.js · supabase · resend · instagram api</span>
        <span className="text-[var(--color-phosphor-faint)]">status</span>
        <span className="text-[var(--color-phosphor-bright)]">● running internally</span>
      </div>

      <h2>problem</h2>
      <p>
        Support messages were spread across email, in-app chat, and Instagram
        DMs. Nothing tied them to a user. Every reply was retyped, every
        context lost.
      </p>

      <h2>approach</h2>
      <ul>
        <li>
          unified inbox: email (via Resend), in-app messages, and Instagram
          DMs land in the same thread
        </li>
        <li>grouped by sender — every conversation is a real thread</li>
        <li>AI-drafted replies you can accept, edit, or ignore</li>
        <li>improvements pipeline: bug reports get turned into tickets</li>
      </ul>

      <h2>outcome</h2>
      <ul>
        <li>response time dropped from days to hours</li>
        <li>I stopped dreading the &quot;Support&quot; tab on my phone</li>
        <li>users started getting actual replies from a human, not a form</li>
      </ul>

      <p className="text-[var(--color-phosphor-faint)] mt-4 text-[11px]">
        Private tool — happy to demo on a call.
      </p>
    </article>
  );
}
