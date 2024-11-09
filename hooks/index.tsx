import { useState } from 'react';
import { Graph } from '../types/graph';

export const GraphProvider = (graph: Graph) => {
  const [relatedNodes, setRelatedNodes] = useState<string[]>([]);

  const findRelatedNodes = (startNode: string) => {
    const neighbors = graph.links
      .filter((link) => link.source === startNode || link.target === startNode)
      .map((link) => (link.source === startNode ? link.target : link.source));

    setRelatedNodes(neighbors);
    return neighbors;
  };

  return { relatedNodes, findRelatedNodes };
};
