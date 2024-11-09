"use client";

import { GraphProvider } from '@/hooks';
import { mockData } from '@/lib/mocks/songs';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

const GraphComponent = () => {
  const { path, bfs } = GraphProvider(mockData);
  const [startNode, setStartNode] = useState('');
  const [targetNode, setTargetNode] = useState('');

  const handleSearch = () => {
    bfs(startNode, targetNode);
  };

  return (
    <div>
      <div>
        <label>
          Início:
          <input type="text" value={startNode} onChange={(e) => setStartNode(e.target.value)} />
        </label>
        <label>
          Destino:
          <input type="text" value={targetNode} onChange={(e) => setTargetNode(e.target.value)} />
        </label>
        <button onClick={handleSearch}>Buscar Caminho</button>
      </div>

      <div>
        {path.length > 0 ? (
          <p>Caminho encontrado: {path.join(' → ')}</p>
        ) : (
          <p>Nenhum caminho encontrado</p>
        )}
      </div>

      <ForceGraph2D
        graphData={mockData}
        nodeLabel={(node) => `${node.id} (${node.genre})`}
        nodeColor={(node) => {
            switch (node.genre) {
            case 'Pop': return 'pink';
            case 'Rock': return 'red';
            case 'Jazz': return 'blue';
            case 'Classical': return 'green';
            default: return 'gray';
            }
        }}
        linkColor={() => 'gray'}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        />
    </div>
  );
};

export default GraphComponent;
