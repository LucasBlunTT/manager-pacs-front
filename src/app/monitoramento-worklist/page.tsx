'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { formatDate, formatDateTime } from '@/utils/utils';

type Row = {
  na_accessionnumber: string; // Accession Number
  co_patientid: string; // Patient ID
  na_patientname: string; // Patient Name
  na_description: string | null; // Description (nullable)
  no_modalityris: string; // Modality RIS
  na_datetimeintegrated: string | null; // Date/Time Integrated (nullable)
  na_studydate: string; // Study Date (YYYYMMDD)
  fl_studyreceived: number; // Study Received Flag
};

export default function MonitoramentoWorklist() {
  const [worklistData, setWorklistData] = useState<Row[]>([]);

  async function fetchWorklistData() {
    try {
      const response = await axios.get<Row[]>(
        'http://localhost:3333/api/monitoramento-worklist',
      );
      setWorklistData(response.data);
    } catch (error) {
      console.error('Error fetching worklist data:', error);
    }
  }

  function renderStatus(
    dateTimeIntegrated: string | null,
    studyReceivedFlag: number,
  ) {
    if (!dateTimeIntegrated) {
      return (
        <div className="flex items-center gap-2">
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-warning animate-ping"></div>
            <div className="status status-warning"></div>
          </div>
        </div>
      );
    }
    if (dateTimeIntegrated && studyReceivedFlag) {
      return (
        <div className="flex items-center gap-2">
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-success animate-ping"></div>
            <div className="status status-success"></div>
          </div>
        </div>
      );
    }

    if (dateTimeIntegrated) {
      return (
        <div className="flex items-center gap-2">
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-info animate-ping"></div>
            <div className="status status-info"></div>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    fetchWorklistData();
  }, []);

  return (
    <section
      className={cn(
        'min-h-screen w-screen flex flex-col items-center justify-center bg-white text-background',
      )}
    >
      <div className="overflow-x-auto shadow-lg rounded-lg border border-border">
        <table className="table-auto w-full text-sm text-left font-bold text-gray-700">
          <thead className="bg-secondary text-secondary-foreground">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Accession Number</th>
              <th className="px-4 py-2">ID Paciente</th>
              <th className="px-4 py-2">Nome Paciente</th>
              <th className="px-4 py-2">Descricao</th>
              <th className="px-4 py-2">Modalidade</th>
              <th className="px-4 py-2">Data Estudo</th>
              <th className="px-4 py-2">Data Integracao</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {worklistData.map((row, index) => (
              <tr
                key={index}
                className={cn(
                  index % 2 === 0 ? 'bg-muted' : 'bg-white',
                  'hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{row.na_accessionnumber}</td>
                <td className="px-4 py-2">{row.co_patientid}</td>
                <td className="px-4 py-2 whitespace-nowrap max-w-xs overflow-auto">
                  {row.na_patientname}
                </td>
                <td className="px-4 py-2 whitespace-nowrap max-w-xs overflow-auto">
                  {row.na_description || ''}
                </td>
                <td className="px-4 py-2">{row.no_modalityris}</td>
                <td className="px-4 py-2">{formatDate(row.na_studydate)}</td>
                <td className="px-4 py-2">
                  {row.na_datetimeintegrated
                    ? formatDateTime(row.na_datetimeintegrated)
                    : ''}
                </td>
                <td className="flex itens-center justify-center px-4 py-2">
                  {renderStatus(
                    row.na_datetimeintegrated,
                    row.fl_studyreceived,
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
