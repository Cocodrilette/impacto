"use client";
import React, { useEffect } from "react";
import { HandCoins, Landmark, LayoutDashboard, Sprout } from "lucide-react";
import Image from "next/image";
import ImpactoLogo from "../public/impacto-logo.png";
import { Dot } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useReadContract } from "wagmi";
import { abi } from "@/constants/abi/impact-manager";
import { ImpactManagerAddress } from "@/constants";
import { formatEther } from "viem";

function Navbar({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const { data, refetch, error, isFetched } = useReadContract({
    abi: abi,
    address: ImpactManagerAddress,
    functionName: "balanceOf",
    args: [ImpactManagerAddress],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[56px]">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
          <div className="flex items-center justify-center border-b p-2">
            <Button variant="link" size="icon" aria-label="Home">
              <Image src={ImpactoLogo} height={30} alt="Logo de Impacto" />
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => push("/dashboard")}
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Dashboard"
                >
                  <LayoutDashboard />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Dashboard
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] justify-between items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Impacto</h1>
            <div className="flex items-center justify-center text-sm text-gray-300 gap-2 py-1 px-2 border rounded-md">
              <Dot className="m-auto text-green-400 animate-pulse" />
              Total value allocated{" "}
              <strong>
                {typeof data === "bigint" ? formatEther(data) : "0"} USD
              </strong>
            </div>
          </header>{" "}
          {children}
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Navbar;
