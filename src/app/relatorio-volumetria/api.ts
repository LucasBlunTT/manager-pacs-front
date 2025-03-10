import axios from 'axios';

export interface VolumetriaData {
  Modalidade: string;
  Estudos: string;
  'Tamanho (GB)': string;
}

export const fetchVolumetriaData = async (): Promise<VolumetriaData[]> => {
  const response = await axios.post(
    'http://localhost:3333/api/volumetric-report',
    {
      startDate: '20240101',
      endDate: '20250101',
    },
  );
  return response.data;
};
