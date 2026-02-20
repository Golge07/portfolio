"use client";

import { useEffect, useState } from "react";
import type { PortfolioData } from "@/types/portfolio";

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/data/portfolio.json", { cache: "no-store" });
        if (!response.ok) {
          if (active) setData(null);
          return;
        }

        const nextData = (await response.json()) as PortfolioData;
        if (active) {
          setData(nextData);
        }
      } catch {
        if (active) {
          setData(null);
        }
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, []);

  return data;
}
