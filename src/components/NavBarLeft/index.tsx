'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logoPixeon2 from '@/assets/logo/logo-pixeon-2.png';

export default function NavBar() {
  const [openCollapse, setOpenCollapse] = useState<string | null>(null);

  function toggleCollapse(nomeTask: string) {
    setOpenCollapse(nomeTask);
  }

  return (
    <nav className="h-full w-full max-w-90 px-7 py-12 shadow-xl">
      <Link href="/">
        <Image
          src={logoPixeon2}
          alt="Logo Pixeon"
          width={150}
          height={150}
          className="mb-5"
        />
      </Link>
      <h1 className="text-xl font-bold text-white">DASHBOARD TASKS</h1>

      <ul className="mt-4 space-y-2 text-white">
        <li>
          <div
            tabIndex={0}
            className={`collapse collapse-arrow border border-base-300 ${
              openCollapse === 'volumetria' ? 'collapse-open' : ''
            }`}
            onClick={() => toggleCollapse('volumetria')}
          >
            <div className="collapse-title font-semibold text-white">
              Relatórios de Volumetria
            </div>
            <div className="collapse-content text-sm">
              <Link
                href="/relatorio-volumetria"
                className="text-white hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Acessar Relatórios de Volumetria
              </Link>
            </div>
          </div>
        </li>

        <li>
          <div
            tabIndex={0}
            className={`collapse collapse-arrow border border-base-300 ${
              openCollapse === 'producao' ? 'collapse-open' : ''
            }`}
            onClick={() => toggleCollapse('producao')}
          >
            <div className="collapse-title font-semibold text-white">
              Relatórios de Produção
            </div>
            <div className="flex flex-col collapse-content text-sm">
              <Link
                href="/rel-prod-equipamentos"
                className="text-white hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Equipamentos
              </Link>
            </div>
          </div>
        </li>

        <li>
          <div
            tabIndex={0}
            className={`collapse collapse-arrow border border-base-300 ${
              openCollapse === 'ferramentas' ? 'collapse-open' : ''
            }`}
            onClick={() => toggleCollapse('ferramentas')}
          >
            <div className="collapse-title font-semibold text-white">
              Ferramentas
            </div>
            <div className="flex flex-col collapse-content text-sm">
              <Link
                href="/resetar-status-gravacao"
                className="text-white hover:underline"
                onClick={(e) => e.stopPropagation()} // Evita que o clique feche o collapse
              >
                Resetar Status Gravacao[ACC]
              </Link>
              <Link
                href="/resetar-status-gravacao-data"
                className="text-white hover:underline"
                onClick={(e) => e.stopPropagation()} // Evita que o clique feche o collapse
              >
                Resetar Status Gravacao[DATA]
              </Link>
            </div>
          </div>
        </li>

        <li>
          <div
            tabIndex={0}
            className={`collapse collapse-arrow border border-base-300 ${
              openCollapse === 'agora' ? 'collapse-open' : ''
            }`}
            onClick={() => toggleCollapse('agora')}
          >
            <div className="collapse-title font-semibold text-white">
              Acontecendo Agora
            </div>
            <div className="flex flex-col collapse-content text-sm">
              <Link
                href="/consumo-diario"
                className="text-white hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Acessar Consumo Diário
              </Link>
              <Link
                href="/space-disk"
                className="text-white hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Acessar Espaço de Armazenamento
              </Link>
              <Link
                href="/monitoramento-worklist"
                className="text-white hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Monitoramento da Worklist
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
