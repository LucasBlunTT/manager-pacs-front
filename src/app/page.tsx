import logoPixeon from '@/assets/logo/logo-pixeon.png.webp';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen w-screen">
        <Image src={logoPixeon} alt="Logo Pixeon" className="animate-pulse" />
      </section>
    </>
  );
}
