import React from 'react';

export default function NavBar() {
  return (
    <nav className="h-full w-full max-w-85 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-800 px-7 py-12 rounded-lg">
      <div>
        <h1 className="text-xl font-bold text-white">DASHBOARD TASKS</h1>
      </div>
      <ul className="mt-4 space-y-2 text-white">
        <li className="font-bold hover:text-gray-300 cursor-pointer">
          Relatório de Volumetria
        </li>
        <li className="font-bold hover:text-gray-300 cursor-pointer">
          Resetar Status de Gravação
        </li>
        <li className="font-bold hover:text-gray-300 cursor-pointer">
          Resetar Status de Gravação Por Data
        </li>
      </ul>
    </nav>
  );
}
