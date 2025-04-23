'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VolumetriaChartDaily from '@/components/VolumetriaChartDaily';
import Loading from '@/components/Loading';
import { Chart } from '@/components/Chart';

export interface VolumetriaData {
  Modalidade: string;
  Estudos: string;
  'Tamanho (GB)': string;
}

export default function ConsumoDiario() {
  const [dataVolumetria, setDataVolumetria] = useState<VolumetriaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60); // Tempo restante para o próximo refresh (em segundos)

  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
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
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Erro ao buscar dados de volumetria de hoje:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Intervalo para atualizar os dados a cada 60 segundos
    const interval = setInterval(() => {
      fetchData();
      setTimeLeft(60); // Reinicia o cronômetro após o refresh
    }, 60000);

    // Intervalo para atualizar o cronômetro a cada segundo
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval); // Limpa o intervalo de refresh
      clearInterval(timer); // Limpa o intervalo do cronômetro
    };
  }, []);

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center bg-[#F8FAFB]">
      <div className="text-center text-gray-500">
        <p>Próxima atualização em: {timeLeft} segundos</p>
      </div>
      <div className="flex h-full w-full items-center justify-center gap-10">
        {loading ? (
          <Loading />
        ) : (
          <>
            <VolumetriaChartDaily data={dataVolumetria} />
            <Chart data={dataVolumetria}/>
          </>
        )}
      </div>
    </section>
  );
}
