import { Triangle, HandCoins } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import TotalAllocation from "@/components/TotalAllocation";
import CurrentAllocation from "@/components/CurrentAllocation";
import { DonateForm } from "@/components/ui/donate-form";

function Dashboard() {
  return (
    <TooltipProvider>
      <div className="grid h-screen w-full pl-[56px]">
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
          <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
              <Triangle className="size-5 fill-foreground" />
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
          </nav>
        </aside>
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Impacto</h1>
          </header>
          <main
            className="flex flex-col p-2 gap-2"
            // className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <TotalAllocation />
            <DonateForm />
            {/* <CurrentAllocation /> */}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Dashboard;
