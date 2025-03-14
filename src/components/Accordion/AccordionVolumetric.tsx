import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import React from 'react';
import Link from 'next/link';

interface AccordionVolumetricProps {
  description: string;
}

export default function AccordionVolumetric({
  description,
}: AccordionVolumetricProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">{description}</AccordionTrigger>
        <AccordionContent>
          <Link href="/relatorio-volumetria">Volumetria Por Data</Link>
        </AccordionContent>
        <AccordionContent>
          <Link href="/consumo-diario">Consumo Diario</Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
