'use client';

import { useReadContract } from 'wagmi';
import React, { useEffect, useState } from 'react';
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
import { calculateAllocation } from '@/function/calculateAllocation';

function TotalAllocation() {
  const [initialValues, setInitialValues] = useState<null | {
    starttime: number;
    lifetime: number;
    target: number;
    milestones: {
      compliance: number;
      weight: number;
    }[];
  }>(null);
  const [allocation, setAllocation] = useState('0');
  const { data, refetch, error, isFetched } = useReadContract({
    abi: impactManagerAbi,
    address: ImpactManagerAddress,
    functionName: 'getAllocation',
    args: [0, 2],
  });

  useEffect(() => {
    setInitialValues({
      starttime: 1714589575,
      lifetime: 1716145243,
      target: 100000,
      milestones: [
        {
          compliance: 100,
          weight: 10,
        },
        {
          compliance: 100,
          weight: 20,
        },
        {
          compliance: 100,
          weight: 70,
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (!initialValues) return;
    const updateAllocation = () => {
      const t = Math.floor(Date.now() / 1000); // Current time in seconds
      const newAllocation = calculateAllocation(t, initialValues, 1);
      setAllocation(newAllocation.toString()); // Adjust as needed
    };

    const intervalId = setInterval(updateAllocation, 1000);
    return () => clearInterval(intervalId);
  }, [initialValues]);

  return (
    <Card className='allocation w-full'>
      <CardHeader>
        <CardTitle>Total allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <strong>
          $
          <motion.span className='text-2xl font-bold'>{allocation}</motion.span>{' '}
          USD{' '}
        </strong>
      </CardContent>
      <CardFooter className='text-sm'>
        There is your the total amount allocated to you
      </CardFooter>
    </Card>
  );
}

export default TotalAllocation;
