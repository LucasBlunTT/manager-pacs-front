'use client';
import Container from '@/components/Container';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface VolumetriaData {
  Modalidade: string;
  Estudos: string;
  'Tamanho (GB)': string;
}

export default function Page() {
  const [dataVolumetria, setDataVolumetria] = useState<VolumetriaData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3333/api/volumetric-report',
      );
      setDataVolumetria(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados de volumetria:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
