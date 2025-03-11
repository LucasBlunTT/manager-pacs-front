// filepath: c:\Users\skluc\Documents\Projetos\manager-pacs-front\src\app\layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import NavBarLeft from '@/components/NavBarLeft';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'DASHBOARD TASKS',
  description: 'Painel para gerenciamento de tarefas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-arp="">
      <body className={`${poppins.variable} antialiased flex`}>
        <NavBarLeft />
        {children}
      </body>
    </html>
  );
}
