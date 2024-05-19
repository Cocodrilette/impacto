'use client'
import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { abi } from '@/constants/abi/impact-manager';
import { ImpactManagerAddress } from '@/constants';
import { parseUnits } from 'viem';
import { DonateForm } from '@/components/ui/donate-form';
function Donate() {
  const [amount, setAmount] = useState<null | string>(null);
  const { writeContract } = useWriteContract();

  return (
    <main className='p-6 flex justify-center '>
      <DonateForm />
    </main>
  );
}

export default Donate;
