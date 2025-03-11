'use client';
import Container from '@/components/Container';
import React, { useEffect, useState } from 'react';
import { fetchVolumetriaData, VolumetriaData } from './api';
import VolumetriaChart from '@/components/VolumetriaChart';
import InputDate from '@/components/InputDate';

export default function RelatorioVolumetria() {
  const [dataVolumetria, setDataVolumetria] = useState<VolumetriaData[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate());
    return date.toISOString().split('T')[0];
  });

  useEffect(() => {
    async function fetchData() {
      if (!startDate || !endDate) return;
      try {
        setLoading(true);
        const data = await fetchVolumetriaData(startDate, endDate);
        setDataVolumetria(data);
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

  return (
    <section className="h-screen w-screen">
      <Container className="h-screen w-screen flex-col items-center justify-center">
        <InputDate
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
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
