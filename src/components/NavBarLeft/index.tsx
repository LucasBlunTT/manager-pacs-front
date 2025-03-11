import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logoPixeon2 from '@/assets/logo/logo-pixeon-2.png';

export default function NavBar() {
  return (
    <nav className="h-full w-full max-w-90 bg-gradient-to-br from-indigo-800 via-blue-500 to-teal-400 px-7 py-12 rounded-r-3xl">
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
