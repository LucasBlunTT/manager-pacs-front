'use client'

import React from 'react'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

interface CustomGaugeProps {
  spaceTotal: number
  spaceFree: number
  discName?: string
}

export default function CustomGauge({ spaceTotal, spaceFree, discName }: CustomGaugeProps) {
  const spaceUsed = spaceTotal - spaceFree;
  const percentageUsed = (spaceUsed / spaceTotal) * 100;

  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4">
      <p className='text-center text-lg font-bold'>{discName}</p>
      <Gauge
      width={300}
      height={300}
      value={percentageUsed}
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
        fontSize: 20,
        fontWeight: 'bold',
        transform: 'translate(0px, 0px)',
        },
        [`& .${gaugeClasses.valueArc}`]: {
        fill: `${percentageUsed > 80 ? '#FF0000' : percentageUsed > 50 ? '#FFA500' : '#008000'}`,
        },
        [`& .${gaugeClasses.referenceArc}`]: {
        fill: '#D3D3D3',
        },
      }}
      text={() => `${spaceUsed} GB / ${spaceTotal} GB`}
      />
    </div>
  )
}
