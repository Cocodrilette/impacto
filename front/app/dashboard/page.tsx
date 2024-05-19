'use client';

import TotalAllocation from '@/components/TotalAllocation';
import { DonateForm } from '@/components/ui/donate-form';

import { Projects } from '@/components/ui/projects';
import GrowthChart from '@/components/GrowthChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function Dashboard() {
  return (
    <main className='dashboard'>
      <TotalAllocation />
      <DonateForm />
      <GrowthChart />
    </main>
  );
}

export default Dashboard;
