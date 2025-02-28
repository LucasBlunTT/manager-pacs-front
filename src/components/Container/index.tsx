'use client';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={`flex w-full max-w-[800px] px-[15px] mx-auto ${className}`}>
      {children}
    </div>
  );
}
