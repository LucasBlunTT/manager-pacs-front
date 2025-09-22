'use client';
import { api } from '@/lib/api';
import React, { useEffect, useMemo, useState } from 'react';

export default function ProdutividadeEquipamentos() {
  const [equipamentos, setEquipamentos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // filtros controlados
  const [equipamento, setEquipamento] = useState('');
  const [periodo, setPeriodo] = useState<'Dia' | 'Semana' | 'Mês' | 'Ano'>(
    'Semana',
  );
  const [dataInicial, setDataInicial] = useState('2025-03-17');
  const [dataFinal, setDataFinal] = useState('2025-03-23');
  const [horaInicio, setHoraInicio] = useState('00:00');
  const [horaFim, setHoraFim] = useState('23:59');

  async function fetchEquipamentos() {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/api/equipamentos');
      if (response.status < 200 || response.status >= 300)
        throw new Error('Erro ao buscar equipamentos');
      const data = response.data;
      const stationNames = data.map(
        (item: { 'Station Name': string }) => item['Station Name'],
      );
      setEquipamentos(stationNames);
      // auto selecionar o primeiro quando houver
      if (stationNames.length && !equipamento) setEquipamento(stationNames[0]);
    } catch (e: unknown) {
      console.error('Erro ao carregar equipamentos:', e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Falha ao carregar');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEquipamentos();
  }, []);

  // ========================= MOCKS (exemplo visual)
  const MOCK_ROWS = [
    { key: '2025-03-17', count: 21 },
    { key: '2025-03-18', count: 17 },
    { key: '2025-03-19', count: 16 },
    { key: '2025-03-20', count: 19 },
    { key: '2025-03-21', count: 18 },
    { key: '2025-03-22', count: 20 },
    { key: '2025-03-23', count: 17 },
  ];

  const total = useMemo(
    () => MOCK_ROWS.reduce((acc, r) => acc + r.count, 0),
    [],
  );
  const mediaDia = useMemo(
    () => (MOCK_ROWS.length ? (total / MOCK_ROWS.length).toFixed(1) : '0'),
    [total],
  );
  // =========================

  function onPreset(days: number) {
    // apenas visual — ajustar para calcular a partir de hoje ou do intervalo atual
    console.info(`Preset ${days}d clicado`);
  }

  function consultar() {
    // conectar ao backend usando os filtros
    console.table({
      equipamento,
      periodo,
      dataInicial,
      dataFinal,
      horaInicio,
      horaFim,
    });
  }

  function limpar() {
    setPeriodo('Semana');
    setDataInicial('2025-03-17');
    setDataFinal('2025-03-23');
    setHoraInicio('00:00');
    setHoraFim('23:59');
    if (equipamentos.length) setEquipamento(equipamentos[0]);
  }

  return (
    <section className="min-h-screen w-full bg-[#F8FAFB] text-slate-800 p-4 md:p-6">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <Header
          title="Relatório de Produtividade por Equipamento"
          subtitle="Analise a volumetria de estudos por período e estação"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4">
          {/* Painel de Filtros (sticky) */}
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="card bg-white border border-[#E7E9F2] shadow-xl sticky top-4">
              <div className="card-body gap-5">
                {/* Equipamento */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Equipamento (stationname)
                    </span>
                  </label>
                  {loading ? (
                    <div className="skeleton h-12 w-full" />
                  ) : error ? (
                    <div className="alert alert-error text-sm">{error}</div>
                  ) : (
                    <select
                      className="select select-bordered bg-white border-slate-300 focus:outline-none focus:border-[#604CCD]"
                      value={equipamento}
                      onChange={(e) => setEquipamento(e.target.value)}
                    >
                      {equipamentos.length === 0 && (
                        <option value="" disabled>
                          Nenhum equipamento
                        </option>
                      )}
                      {equipamentos.map((eq) => (
                        <option key={eq} value={eq}>
                          {eq}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Período */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Período</span>
                  </label>
                  <div className="join">
                    {(['Dia', 'Semana', 'Mês', 'Ano'] as const).map((p) => (
                      <button
                        key={p}
                        className={`btn join-item ${
                          periodo === p
                            ? 'bg-[#604CCD] text-white hover:bg-[#604CCD]/80'
                            : 'btn-outline border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10'
                        }`}
                        onClick={() => setPeriodo(p)}
                        type="button"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Datas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Data inicial
                      </span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered bg-white border-slate-300 focus:outline-none focus:border-[#604CCD]"
                      value={dataInicial}
                      onChange={(e) => setDataInicial(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Data final</span>
                    </label>
                    <input
                      type="date"
                      className="input input-bordered bg-white border-slate-300 focus:outline-none focus:border-[#604CCD]"
                      value={dataFinal}
                      onChange={(e) => setDataFinal(e.target.value)}
                    />
                  </div>
                </div>

                {/* Presets */}
                <div>
                  <div className="join">
                    {[7, 15, 30].map((d) => (
                      <button
                        key={d}
                        type="button"
                        className="btn join-item btn-sm border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10"
                        onClick={() => onPreset(d)}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                  <span className="ml-2 align-middle text-xs text-slate-500">
                    * Visual por enquanto — conecte aos filtros
                  </span>
                </div>

                {/* Horários */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Início (studytime)
                      </span>
                    </label>
                    <input
                      type="time"
                      className="input input-bordered bg-white border-slate-300 focus:outline-none focus:border-[#604CCD]"
                      value={horaInicio}
                      onChange={(e) => setHoraInicio(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Fim (studytime)
                      </span>
                    </label>
                    <input
                      type="time"
                      className="input input-bordered bg-white border-slate-300 focus:outline-none focus:border-[#604CCD]"
                      value={horaFim}
                      onChange={(e) => setHoraFim(e.target.value)}
                    />
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    className="btn border-none bg-[#604CCD] text-white hover:bg-[#604CCD]/80"
                    type="button"
                    onClick={consultar}
                  >
                    Consultar
                  </button>
                  <button
                    className="btn btn-outline border-slate-300 text-[#604CCD] hover:bg-[#604CCD]/10"
                    type="button"
                    onClick={limpar}
                  >
                    Limpar
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Conteúdo principal */}
          <main className="md:col-span-8 lg:col-span-9 space-y-6">
            {/* Resumo */}
            <div className="card bg-white border border-[#E7E9F2] shadow-xl">
              <div className="card-body">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="card-title text-slate-900">
                    Resumo do período
                  </h2>
                  <PeriodoChip
                    periodo={periodo}
                    intervalo={`${dataInicial} a ${dataFinal}`}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                  <Stat
                    label="Total de estudos"
                    value={String(total)}
                    highlight
                  />
                  <Stat label="Média por dia" value={String(mediaDia)} />
                  <Stat label="Equipamento" value={equipamento || '—'} />
                  <Stat label="Tempo médio por exame" value={'3,5 hours'} />
                  <Stat
                    label="Ociosidade do equipamento"
                    value={'2,5 minutes'}
                  />
                </div>
              </div>
            </div>

            {/* Tabela */}
            <div className="card bg-white border border-[#E7E9F2] shadow-xl">
              <div className="card-body p-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#E7E9F2]">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Estudos por {periodo.toLowerCase()}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Dados mockados para layout — conecte à API quando
                      disponível
                    </p>
                  </div>
                  <div className="join hidden md:inline-flex">
                    <button className="btn btn-sm join-item">
                      Exportar CSV
                    </button>
                    <button className="btn btn-sm join-item btn-outline">
                      Imprimir
                    </button>
                  </div>
                </div>

                {MOCK_ROWS.length === 0 ? (
                  <EmptyState message="Sem dados para o intervalo selecionado" />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead className="bg-[#604CCD]/10 text-slate-900">
                        <tr className="text-sm">
                          <th className="px-4 py-3">Período</th>
                          <th className="px-4 py-3 text-right">
                            Estudos (COUNT)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_ROWS.map((r) => (
                          <tr
                            key={r.key}
                            className="hover hover:bg-[#604CCD]/5"
                          >
                            <td className="px-4 py-3 font-medium">{r.key}</td>
                            <td className="px-4 py-3 text-right">{r.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

function PeriodoChip({
  periodo,
  intervalo,
}: {
  periodo: string;
  intervalo: string;
}) {
  return (
    <div className="badge badge-lg border-[#604CCD] text-[#604CCD] bg-[#604CCD]/10">
      {periodo} • {intervalo}
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="stats bg-white border border-[#E7E9F2]">
      <div className="stat">
        <div className="stat-title text-slate-700">{label}</div>
        <div
          className={`stat-value ${
            highlight ? 'text-[#604CCD]' : 'text-slate-900'
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="p-8 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-[#604CCD]/10 flex items-center justify-center mb-3">
        📭
      </div>
      <p className="text-slate-600">{message}</p>
    </div>
  );
}
