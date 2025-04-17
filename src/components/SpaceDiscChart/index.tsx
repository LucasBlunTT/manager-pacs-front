'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SpaceDiscChartProps {
  spaceTotal: number;
  spaceFree: number;
  discName?: string;
}

export default function SpaceDiscChart({
  spaceTotal,
  spaceFree,
  discName,
}: SpaceDiscChartProps) {
  const spaceUsed = spaceTotal - spaceFree;
  const percentageUsed = (spaceUsed / spaceTotal) * 100;

  const getColor = () => {
    if (percentageUsed > 80) return '#FF0000';
    if (percentageUsed > 50) return '#FFA500'; 
    return '#008000'; 
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-bold text-gray-700">
          {discName || 'Disco'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div
          className="radial-progress bg-gray-200 mb-4"
          style={{
            '--value': percentageUsed,
            '--size': '12rem',
            '--thickness': '1rem',
            color: getColor(),
          } as React.CSSProperties}
          aria-valuenow={Number(percentageUsed.toFixed(0))}
          role="progressbar"
        >
          {percentageUsed.toFixed(0)}%
        </div>
        <span className="text-lg font-semibold text-center text-gray-600">
          {`${spaceUsed.toFixed(2)} GB / ${spaceTotal} GB`}
        </span>
      </CardContent>
    </Card>
  );
}