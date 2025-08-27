"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export default function SidebarTriggerFloating({ className }: Props) {
  const { state, isMobile } = useSidebar();
  const [css, setCss] = useState<string>("");
  const [clickTick, setClickTick] = useState<number>(0);

  useEffect(() => {
    isMobile
      ? setCss(state === "collapsed" ? "" : "hidden")
      : setCss(state === "expanded" ? "7rem" : "");
  }, [state, isMobile, clickTick]);

  return (
    <SidebarTrigger
      className={cn(
        "absolute top-2 z-20",
        className,
        isMobile ? css : undefined
      )}
      style={!isMobile ? { left: css } : undefined}
      onClick={() => setClickTick((v) => v + 1)}
    />
  );
}
