import React from 'react';
import Container from '@/components/Container';

export function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 w-full">
      <Container>
        <h1 className="text-2xl">MANAGEMENT TASKS</h1>
      </Container>
    </header>
  );
}

export default Header;
