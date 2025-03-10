'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { VolumetriaData } from '@/app/relatorio-volumetria/api';

interface VolumetriaChartProps {
  data: VolumetriaData[];
}

export default function VolumetriaChart({ data }: VolumetriaChartProps) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="Modalidade" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Estudos" fill="#8884d8" />
          <Bar dataKey="Tamanho (GB)" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
