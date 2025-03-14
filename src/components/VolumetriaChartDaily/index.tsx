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
  { Modalidade: 'CT', Estudos: 200, 'Tamanho (GB)': 3.7 },
  { Modalidade: 'MR', Estudos: 9, 'Tamanho (GB)': 1.5 },
  { Modalidade: 'DX', Estudos: 4, 'Tamanho (GB)': 2.1 },
  { Modalidade: 'OT', Estudos: 1, 'Tamanho (GB)': 4.1 },
  { Modalidade: 'US', Estudos: 3, 'Tamanho (GB)': 5.1 },
  { Modalidade: 'NM', Estudos: 5, 'Tamanho (GB)': 6.2 },
  { Modalidade: 'XA', Estudos: 7, 'Tamanho (GB)': 2.3 },
  { Modalidade: 'RF', Estudos: 6, 'Tamanho (GB)': 6.8 },
  { Modalidade: 'MG', Estudos: 8, 'Tamanho (GB)': 3.5 },
  { Modalidade: 'CR', Estudos: 10, 'Tamanho (GB)': 2.0 },
  { Modalidade: 'PT', Estudos: 250, 'Tamanho (GB)': 35 },
  { Modalidade: 'SC', Estudos: 300, 'Tamanho (GB)': 40 },
  { Modalidade: 'RG', Estudos: 220, 'Tamanho (GB)': 32 },
  { Modalidade: 'IVUS', Estudos: 210, 'Tamanho (GB)': 31 },
  { Modalidade: 'PET-CT', Estudos: 260, 'Tamanho (GB)': 38 },
  { Modalidade: 'SPECT-CT', Estudos: 270, 'Tamanho (GB)': 39 },
  { Modalidade: 'PET-MR', Estudos: 280, 'Tamanho (GB)': 41 },
  { Modalidade: 'DXA', Estudos: 290, 'Tamanho (GB)': 42 },
  { Modalidade: 'OCT', Estudos: 230, 'Tamanho (GB)': 33 },
  { Modalidade: 'OPT', Estudos: 240, 'Tamanho (GB)': 34 },
  { Modalidade: 'BMD', Estudos: 250, 'Tamanho (GB)': 35 },
  { Modalidade: 'XC', Estudos: 260, 'Tamanho (GB)': 36 },
  { Modalidade: 'HD', Estudos: 270, 'Tamanho (GB)': 37 },
  { Modalidade: 'EPS', Estudos: 280, 'Tamanho (GB)': 38 },
];

export default function VolumetriaChartDaily({ data }: DataProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>CONSUMO DIÁRIO</CardTitle>
        <CardDescription>Estudos armazenados hoje</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          width={600}
          height={600}
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="Tamanho (GB)"
            type="category"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} GB`}
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
