import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import React from 'react';
import Link from 'next/link';

interface AccordionTaskProps {
  description: string;
}

export default function AccordionTasks({ description }: AccordionTaskProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">{description}</AccordionTrigger>
        <AccordionContent>
          <Link href="/resetar-status-gravacao">
            Resetar Status de Gravação[ACC]
          </Link>
        </AccordionContent>
        <AccordionContent>
          <Link href="/resetar-status-gravacao-data">
            Resetar Status de Gravação[DATA]
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
