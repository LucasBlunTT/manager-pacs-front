'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '@/lib/utils';

type Row = {
  co_patientid: string; // Patient ID
  na_accessionnumber: string; // Accession Number
  na_patientname: string; // Patient Name
  na_modalityris: string; // Modality RIS
  na_studydate: string; // Study Date (YYYYMMDD)
  na_datetimeintegrated: string | null; // Date/Time Integrated (nullable)
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

  function renderStatus(dateTimeIntegrated: string | null) {
    if (!dateTimeIntegrated) {
      return (
        <div className="flex items-center gap-2">
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-warning animate-ping"></div>
            <div className="status status-warning"></div>
          </div>
          <span className="sr-only">Unread messages</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="inline-grid *:[grid-area:1/1]">
          <div className="status status-success animate-ping"></div>
          <div className="status status-success"></div>
        </div>
        <span className="sr-only">Integrated</span>
      </div>
    );
  }

  useEffect(() => {
    fetchWorklistData();
  }, []);

  return (
    <section
      className={cn(
        'h-screen w-screen flex flex-col items-center justify-center bg-white text-background',
      )}
    >
      <div className="overflow-x-auto shadow-lg rounded-lg border border-border">
        <table className="table-auto w-full text-sm text-left font-bold text-gray-700">
          <thead className="bg-secondary text-secondary-foreground">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Accession Number</th>
              <th className="px-4 py-2">Patient ID</th>
              <th className="px-4 py-2">Patient Name</th>
              <th className="px-4 py-2">Study Date</th>
              <th className="px-4 py-2">Modality</th>
              <th className="px-4 py-2">DateTime Integrated</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {worklistData.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{row.na_accessionnumber}</td>
                <td className="px-4 py-2">{row.co_patientid}</td>
                <td className="px-4 py-2">{row.na_patientname}</td>
                <td className="px-4 py-2">{row.na_studydate}</td>
                <td className="px-4 py-2">{row.na_modalityris}</td>
                <td className="px-4 py-2">
                  {row.na_datetimeintegrated || 'N/A'}
                </td>
                <td className="px-4 py-2">
                  {renderStatus(row.na_datetimeintegrated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
