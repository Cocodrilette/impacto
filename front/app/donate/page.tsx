'use client'
import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { abi } from '@/constants/abi/impact-manager';
import { ImpactManagerAddress } from '@/constants';
import { parseUnits } from 'viem';
function Donate() {
  const [amount, setAmount] = useState<null | string>(null);
  const { writeContract } = useWriteContract();

  return (
    <div>
      donate
      <input type='text' onChange={(e) => setAmount(e.target.value)} />
      <button
        onClick={() =>
          writeContract({
            abi,
            address: ImpactManagerAddress,
            functionName: 'donate',
            args: [parseUnits(amount || '0', 18)],
          })
        }
      >
        ClickMe
      </button>
    </div>
  );
}

export default Donate;
