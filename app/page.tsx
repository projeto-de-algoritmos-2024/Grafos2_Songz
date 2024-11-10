// app/page.tsx
"use client";

import GraphComponent from "@/components/graph-component";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGraph } from "@/hooks";
import { useRef } from "react";

export default function Home() {
  const { relatedNodes, findRelatedNodes, matchingNodes } = useGraph();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchInputRef.current && searchInputRef.current.value.trim() !== "") {
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
      {relatedNodes.length === 0 || matchingNodes.length === 0 ? (
        <div className="text-center">Nenhuma música econtrada</div>
      ) : (
        <div className="flex w-full container mt-10">
          <div className="flex flex-col w-1/3 gap-10 ">
            <h2 className="text-3xl font-bold">Resultado da pesquisa</h2>
            <ul>
              {matchingNodes.map((node) => (
                <li key={node.id}>{node.id}</li>
              ))}
            </ul>
            <h2 className="text-3xl font-bold">Recomendações</h2>
            <ul>
              {relatedNodes.map((node) => (
                <li key={node}>{node}</li>
              ))}
            </ul>
          </div>
          <div className="w-2/3">
            <GraphComponent />
          </div>
        </div>
      )}
    </main>
  );
}
