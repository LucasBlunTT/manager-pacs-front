'use client';
import Button from '@/components/Button';
import Container from '@/components/Container';
import InputDate from '@/components/InputDate';
import React, { useState } from 'react';
import axios from 'axios';

export default function ResetarGravacaoByDate() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [affectedRows, setAffectedRows] = useState(0);

  async function handleReset() {
    try {
      const response = await axios.post(
        'http://localhost:3333/api/reset-exam-record',
        {
          startDate,
          endDate,
        },
      );
      setResponseMessage(response.data.message);
      setAffectedRows(response.data.affectedRows);
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Error resetting record:', error);
    }
  }

  return (
    <section className="h-screen w-screen">
      <Container className="h-screen w-screen items-center justify-center flex-col gap-2">
        <InputDate
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <Button description="Resetar Gravação" onClick={handleReset} />
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
