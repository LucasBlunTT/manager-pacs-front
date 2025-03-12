'use client';
import Button from '@/components/Button/Button';
import Container from '@/components/Container';
import InputText from '@/components/Input';
import React, { useState } from 'react';
import axios from 'axios';

export default function ResetarGravacaoByAcc() {
  const [inputValue, setInputValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [affectedRows, setAffectedRows] = useState(0);

  async function handleReset() {
    try {
      const response = await axios.post(
        'http://localhost:3333/api/reset-exam-record',
        {
          accessionNumber: inputValue,
        },
      );
      setResponseMessage(response.data.message);
      setAffectedRows(response.data.affectedRows);
      setInputValue('');
    } catch (error) {
      console.error('Error resetting record:', error);
    }
  }

  return (
    <section className="h-screen w-screen">
      <Container className="h-screen w-screen items-center justify-center flex-col gap-2">
        <InputText
          value={inputValue}
          placeholder="Número de Acesso"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button description="Resetar Gravação" onClick={handleReset} />
        {responseMessage && (
          <div className="text-center">
            <p>{responseMessage}</p>
            <p>Affected Rows: {affectedRows}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
