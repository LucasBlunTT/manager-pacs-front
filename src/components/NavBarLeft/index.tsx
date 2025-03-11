import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logoPixeon2 from '@/assets/logo/logo-pixeon-2.png';
import AccordionVolumetric from '../Accordion/AccordionVolumetric';
import AccordionTasks from '../Accordion/AccordionTasks';

export default function NavBar() {
  return (
    <nav
      className="h-full w-full max-w-90 px-7 py-12 rounded-r-3xl"
      style={{
        background:
          'linear-gradient(150deg, rgb(96, 76, 205) 0%, rgb(79, 200, 235) 40%, rgb(34, 188, 159) 100%)',
      }}
    >
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
          <AccordionVolumetric description={'Relatórios de Volumetria'} />
        </li>

        <li className="font-bold hover:text-gray-300 cursor-pointer">
          <AccordionTasks description={'Ferramentas'} />
        </li>
      </ul>
    </nav>
  );
}
