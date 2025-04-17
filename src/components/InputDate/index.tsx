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
        <label className="mb-2 text-gray-700">Data Inicial</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 bg-gray-200 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <label className="mb-2 text-gray-700">Data Final</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 bg-gray-200 text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}