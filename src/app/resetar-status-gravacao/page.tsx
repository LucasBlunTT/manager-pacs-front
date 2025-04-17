'use client';
import {Button} from '@/components/ui/button';
import Container from '@/components/Container';
import { Input } from "@/components/ui/input"; 
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
    <section className="h-screen w-screen bg-[#F8FAFB]">
      <Container className="h-screen w-screen items-center justify-center flex-col gap-2">
        <Input
          className='text-center w-1/2 placeholder:text-gray-300'
          value={inputValue}
          placeholder="Número de Acesso"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          type="button"
          className="mt-4 bg-[#604CCD] text-white font-semibold py-3 rounded-lg hover:bg-[#503BB3] transition-all"
          onClick={handleReset}
        >
          Resetar Gravação
        </Button>
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
