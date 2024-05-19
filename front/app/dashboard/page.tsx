"use client";

import {  HandCoins, Landmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import TotalAllocation from "@/components/TotalAllocation";
import { DonateForm } from "@/components/ui/donate-form";
import Image from "next/image";

import ImpactoLogo from "../../public/impacto-logo.png";
import { Projects } from "@/components/ui/projects";
import GrowthChart from "@/components/GrowthChart";

function Dashboard() {
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
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Donar"
                >
                  <HandCoins className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Donar
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="Proyectos"
                >
                  <Landmark className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Proyectos
              </TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Impacto</h1>
          </header>
          <main className="dashboard">
          <TotalAllocation />
                <DonateForm />
                <GrowthChart />
            {/* <Projects /> */}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Dashboard;
