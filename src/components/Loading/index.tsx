import Image from 'next/image';
import React from 'react';
import logopixeon1 from '@/assets/logo/logo-pixeon-1.webp';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Image src={logopixeon1} alt="Logo Pixeon" className="animate-pulse" />
    </div>
  );
}
