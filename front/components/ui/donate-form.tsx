'use client';

import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import { usePrivy } from '@privy-io/react-auth';
import { abi } from '@/constants/abi/impact-manager';
import { ImpactManagerAddress } from '@/constants';
import { formatEther, parseUnits } from 'viem';
import { useEffect } from 'react';
import { useToast } from './use-toast';
import { Button } from './button';
import { Input } from './input';

export function DonateForm() {
  const { address } = useAccount();
  const { connectWallet } = usePrivy();
  const { toast } = useToast();
  const { data, refetch, error, isFetched } = useReadContract({
    abi: abi,
    address: ImpactManagerAddress,
    functionName: 'balanceOf',
    args: [address],
  });
  const { writeContract, isError, isSuccess } = useWriteContract();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, [data]);

  function handleDonate() {
    const { value } = document.getElementById('amount') as HTMLInputElement;
    if (!value || parseInt(value) === 0) {
      toast({ title: 'Amount is required' });
      return;
    }

    const currentBalance = typeof data === 'bigint' ? data : 0;
    const valueBN = parseUnits(value, 18);

    if (valueBN > currentBalance) {
      toast({ title: 'Insufficient balance' });
      return;
    }

    writeContract({
      abi: abi,
      address: ImpactManagerAddress,
      functionName: 'donate',
      args: [valueBN],
    });
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: 'Donation successful. Wait for the transaction to confirm.',
      });
      refetch();
    }
    if (isError) {
      toast({ title: 'Donation failed' });
    }
  }, [isSuccess, isError]);

  return (
    <Card className='donate w-full'>
      <CardHeader>
        <CardTitle>
          Donate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          disabled={!address}
          id='amount'
          className='w-full'
        />
        <p className='text-xs text-gray-400 mt-1'>
          {data
            ? `Available: ${typeof data === 'bigint' ? formatEther(data) : '0'}`
            : 'Loading...'}
        </p>
      </CardContent>
      <CardFooter>
        <Button
        className='w-full font-bold'
          onClick={() => {
            if (address) {
              handleDonate();
            } else {
              connectWallet();
            }
          }}
        >
          {address ? 'Donate' : 'Connect Wallet'}
        </Button>
      </CardFooter>
    </Card>
  );
}
