'use client';
import React, { useEffect, useState } from 'react';

export default function ProdutividadeEquipamentos() {
  const [equipamentos, setEquipamentos] = useState<string[]>([]);

  async function fetchEquipamentos() {
    try {
      const response = await fetch('http://localhost:3333/api/equipamentos');
      if (!response.ok) {
        throw new Error('Erro ao buscar equipamentos');
      }
      const data = await response.json();
      const stationNames = data.map(
        (item: { 'Station Name': string }) => item['Station Name'],
      );
      setEquipamentos(stationNames);
    } catch (error) {
      console.error('Erro ao carregar equipamentos:', error);
    }
  }

  useEffect(() => {
    fetchEquipamentos();
  }, []);

  // =========================
  // MOCKS (exemplo visual)
  // =========================
  const MOCK_PERIODO = 'Semana'; // TODO: vir do filtro
  const MOCK_INTERVALO = '2025-03-17 a 2025-03-23'; // TODO: vir do filtro
  const MOCK_TOTAL = 128; // TODO: vir do backend
  const MOCK_MEDIA_DIA = '18,3'; // TODO: calcular/vir do backend
  const MOCK_ROWS = [
    { key: '2025-03-17', count: 21 },
    { key: '2025-03-18', count: 17 },
    { key: '2025-03-19', count: 16 },
    { key: '2025-03-20', count: 19 },
    { key: '2025-03-21', count: 18 },
    { key: '2025-03-22', count: 20 },
    { key: '2025-03-23', count: 17 },
  ]; // TODO: vir do backend conforme agrupamento
  // =========================

  return (
    <section className="min-h-screen w-full bg-[#F8FAFB] text-slate-800 p-4 md:p-6 overflow-auto">
      <div className="mx-auto w-full max-w-7xl space-y-5">
        {/* Título */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Relatório de Produtividade por Equipamento
          </h1>
        </div>

        {/* Filtros */}
        <div className="w-full flex flex-col card bg-white border border-[#E7E9F2] shadow-xl">
          <div className="flex flex-col card-body gap-5">
            {/* Linha 1: Equipamento + Período */}
            <div className="flex flex-col items-center justify-center gap-5">
              <div className="flex flex-col form-control items-center">
                <label className="label">
                  <span className="label-text font-medium">
                    Equipamento (stationnam)
                  </span>
                </label>
                <select
                  className="select select-bordered bg-white disabled:bg-white border-slate-300 focus:outline-none focus:border-[#604CCD]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione um equipamento
                  </option>
                  {equipamentos.map((equipamento) => (
                    <option key={equipamento} value={equipamento}>
                      {equipamento}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col items-center form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Período</span>
                </label>
                <div className="join">
                  {/* UI-only (sem onClick) */}
                  <button className="btn join-item btn-outline border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10">
                    Dia
                  </button>
                  <button className="btn join-item bg-[#604CCD] text-white hover:bg-[#604CCD]/80">
                    Semana
                  </button>
                  <button className="btn join-item btn-outline border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10">
                    Mês
                  </button>
                  <button className="btn join-item btn-outline border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10">
                    Ano
                  </button>
                </div>
              </div>
            </div>

            {/* Linha 2: Datas e horários */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Intervalo (Semana/Mês/Ano) */}
              <div className="flex flex-col form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Data inicial</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered bg-white disabled:bg-white border-slate-300 focus:outline-none focus:border-[#604CCD]"
                  defaultValue="2025-03-17"
                />
              </div>

              <div className="flex flex-col form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Data final</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered bg-white disabled:bg-white border-slate-300 focus:outline-none focus:border-[#604CCD]"
                  defaultValue="2025-03-23"
                />
              </div>

              {/* Presets (UI) */}
              <div className="md:col-span-5">
                <div className="join">
                  <button className="btn join-item btn-sm border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10">
                    7d
                  </button>
                  <button className="btn join-item btn-sm border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10">
                    15d
                  </button>
                  <button className="btn join-item btn-sm border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10">
                    30d
                  </button>
                </div>
                <span className="ml-3 align-middle text-sm text-slate-500">
                  * Apenas visual — conecte aos filtros quando implementar
                </span>
              </div>

              {/* Studytime */}
              <div className="form-control md:col-span-1">
                <label className="label">
                  <span className="label-text font-medium">
                    Início (studytime)
                  </span>
                </label>
                <input
                  type="time"
                  defaultValue="00:00"
                  className="input input-bordered bg-white disabled:bg-white border-slate-300 focus:outline-none focus:border-[#604CCD]"
                />
              </div>
              <div className="form-control md:col-span-1">
                <label className="label">
                  <span className="label-text font-medium">
                    Fim (studytime)
                  </span>
                </label>
                <input
                  type="time"
                  defaultValue="23:59"
                  className="input input-bordered bg-white disabled:bg-white border-slate-300 focus:outline-none focus:border-[#604CCD]"
                />
              </div>
            </div>

            {/* Ações */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button className="btn border-none bg-[#604CCD] text-white hover:bg-[#604CCD]/80">
                Consultar
              </button>
              <button className="btn btn-outline border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10">
                Limpar
              </button>
            </div>
          </div>
        </div>

        {/* Resumo (mock) */}
        <div className="stats shadow bg-white border border-[#E7E9F2]">
          <div className="stat">
            <div className="stat-title text-slate-800">Total de estudos</div>
            <div className="stat-value text-[#604CCD] ">{MOCK_TOTAL}</div>
            <div className="stat-desc text-slate-800">
              Período: {MOCK_PERIODO} ({MOCK_INTERVALO})
            </div>
          </div>
          <div className="stat">
            <div className="stat-title text-slate-800">Média por dia</div>
            <div className="stat-value">{MOCK_MEDIA_DIA}</div>
            <div className="stat-desc text-slate-800">
              * mock — calcule com os dados reais
            </div>
          </div>
          <div className="stat">
            <div className="stat-title text-slate-800">Equipamento</div>
            <div className="stat-value text-slate-900">{equipamentos[0]}</div>
            <div className="stat-desc text-slate-800">
              * mock — usar seleção do filtro
            </div>
          </div>
          <div className="stat">
            <div className="stat-title text-slate-800">
              Tempo médio por exame
            </div>
            <div className="stat-value text-slate-900">{'3,5 hours'}</div>
          </div>
          <div className="stat">
            <div className="stat-title text-slate-800">
              Ociosidade Equipamento
            </div>
            <div className="stat-value text-slate-900">{'2,5 minutes'}</div>
          </div>
        </div>

        {/* Tabela (mock) */}
        <div className="w-full rounded-xl border border-[#E7E9F2] shadow-xl bg-white">
          <div className="rounded-xl overflow-x-auto">
            <table className="table">
              <thead className="bg-[#604CCD]/10 text-slate-900">
                <tr className="text-sm">
                  <th className="px-4 py-3">Período</th>
                  <th className="px-4 py-3 text-right">Estudos (COUNT)</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ROWS.map((r) => (
                  <tr key={r.key} className="hover hover:bg-[#604CCD]/5">
                    <td className="px-4 py-3 font-medium">{r.key}</td>
                    <td className="px-4 py-3 text-right">{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nota mock */}
          <div className="px-4 py-3 border-t border-[#E7E9F2] bg-[#604CCD]/5 text-sm text-slate-600">
            Dados <span className="font-semibold">mockados</span> para layout.
            <span className="ml-1">
              Substitua pelos valores reais vinda da API quando implementar a
              lógica.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
