'use client';
import Container from '@/components/Container';
import React, { useEffect, useState } from 'react';
import { fetchVolumetriaData, VolumetriaData } from './api';

export default function Page() {
  const [dataVolumetria, setDataVolumetria] = useState<VolumetriaData[]>([]);

  async function fetchData() {
    try {
      const data = await fetchVolumetriaData();
      setDataVolumetria(data);
    } catch (error) {
      console.error('Erro ao buscar dados de volumetria:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Dados de volumetria no useEffect:', dataVolumetria);
  }, [dataVolumetria]);

  return (
    <section>
      <Container>
        <h1 className="text-3xl font-bold text-center mt-12 text-blue-400">
          Relatório de Volumetria
        </h1>
      </Container>
    </section>
  );
}
