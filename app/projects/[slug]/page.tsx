import { Desktop } from "@/components/os/Desktop";
import { findNode } from "@/lib/fs";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { slug: "rocapine" },
    { slug: "customer-support" },
    { slug: "website" },
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
