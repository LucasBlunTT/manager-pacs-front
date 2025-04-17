'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"; 
import Container from "@/components/Container";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CadastroColaborador() {
  const [nome, setNome] = useState<string>("");
  const [horarioInicio, setHorarioInicio] = useState<string>("");
  const [horarioFim, setHorarioFim] = useState<string>("");
  const [stationName, setStationName] = useState<string>("");
  const [stations, setStations] = useState<string[]>([]);

  async function getStationsNames() {
    try {
      const response = await axios.get("http://localhost:3333/api/stations-names");
      setStations(response.data);
    } catch (error) {
      console.error("Error fetching station names:", error);
    }
  }

  useEffect(() => {
    getStationsNames();
  }, []);

  return (
    <section className="h-screen w-screen flex items-center justify-center bg-[#F8FAFB]">
      <Container className="h-full w-full items-center justify-center">
        <Card className="w-full max-w-md bg-white shadow-lg rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-700">
              Cadastro de Colaborador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6">
              <div className="flex flex-col">
                <Label htmlFor="nome" className="text-gray-700 font-medium mb-1">
                  Nome
                </Label>
                <Input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Digite o nome"   
                  className="placeholder:text-gray-300"                       
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="horario_inicio"
                  className="text-gray-700 font-medium mb-1"
                >
                  Horário de Início
                </Label>
                <Input
                  type="time"
                  id="horario_inicio"
                  name="horario_inicio"
                  value={horarioInicio}
                  onChange={(e) => setHorarioInicio(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="horario_fim"
                  className="text-gray-700 font-medium mb-1"
                >
                  Horário de Fim
                </Label>
                <Input
                  type="time"
                  id="horario_fim"
                  name="horario_fim"
                  value={horarioFim}
                  onChange={(e) => setHorarioFim(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="station_name"
                  className="text-gray-700 font-medium mb-1"
                >
                  Equipamento
                </Label>
                <Select
                  onValueChange={(value) => setStationName(value)}
                  value={stationName}
                >
                  <SelectTrigger className="mt-2 p-3 border border-gray-300 rounded-lg text-gray-700">
                    <SelectValue placeholder="Selecione um equipamento"/>
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((station, index) => (
                      <SelectItem key={index} value={station}>
                        {station}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="mt-4 bg-[#604CCD] text-white font-semibold py-3 rounded-lg hover:bg-[#604CCD]/80 transition-all"                                
              >
                Salvar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}