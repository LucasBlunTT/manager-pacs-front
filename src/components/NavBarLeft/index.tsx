import React from 'react';

export default function NavBar() {
  return (
    <nav className="h-full w-full max-w-2xs bg-[#191919] px-7 py-12">
      <div>
        <h1 className="text-xl font-bold text-white">DASHBOARD TASKS</h1>
      </div>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}
