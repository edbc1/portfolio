import { About } from "./files/About";
import { Contact } from "./files/Contact";
import { Rocapine } from "./files/Rocapine";
import { CustomerSupport } from "./files/CustomerSupport";
import { Website } from "./files/Website";
import { PortfolioOs } from "./files/PortfolioOs";

const registry: Record<string, () => React.ReactNode> = {
  about: About,
  contact: Contact,
  "projects/rocapine": Rocapine,
  "projects/customer-support": CustomerSupport,
  "projects/website": Website,
  "projects/portfolio-os": PortfolioOs,
};

export function FileContent({ path }: { path: string }) {
  const Component = registry[path];
  if (!Component) {
    return (
      <div className="text-[var(--color-phosphor-faint)]">
        <p>file not found: {path}</p>
        <p className="mt-2">that file doesn&apos;t exist (yet).</p>
      </div>
    );
  }
  return <Component />;
}
