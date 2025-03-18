'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VolumetriaChartDaily from '@/components/VolumetriaChartDaily';
import Loading from '@/components/Loading';
import RadialChart from '@/components/RadialChart';

export interface VolumetriaData {
  Modalidade: string;
  Estudos: string;
  'Tamanho (GB)': string;
}

export default function ConsumoDiario() {
  const [dataVolumetria, setDataVolumetria] = useState<VolumetriaData[]>([]);

  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  useEffect(() => {
    async function fetchData() {
      const startDate = getCurrentDate();
      const endDate = getCurrentDate();

      if (!startDate || !endDate) return;
      try {
        const response = await axios.post(
          'http://localhost:3333/api/volumetric-report',
          {
            startDate: startDate,
            endDate: endDate,
          },
        );
        setDataVolumetria(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados de volumetria de hoje:', error);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 60000); // Consulta a cada 1 minuto

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <div className="flex h-full w-full items-center justify-center gap-10">
      
          <>
            <VolumetriaChartDaily data={dataVolumetria} />
            <RadialChart data={dataVolumetria} />
          </>
      
      </div>
    </section>
  );
}
