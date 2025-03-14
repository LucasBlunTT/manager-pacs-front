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

// const dataa = [
//   { Modalidade: 'CT', Estudos: 200, 'Tamanho (GB)': 3.7 },
//   { Modalidade: 'MR', Estudos: 9, 'Tamanho (GB)': 1.5 },
//   { Modalidade: 'DX', Estudos: 4, 'Tamanho (GB)': 2.1 },
//   { Modalidade: 'OT', Estudos: 1, 'Tamanho (GB)': 4.1 },
//   { Modalidade: 'US', Estudos: 3, 'Tamanho (GB)': 5.1 },
//   { Modalidade: 'NM', Estudos: 5, 'Tamanho (GB)': 6.2 },
//   { Modalidade: 'XA', Estudos: 7, 'Tamanho (GB)': 2.3 },
//   { Modalidade: 'RF', Estudos: 6, 'Tamanho (GB)': 6.8 },
//   { Modalidade: 'MG', Estudos: 8, 'Tamanho (GB)': 3.5 },
//   { Modalidade: 'CR', Estudos: 10, 'Tamanho (GB)': 2.0 },
// ];

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
