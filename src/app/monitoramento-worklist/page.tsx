'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { formatDate, formatDateTime } from '@/utils/utils';

type Row = {
  na_accessionnumber: string;
  co_patientid: string;
  na_patientname: string;
  na_description: string | null;
  no_modalityris: string;
  na_datetimeintegrated: string | null;
  na_studydate: string;
  fl_studyreceived: number;
};

type StatusMeta = {
  label: string;
  tone: 'warning' | 'info' | 'success';
  dotClass: string;
  rowAccent: string;
  badgeClass: string; // agora só cor de texto (sem bg)
};

function getStatusMeta(
  dateTimeIntegrated: string | null,
  studyReceivedFlag: number,
): StatusMeta {
  if (!dateTimeIntegrated) {
    return {
      label: 'Aguardando integração',
      tone: 'warning',
      dotClass: 'bg-yellow-400',
      rowAccent: 'border-l-4 border-yellow-400/70',
      badgeClass: 'text-yellow-700',
    };
  }
  if (dateTimeIntegrated && studyReceivedFlag) {
    return {
      label: 'Exame realizado',
      tone: 'success',
      dotClass: 'bg-green-500',
      rowAccent: 'border-l-4 border-green-500/70',
      badgeClass: 'text-green-700',
    };
  }
  return {
    label: 'Exame não realizado',
    tone: 'info',
    dotClass: 'bg-sky-500',
    rowAccent: 'border-l-4 border-sky-500/70',
    badgeClass: 'text-sky-700',
  };
}

export default function MonitoramentoWorklist() {
  const [worklistData, setWorklistData] = useState<Row[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function fetchWorklistData() {
    try {
      setLoading(true);
      setErr(null);
      const response = await axios.get<Row[]>(
        'http://localhost:3333/api/monitoramento-worklist',
      );
      setWorklistData(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching worklist data:', error.message);
        setErr('Falha ao carregar dados. Tente novamente.');
      } else {
        console.error('Unexpected error:', error);
        setErr('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWorklistData();
  }, []);

  function getFilteredData() {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return worklistData;
    return worklistData.filter((row) => {
      return (
        row.na_accessionnumber.toLowerCase().includes(term) ||
        row.co_patientid.toLowerCase().includes(term) ||
        row.na_patientname.toLowerCase().includes(term)
      );
    });
  }

  const filteredData = getFilteredData();

  return (
    <section
      className={cn(
        'min-h-screen w-full flex flex-col items-center justify-start bg-[#F8FAFB] text-slate-800',
        'p-4 md:p-6 overflow-x-auto',
      )}
    >
      {/* título + ações */}
      <div className="w-full max-w-7xl mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          Monitoramento da Worklist
        </h1>

        <div className="flex items-center gap-2">
          <div className="join">
            <input
              type="text"
              placeholder="Buscar por Accession, ID ou Nome"
              className="input input-bordered join-item w-72 border-slate-300 focus:border-[#604CCD] focus:outline-none bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm ? (
              <button
                className="btn join-item border-none bg-[#604CCD] text-white hover:bg-[#604CCD]/80"
                onClick={() => setSearchTerm('')}
                aria-label="Limpar busca"
                title="Limpar busca"
              >
                ✕
              </button>
            ) : (
              <button
                className="btn join-item border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10"
                disabled
              >
                🔎
              </button>
            )}
          </div>
          <button
            className="btn border-none bg-[#604CCD] text-white hover:bg-[#604CCD]/80"
            onClick={fetchWorklistData}
          >
            Recarregar
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl rounded-xl border border-[#E7E9F2] shadow-xl bg-white">
        <div className="rounded-xl">
          {/* removido table-zebra */}
          <table className="table">
            <thead className="top-0 z-10 bg-[#604CCD]/10 text-slate-900 backdrop-blur">
              <tr className="text-sm">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Accession</th>
                <th className="px-4 py-3">ID Paciente</th>
                <th className="px-4 py-3">Nome Paciente</th>
                <th className="px-4 py-3">Descrição</th>
                <th className="px-4 py-3">Modalidade</th>
                <th className="px-4 py-3">Data Estudo</th>
                <th className="px-4 py-3">Data Integração</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <tr key={`skeleton-${i}`} className="hover">
                      <td className="px-4 py-3">
                        <div className="skeleton h-4 w-6 bg-slate-200" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="skeleton h-4 w-32 bg-slate-200" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="skeleton h-4 w-28 bg-slate-200" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="skeleton h-4 w-44 bg-slate-200" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="skeleton h-4 w-56 bg-slate-200" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="skeleton h-4 w-16 bg-slate-200" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="skeleton h-4 w-24 bg-slate-200" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="skeleton h-4 w-36 bg-slate-200" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="skeleton h-4 w-28 mx-auto bg-slate-200" />
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {!loading && err && (
                <tr>
                  <td colSpan={9} className="px-4 py-6">
                    <div className="alert bg-red-50 text-red-700 border border-red-200">
                      <span>{err}</span>
                    </div>
                  </td>
                </tr>
              )}

              {!loading && !err && filteredData.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="text-4xl">🧐</div>
                      <p className="text-sm text-slate-500">
                        Nenhum resultado para{' '}
                        <span className="font-semibold">“{searchTerm}”</span>.
                      </p>
                      <button
                        className="btn btn-sm border-none bg-[#604CCD] text-white hover:bg-[#604CCD]/80"
                        onClick={() => setSearchTerm('')}
                      >
                        Limpar busca
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {!loading &&
                !err &&
                filteredData.map((row, index) => {
                  const status = getStatusMeta(
                    row.na_datetimeintegrated,
                    row.fl_studyreceived,
                  );

                  return (
                    <tr
                      key={`${row.na_accessionnumber}-${index}`}
                      className={cn(
                        'transition-colors',
                        'hover:bg-[#604CCD]/5 hover:text-slate-900',
                        status.rowAccent,
                      )}
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 font-semibold">
                        {row.na_accessionnumber}
                      </td>
                      <td className="px-4 py-3">{row.co_patientid}</td>
                      <td className="px-4 py-3 whitespace-nowrap max-w-xs overflow-auto">
                        {row.na_patientname}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap max-w-3xs overflow-auto opacity-90">
                        {row.na_description || '—'}
                      </td>
                      <td className="px-4 py-3 max-w-3xs overflow-x-auto opacity-90">
                        {row.no_modalityris}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(row.na_studydate)}
                      </td>
                      <td className="px-4 py-3">
                        {row.na_datetimeintegrated ? (
                          formatDateTime(row.na_datetimeintegrated)
                        ) : (
                          <span className="opacity-60">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center">
                          <div className="tooltip z-10" data-tip={status.label}>
                            <div className="flex flex-col items-center text-center gap-2 text-xs">
                              {/* dot animado */}
                              <span className="relative inline-flex items-center justify-center">
                                <span
                                  className={cn(
                                    'absolute inline-flex h-2.5 w-2.5 rounded-full animate-ping opacity-60',
                                    status.dotClass,
                                  )}
                                />
                                <span
                                  className={cn(
                                    'relative inline-flex h-2.5 w-2.5 rounded-full',
                                    status.dotClass,
                                  )}
                                />
                              </span>
                              <span
                                className={cn('font-medium', status.badgeClass)}
                              >
                                {status.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
