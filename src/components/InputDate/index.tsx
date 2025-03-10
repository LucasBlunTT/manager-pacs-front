import React, { useState } from 'react';

export default function InputDate() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="flex items-center justify-center mb-4 gap-10">
      <div className="flex flex-col items-center justify-center">
        <label className="mb-2 text-foreground">Data Inicial</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-input rounded-md p-2"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <label className="mb-2 text-foreground">Data Final</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-input rounded-md p-2"
        />
      </div>
    </div>
  );
}
