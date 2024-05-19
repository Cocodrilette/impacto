'use client'
import React from 'react'
import { HandCoins, Landmark, LayoutDashboard, Sprout } from 'lucide-react';
import Image from 'next/image';
import ImpactoLogo from '../public/impacto-logo.png';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';


function Navbar({children}: {children: React.ReactNode}) {
  const { push } = useRouter();

  return (
    <TooltipProvider>
    <div className='grid h-screen w-full pl-[56px]'>
      <aside className='inset-y fixed  left-0 z-20 flex h-full flex-col border-r'>
        <div className='flex items-center justify-center border-b p-2'>
          <Button variant='link' size='icon' aria-label='Home'>
            <Image src={ImpactoLogo} height={30} alt='Logo de Impacto' />
          </Button>
        </div>
        <nav className='grid gap-1 p-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => push('/dashboard')}
                variant='ghost'
                size='icon'
                className='rounded-lg bg-muted'
                aria-label='Dashboard'
              >
                <LayoutDashboard />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right' sideOffset={5}>
              Dashboard
            </TooltipContent>
          </Tooltip>

        </nav>
      </aside>
      <div className='flex flex-col'>
        <header className='sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4'>
          <h1 className='text-xl font-semibold'>Impacto</h1>
        </header> {children}     </div>
      </div>
    </TooltipProvider>
  )
}

export default Navbar