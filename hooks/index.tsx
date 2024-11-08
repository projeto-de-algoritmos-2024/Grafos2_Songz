import { useState } from 'react';
import { Graph } from '../types/graph';

export const useBFS = (graph: Graph) => {
  const [path, setPath] = useState<string[]>([]);

  const bfs = (startNode: string, targetNode: string) => {
    const visited = new Set<string>();
    const queue: string[][] = [[startNode]];

    while (queue.length > 0) {
      const currentPath = queue.shift();
      if (!currentPath) continue;

      const node = currentPath[currentPath.length - 1];

      if (node === targetNode) {
        setPath(currentPath);
        return currentPath;
      }

      if (!visited.has(node)) {
        visited.add(node);

        const neighbors = graph.links
          .filter((link) => link.source === node || link.target === node)
          .map((link) => (link.source === node ? link.target : link.source));

        for (const neighbor of neighbors) {
          queue.push([...currentPath, neighbor]);
        }
      }
    }

    setPath([]);
    return [];
  };

  return { path, bfs };
};
