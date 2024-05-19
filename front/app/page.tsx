"use client";

import TotalAllocation from "@/components/TotalAllocation";
import { DonateForm } from "@/components/ui/donate-form";

import GrowthChart from "@/components/GrowthChart";

export default function Home() {
  return (
    <main className="dashboard">
      <TotalAllocation />
      <DonateForm />
      <GrowthChart />
    </main>
  );
}
