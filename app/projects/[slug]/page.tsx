import { Desktop } from "@/components/os/Desktop";
import { findNode } from "@/lib/fs";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { slug: "pimento" },
    { slug: "tocco" },
    { slug: "tadaa" },
    { slug: "rdv" },
    { slug: "sourceful" },
    { slug: "ride-on" },
    { slug: "rocapine" },
    { slug: "portfolio-os" },
  ];
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = `projects/${slug}`;
  if (!findNode(path)) notFound();
  return <Desktop initialOpen={path} />;
}
