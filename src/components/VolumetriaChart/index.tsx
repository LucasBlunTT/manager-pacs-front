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

export interface VolumetriaData {
  Modalidade: string;
  Estudos: string;
  'Tamanho (GB)': string;
}

export interface DataProps {
  data: VolumetriaData[];
}

export default function VolumetriaChart({ data }: DataProps) {
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
          <Bar dataKey="Estudos" fill="#0078D4" />
          <Bar dataKey="Tamanho (GB)" fill="#00BCF2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
