'use client';

import { LabelList, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Interface dos dados que virão
interface VolumetriaData {
  Modalidade: string;
  Estudos: string;
  'Tamanho (GB)': string;
}

interface DataProps {
  data: VolumetriaData[];
}

// Função para gerar cores únicas
const generateUniqueColors = (count: number): string[] => {
  const colors: string[] = [];
  const saturation = 70;
  const lightness = 50;
  const step = 137.508; // Gera cores espaçadas uniformemente

  for (let i = 0; i < count; i++) {
    const hue = (i * step) % 360;
    const adjustedLightness = lightness + (i % 2 === 0 ? -10 : 10); // Alterna a luminosidade para gerar mais variações
    colors.push(
      `hsl(${hue}, ${saturation}%, ${Math.max(
        30,
        Math.min(70, adjustedLightness),
      )}%)`,
    );
  }
  return colors;
};

const volumetriaData: VolumetriaData[] = [
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

// Gerar cores únicas para as modalidades
const colors = generateUniqueColors(volumetriaData.length);

// Adaptar os dados para o formato do gráfico
const chartData = volumetriaData.map((item, index) => ({
  modalidade: item.Modalidade,
  estudos: parseInt(item.Estudos, 10),
  fill: colors[index],
}));

// Configuração do gráfico
const chartConfig = volumetriaData.reduce((config, item, index) => {
  config[item.Modalidade] = {
    label: item.Modalidade,
    color: colors[index],
  };
  return config;
}, {} as ChartConfig);

export function Chart({ data }: DataProps) {
  return (
    <Card className="flex flex-col w-full max-w-[530px] shadow-md">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[1200px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="estudos"
                  hideLabel
                  className="bg-gray-800 text-white shadow-md"
                />
              }
            />
            <Pie data={chartData} dataKey="estudos" nameKey="modalidade">
              <LabelList
                dataKey="modalidade"
                position={'middle'}
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-2">
        <div className="flex gap-2">
          <span className="text-lg font-semibold text-center text-gray-600">
            Total Estudos:
          </span>
          <span className="text-lg font-semibold text-center text-gray-600">
            {chartData.reduce((total, item) => total + item.estudos, 0)}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="text-lg font-semibold text-center text-gray-600">
            Total (GB):
          </span>
          <span className="text-lg font-semibold text-center text-gray-600">
            {volumetriaData.reduce(
              (total, item) => total + parseInt(item['Tamanho (GB)'], 10),
              0,
            )}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
