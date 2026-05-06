import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  content: ReactNode;
}

export function CustomCollapsible({ title, content }: Props) {
  return (
    <Collapsible className="data-[state=open]:bg-muted">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="group w-full">
          {title}
          <ChevronDownIcon className="mr-auto group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
        {content}
      </CollapsibleContent>
    </Collapsible>
  );
}
