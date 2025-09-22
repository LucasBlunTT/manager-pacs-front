'use client';
import { Button } from '@/components/ui/button';
import Container from '@/components/Container';
import InputDate from '@/components/InputDate';
import React, { useState } from 'react';
import { api } from '@/lib/api';

export default function ResetarGravacaoByDate() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [affectedRows, setAffectedRows] = useState(0);

  async function handleReset() {
    try {
      const response = await api.post('/api/reset-exam-record', {
        startDate,
        endDate,
      });
      setResponseMessage(response.data.message);
      setAffectedRows(response.data.affectedRows);
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Error resetting record:', error);
    }
  }

  return (
    <section className="h-screen w-screen bg-[#F8FAFB]">
      <Container className="h-screen w-screen items-center justify-center flex-col gap-2">
        <InputDate
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <Button
          type="button"
          className="mt-4 bg-[#604CCD] text-white font-semibold py-3 rounded-lg hover:bg-[#604CCD]/80 transition-all"
          onClick={handleReset}
        >
          Resetar Gravação
        </Button>
        {responseMessage && (
          <div className="text-center">
            <p>{responseMessage}</p>
            <p>Linhas Afetadas: {affectedRows}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
