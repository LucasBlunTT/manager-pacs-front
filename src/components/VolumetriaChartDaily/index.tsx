'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface VolumetriaData {
  Modalidade: string;
  Estudos: string;
  'Tamanho (GB)': string;
}

interface DataProps {
  data: VolumetriaData[];
}

const dataMock = [
  { Modalidade: 'CT', Estudos: 250, 'Tamanho (GB)': 45 },
  { Modalidade: 'MR', Estudos: 300, 'Tamanho (GB)': 50 },
  { Modalidade: 'DX', Estudos: 220, 'Tamanho (GB)': 42 },
  { Modalidade: 'OT', Estudos: 260, 'Tamanho (GB)': 48 },
  { Modalidade: 'US', Estudos: 280, 'Tamanho (GB)': 55 },
  { Modalidade: 'NM', Estudos: 290, 'Tamanho (GB)': 60 },
  { Modalidade: 'XA', Estudos: 210, 'Tamanho (GB)': 41 },
  { Modalidade: 'RF', Estudos: 270, 'Tamanho (GB)': 52 },
  { Modalidade: 'MG', Estudos: 230, 'Tamanho (GB)': 46 },
  { Modalidade: 'CR', Estudos: 240, 'Tamanho (GB)': 49 },
  { Modalidade: 'PT', Estudos: 310, 'Tamanho (GB)': 55 },
  { Modalidade: 'SC', Estudos: 320, 'Tamanho (GB)': 60 },
  { Modalidade: 'RG', Estudos: 330, 'Tamanho (GB)': 65 },
  { Modalidade: 'IVUS', Estudos: 340, 'Tamanho (GB)': 70 },
  { Modalidade: 'PET-CT', Estudos: 350, 'Tamanho (GB)': 75 },
  { Modalidade: 'SPECT-CT', Estudos: 360, 'Tamanho (GB)': 80 },
  { Modalidade: 'PET-MR', Estudos: 370, 'Tamanho (GB)': 85 },
  { Modalidade: 'DXA', Estudos: 380, 'Tamanho (GB)': 90 },
  { Modalidade: 'OCT', Estudos: 390, 'Tamanho (GB)': 95 },
  { Modalidade: 'OPT', Estudos: 400, 'Tamanho (GB)': 100 },
  { Modalidade: 'BMD', Estudos: 410, 'Tamanho (GB)': 105 },
  { Modalidade: 'XC', Estudos: 420, 'Tamanho (GB)': 110 },
  { Modalidade: 'HD', Estudos: 430, 'Tamanho (GB)': 115 },
  { Modalidade: 'EPS', Estudos: 440, 'Tamanho (GB)': 120 },
];

export default function VolumetriaChartDaily({ data }: DataProps) {
  return (
    <Card className="p-10 border-none shadow-lg">
      <CardHeader className="flex items-center">
        <CardTitle>CONSUMO DIÁRIO</CardTitle>
        <CardDescription>Estudos armazenados hoje</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <BarChart
          width={900} 
          height={600}
          data={dataMock}
          layout="vertical"
          margin={{ top: 20, right: 90, left: 20, bottom: 20 }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="Tamanho (GB)"
            type="category"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} GB`}
            interval={0}
          />
          <XAxis type="number" />
          <Tooltip />
          <Bar
            dataKey="Tamanho (GB)"
            layout="vertical"
            fill="#00BCF2"
            radius={4}
          >
            <LabelList
              dataKey="Modalidade"
              position="insideLeft"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
            <LabelList
              dataKey="Estudos"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
              formatter={(estudos: number) => `${estudos} estudos`}
            />
          </Bar>
        </BarChart>
      </CardContent>
    </Card>
  );
}
