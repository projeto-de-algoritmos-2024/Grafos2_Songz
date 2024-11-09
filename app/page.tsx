// app/page.tsx
"use client";

import GraphComponent from "@/components/graph-component";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGraph } from "@/hooks";
import { useRef } from "react";

export default function Home() {
  const { relatedNodes, findRelatedNodes, setRelatedNodes } = useGraph();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setRelatedNodes([]);
    if (searchInputRef.current) {
      findRelatedNodes(searchInputRef.current.value);
    }
  };

  return (
    <main className="min-h-svh w-[100vw] overflow-x-hidden">
      <div className="flex container min-h-20 items-center justify-between">
        <h1 className="text-4xl font-bold">SONGZ</h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            className="w-96"
            ref={searchInputRef}
            placeholder="Digite o nome da música"
          />
          <Button variant="default" type="submit">
            Buscar
          </Button>
        </form>
        <ModeToggle />
      </div>
      <div className="text-center">
        {relatedNodes.length > 0 ? (
          <ul>
            {relatedNodes.map((node) => (
              <li key={node}>{node}</li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma música relacionada encontrada.</p>
        )}
      </div>
      {relatedNodes.length > 0 && (
        <div className="mt-10">
          <GraphComponent />
        </div>
      )}
    </main>
  );
}
