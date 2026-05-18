export function Contact() {
  return (
    <article>
      <h1>contact.sh</h1>
      <p className="text-[var(--color-phosphor-dim)] mb-4">
        the simplest way to reach me
      </p>

      <pre className="text-[12px] leading-relaxed text-[var(--color-phosphor)] mb-4">
{`$ cat contact.sh
#!/bin/sh
echo "hello, my name is ed."
echo "if you want to talk:"
echo ""
echo "  email   ed@rocapine.com"
echo "  github  edbc1"
echo ""
echo "I read everything. I reply to most things."`}
      </pre>

      <p>
        Best way to reach me is{" "}
        <a href="mailto:ed@rocapine.com">ed@rocapine.com</a>. I&apos;m open
        to:
      </p>

      <ul>
        <li>
          <strong>0 — TO — 1 engagements</strong>: design + ship a core
          feature in a week
        </li>
        <li>founding-engineer or design-engineer #1 roles at small teams</li>
        <li>
          longer collaborations on weird, small, well-crafted things
        </li>
      </ul>
    </article>
  );
}
