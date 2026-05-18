import { About } from "./files/About";
import { Contact } from "./files/Contact";
import { Pimento } from "./files/Pimento";
import { Tocco } from "./files/Tocco";
import { Tadaa } from "./files/Tadaa";
import { Rdv } from "./files/Rdv";
import { Sourceful } from "./files/Sourceful";
import { RideOn } from "./files/RideOn";
import { Rocapine } from "./files/Rocapine";
import { PortfolioOs } from "./files/PortfolioOs";

const registry: Record<string, () => React.ReactNode> = {
  about: About,
  contact: Contact,
  "projects/pimento": Pimento,
  "projects/tocco": Tocco,
  "projects/tadaa": Tadaa,
  "projects/rdv": Rdv,
  "projects/sourceful": Sourceful,
  "projects/ride-on": RideOn,
  "projects/rocapine": Rocapine,
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
