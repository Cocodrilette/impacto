'use client';
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';

function CurrentAllocation() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 100);

    return () => controls.stop();
  }, []);
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          Current allocation
        </CardTitle>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='h-4 w-4 text-muted-foreground'
        >
          <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
        </svg>
      </CardHeader>
      <CardContent>
        <motion.div className='text-2xl font-bold'>${rounded}</motion.div>
      </CardContent>
    </Card>
  );
}

export default CurrentAllocation;
