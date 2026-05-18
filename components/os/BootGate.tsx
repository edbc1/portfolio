"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BootScreen } from "./BootScreen";

const STORAGE_KEY = "rocapine-os-booted";

export function BootGate({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    setHydrated(true);
    const already = sessionStorage.getItem(STORAGE_KEY);
    if (already) setShowBoot(false);
  }, []);

  const finishBoot = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowBoot(false);
  };

  return (
    <>
      {children}
      {hydrated && showBoot && <BootScreen onDone={finishBoot} />}
    </>
  );
}
