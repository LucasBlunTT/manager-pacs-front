'use client';
import Container from '@/components/Container';
import React, { useEffect, useState } from 'react';
import VolumetriaChart from '@/components/VolumetriaChart';
import InputDate from '@/components/InputDate';
import { Button } from '@/components/ui/button'; // Importando o Button do ShadCN
import { api } from '@/lib/api';

export interface VolumetriaData {
  Modalidade: string;
  Estudos: string;
  'Tamanho (GB)': string;
}

export default function RelatorioVolumetria() {
  const [dataVolumetria, setDataVolumetria] = useState<VolumetriaData[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate());
    return formatDate(date);
  });

  useEffect(() => {
    async function fetchData() {
      if (!startDate || !endDate) return;
      try {
        setLoading(true);
        const response = await api.post('/api/volumetric-report', {
          startDate: startDate,
          endDate: endDate,
        });
        setDataVolumetria(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Erro ao buscar dados de volumetria:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [startDate, endDate]);

  function handleDateRangeChange(days: number) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  }

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  return (
    <section className="h-screen w-screen bg-[#F8FAFB]">
      <Container className="h-screen w-screen flex-col items-center justify-center">
        <InputDate
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <div className="flex space-x-4 my-4">
          <Button
            type="submit"
            className="mt-4 bg-[#604CCD] text-white font-semibold py-3 rounded-lg hover:bg-[#604CCD]/80 transition-all"
            onClick={() => handleDateRangeChange(7)}
            variant="default"
          >
            Últimos 7 dias
          </Button>
          <Button
            type="submit"
            className="mt-4  bg-[#604CCD] text-white font-semibold py-3 rounded-lg hover:bg-[#604CCD]/80 transition-all"
            onClick={() => handleDateRangeChange(15)}
            variant="default"
          >
            Últimos 15 dias
          </Button>
          <Button
            type="submit"
            className="mt-4  bg-[#604CCD] text-white font-semibold py-3 rounded-lg hover:bg-[#604CCD]/80 transition-all"
            onClick={() => handleDateRangeChange(30)}
            variant="default"
          >
            Últimos 30 dias
          </Button>
          <Button
            type="submit"
            className="mt-4 bg-[#604CCD] text-white font-semibold py-3 rounded-lg hover:bg-[#604CCD]/80 transition-all"
            onClick={() => handleDateRangeChange(365)}
            variant="default"
          >
            Último 1 ano
          </Button>
        </div>
        {dataVolumetria.length === 0 && !loading && (
          <p className="text-center text-gray-500">
            Nenhum dado de volumetria encontrado
          </p>
        )}
        {dataVolumetria.length > 0 && <VolumetriaChart data={dataVolumetria} />}
      </Container>
    </section>
  );
}
