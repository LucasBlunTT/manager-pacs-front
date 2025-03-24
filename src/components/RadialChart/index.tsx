import React from 'react';
import ReactApexChart from 'react-apexcharts';

const dataMock = [
  { Modalidade: 'CT', Estudos: 250 },
  { Modalidade: 'MR', Estudos: 300 },
  { Modalidade: 'DX', Estudos: 220 },
  { Modalidade: 'OT', Estudos: 260 },
  { Modalidade: 'US', Estudos: 280 },
  { Modalidade: 'NM', Estudos: 290 },
  { Modalidade: 'XA', Estudos: 210 },
  { Modalidade: 'RF', Estudos: 270 },
  { Modalidade: 'MG', Estudos: 230 },
  { Modalidade: 'CR', Estudos: 240 },
  { Modalidade: 'PT', Estudos: 310 },
  { Modalidade: 'SC', Estudos: 320 },
  { Modalidade: 'RG', Estudos: 330 },
  { Modalidade: 'IVUS', Estudos: 340 },
  { Modalidade: 'PET-CT', Estudos: 350 },
  { Modalidade: 'SPECT-CT', Estudos: 360 },
  { Modalidade: 'PET-MR', Estudos: 370 },
  { Modalidade: 'DXA', Estudos: 380 },
  { Modalidade: 'OCT', Estudos: 390 },
  { Modalidade: 'OPT', Estudos: 400 },
  { Modalidade: 'BMD', Estudos: 410 },
  { Modalidade: 'XC', Estudos: 420 },
  { Modalidade: 'HD', Estudos: 430 },
  { Modalidade: 'EPS', Estudos: 440 },
];

interface VolumetriaData {
  Modalidade: string;
  Estudos: string;
  'Tamanho (GB)': string;
}

interface DataProps {
  data: VolumetriaData[];
}

export default function RadialChart({ data }: DataProps) {
  const totalEstudos = dataMock.reduce((sum, item) => sum + Number(item.Estudos), 0);
  const series = dataMock.map((item) => parseFloat(((Number(item.Estudos) / totalEstudos) * 100).toFixed(2)));
  const labels = dataMock.map((item) => item.Modalidade);

  const state = {
    series,
    options: {
      chart: {
        type: 'donut' as const,
      },
      responsive: [
        {
          breakpoint: 1921,
          options: {
            chart: {
              width: 730,
              height: 686,
            },
          },
        },
        {
          breakpoint: 1537, // Telas extra grandes (ex.: monitores widescreen)
          options: {
            chart: {
              width: 600,
              height: 600,
            },
          },
        },
        {
          breakpoint: 1400, // Telas muito grandes (ex.: desktops)
          options: {
            chart: {
              width: 1000,
              height: 700,
            },
          },
        },
        {
          breakpoint: 1200, // Telas grandes (ex.: laptops pequenos)
          options: {
            chart: {
              width: 800,
              height: 600,
            },
          },
        },
        {
          breakpoint: 992, // Telas médias (ex.: tablets em modo paisagem)
          options: {
            chart: {
              width: 600,
              height: 500,
            },
          },
        },
        {
          breakpoint: 768, // Telas pequenas (ex.: tablets em modo retrato)
          options: {
            chart: {
              width: 400,
              height: 500,
            },
          },
        },
        {
          breakpoint: 576, // Telas muito pequenas (ex.: smartphones)
          options: {
            chart: {
              width: 300,
              height: 400,
            },
          },
        },
      ],
      labels,
    },
  };
  

  return (
    <div className="w-full mx-auto relative shadow-lg">
      <ReactApexChart options={state.options} series={state.series} type="donut"  />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '40%',
            transform: 'translate(-50%, -50%)',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <span>Total Estudos</span>
          {totalEstudos}
        </div>
      </div>
  );
}
