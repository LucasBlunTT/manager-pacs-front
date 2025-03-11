'use client';
import Container from '@/components/Container';
import React, { useEffect, useState } from 'react';
import { fetchVolumetriaData, VolumetriaData } from './api';
import VolumetriaChart from '@/components/VolumetriaChart';
import Loading from '@/components/Loading';
import InputDate from '@/components/InputDate';

export default function RelatorioVolumetria() {
  const [dataVolumetria, setDataVolumetria] = useState<VolumetriaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
        {loading ? <Loading /> : <VolumetriaChart data={dataVolumetria} />}
      </Container>
    </section>
  );
}
