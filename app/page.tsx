// app/page.tsx
"use client";

import GraphComponent from "@/components/graph-component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGraph } from "@/hooks";
import { User } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { relatedNodes, findRelatedNodes } = useGraph(); // Use useGraph
  const [selectedNode, setSelectedNode] = useState<string>("");

  const handleSearch = () => {
    findRelatedNodes(selectedNode);
  };

  return (
    <main className="min-h-svh w-[100vw] overflow-x-hidden">
      <div className="flex container min-h-20 items-center justify-between">
        <h1 className="text-4xl font-bold">SONGZ</h1>
        <div className="flex gap-2">
          <Input
            className="w-96"
            value={selectedNode}
            onChange={(e) => setSelectedNode(e.target.value)}
            placeholder="Digite o nome da música"
          />
          <Button variant="default" onClick={handleSearch}>
            Buscar
          </Button>
        </div>
        <Button>
          <User size={24} />
        </Button>
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
      <div className="mt-10">
        <GraphComponent />
      </div>
    </main>
  );
}
