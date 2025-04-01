'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomGauge from '@/components/SpaceDiscChart';
import Loading from '@/components/Loading';

interface DiskSpace {
  total: number;
  free: number;
}

export default function SpaceDisk() {
  const [diskSpace, setDiskSpace] = useState<DiskSpace | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [discName, setDiscName] = useState<string>('');

  useEffect(() => {
    async function fetchDiskSpace() {
      try {
        setLoading(true);
        const result = await axios.get('http://localhost:3333/api/disco-ativo');
        setDiskSpace(result.data);
        setDiscName(result.data.discName);

        if (result.data.rawResult && result.data.rawResult.length > 0) {
          setDiscName(result.data.rawResult[0].no_localstore);
        }
      } catch (error) {
        console.error('Erro ao buscar espaço em disco:', error);
      } finally {
        setLoading(false);
      }
    }

    // Chamada inicial
    fetchDiskSpace();

    // Configurando o intervalo para 30 minutos
    const interval = setInterval(fetchDiskSpace, 1800000);

    // Limpando o intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen grid items-center justify-center gap-4 p-10 grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4">
      {loading ? (
        <Loading />
      ) : (
        diskSpace && (
          <CustomGauge spaceTotal={diskSpace.total} spaceFree={diskSpace.free} discName={discName} />
        )
        
      )}
    </div>
  );
}