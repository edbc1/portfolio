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
echo "  twitter @edbc1"
echo "  github  edbc1"
echo ""
echo "I read everything. I reply to most things."`}
      </pre>

      <p>
        Best way to reach me is{" "}
        <a href="mailto:ed@rocapine.com">ed@rocapine.com</a>. I&apos;m
        especially interested in:
      </p>

      <ul>
        <li>design engineering roles where the line between the two is thin</li>
        <li>founding-engineer or design-engineer #1 at small teams</li>
        <li>collaborations on weird, small, well-crafted things</li>
      </ul>
    </article>
  );
}
