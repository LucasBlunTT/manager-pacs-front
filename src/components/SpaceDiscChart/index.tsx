import React from 'react'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

interface CustomGaugeProps {
  spaceTotal: number
  spaceFree: number
}

export default function CustomGauge({ spaceTotal, spaceFree }: CustomGaugeProps) {
  const spaceUsed = spaceTotal - spaceFree;
  const percentageUsed = (spaceUsed / spaceTotal) * 100;

  return (
    <Gauge
      value={percentageUsed}  
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 20,
          fontWeight: 'bold',  
          transform: 'translate(0px, 0px)',
        },
      }}
      text={
        () => `${spaceUsed} GB / ${spaceTotal} GB`
      }
    />
  )
}
