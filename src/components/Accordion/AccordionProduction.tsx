import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import React from 'react';
import Link from 'next/link';

interface AccordionProductionProps {
  description: string;
}

export default function AccordionVolumetric({
  description,
}: AccordionProductionProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">{description}</AccordionTrigger>
        <AccordionContent>
          <Link href="/cadastro-colaborador">Cadastro Colaborador</Link>
        </AccordionContent>
        <AccordionContent>
          <Link href="/rlatorio-producao-colaborador">Relatório de Produção Colaborador</Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
