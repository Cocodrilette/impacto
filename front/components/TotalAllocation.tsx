'use client';

import { useReadContract } from 'wagmi';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { abi as impactManagerAbi } from '@/constants/abi/impact-manager';
import { ImpactManagerAddress } from '@/constants';
import { formatUnits } from 'viem';

function TotalAllocation() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const { data, refetch, error, isFetched } = useReadContract({
    abi: impactManagerAbi,
    address: ImpactManagerAddress,
    functionName: 'balanceOf',
    args: [ImpactManagerAddress],
  });

  useEffect(() => {
    const animation = animate(count, 100000, { duration: 1 });
    return animation.stop;
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className='allocation w-full'>
      <CardHeader >
        <CardTitle>Total allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <strong>
          $
          <motion.span className='text-2xl font-bold'>
            {typeof data === 'bigint' ? formatUnits(data, 18) : '0'}
          </motion.span>{' '}
          USD{' '}
        </strong>
      </CardContent>
      <CardFooter className='text-sm'>There is your the total amount allocated to you</CardFooter>
    </Card>
  );
}

export default TotalAllocation;
