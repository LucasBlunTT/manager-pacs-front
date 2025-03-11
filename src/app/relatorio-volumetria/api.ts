import axios from 'axios';

export interface VolumetriaData {
  Modalidade: string;
  Estudos: string;
  'Tamanho (GB)': string;
}
export async function fetchVolumetriaData(
  startDate: string,
  endDate: string,
): Promise<VolumetriaData[]> {
  const response = await axios.post(
    'http://localhost:3333/api/volumetric-report',
    {
      startDate: startDate,
      endDate: endDate,
    },
  );
  return response.data;
}
