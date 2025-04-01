'use client'

import React, { useState, useEffect } from 'react'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

interface CustomGaugeProps {
  spaceTotal: number
  spaceFree: number
  discName?: string
}

export default function CustomGauge({ spaceTotal, spaceFree, discName }: CustomGaugeProps) {
  const [gaugeSize, setGaugeSize] = useState({ width: 300, height: 300, fontSize: 20 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setGaugeSize({ width: 150, height: 150, fontSize: 12 });
      } else if (width < 640) {
        setGaugeSize({ width: 200, height: 200, fontSize: 14 });
      } else if (width <= 1024) {
        setGaugeSize({ width: 200, height: 200, fontSize: 12 });
      } else if (width <= 1536) {
        setGaugeSize({ width: 250, height: 250, fontSize: 15 });
      } else {
        setGaugeSize({ width: 350, height: 350, fontSize: 20 });
      }
    };

    console.log('Window size:', window.innerWidth);

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const spaceUsed = spaceTotal - spaceFree;
  const percentageUsed = (spaceUsed / spaceTotal) * 100;

  return (
    <div className="w-full max-w-[430px] max-sm:max-w-[350px] max-md:max-w-[300px] max-lg:max-w-[400px] max-xl:max-w-[430px] flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-4">
      <p
        className="text-center font-bold"
        style={{ fontSize: gaugeSize.fontSize }}
      >
        {discName}
      </p>
      <Gauge
        width={gaugeSize.width}
        height={gaugeSize.height}
        value={percentageUsed}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: gaugeSize.fontSize,
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