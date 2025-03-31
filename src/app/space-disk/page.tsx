'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomGauge from '@/components/SpaceDiscChart';

interface DiskSpace {
  total: number;
  free: number;
}


export default function SpaceDisk() {
  const [diskSpace, setDiskSpace] = useState<DiskSpace | null>(null);

  useEffect(() => {
    async function fetchDiskSpace() {
      try {
        const result = await axios.get('http://localhost:3333/api/disco-ativo');
        setDiskSpace(result.data); 
      } catch (error) {
        console.error('Erro ao buscar espaço em disco:', error);
      }
    }

    fetchDiskSpace();
  }, []);

  return (
    <div className="w-screen h-screen grid items-center justify-center gap-4 p-10 grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-4">
      {diskSpace && (
        <>
          <CustomGauge spaceTotal={diskSpace.total} spaceFree={diskSpace.free} />
        </>
      )}
    </div>
  );
}