import React from 'react';

interface InputDateProps {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

export default function InputDate({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: InputDateProps) {
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
