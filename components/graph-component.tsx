"use client";

import { GraphProvider } from '@/hooks';
import { mockData } from '@/lib/mocks/songs';
import { useState } from 'react';

const GraphComponent = () => {
  const { relatedNodes, findRelatedNodes } = GraphProvider(mockData);
  const [selectedNode, setSelectedNode] = useState<string>('');

  const handleSearch = () => {
    findRelatedNodes(selectedNode);
  };

  return (
    <div>
      <h1>Songs</h1>
      <input
        type="text"
        value={selectedNode}
        onChange={(e) => setSelectedNode(e.target.value)}
        placeholder="Digite o nome da música"
      />
      <br />

      <button onClick={handleSearch}>Buscar Relacionadas</button>

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
  );
};

export default GraphComponent;
