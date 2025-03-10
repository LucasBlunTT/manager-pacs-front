import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <nav className="h-full w-full max-w-90 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-800 px-7 py-12 rounded-lg">
      <h1 className="text-xl font-bold text-white">DASHBOARD TASKS</h1>

      <ul className="mt-4 space-y-2 text-white">
        <li className="font-bold hover:text-gray-300 cursor-pointer">
          <Link href="/relatorio-volumetria">Relatório de Volumetria</Link>
        </li>

        <li className="font-bold hover:text-gray-300 cursor-pointer">
          <Link href="/resetar-status-gravacao">
            Resetar Status de Gravação[ACC]
          </Link>
        </li>
        <li className="font-bold hover:text-gray-300 cursor-pointer">
          <Link href="/resetar-status-gravacao-data">
            Resetar Status de Gravação[DATA]
          </Link>
        </li>
      </ul>
    </nav>
  );
}
