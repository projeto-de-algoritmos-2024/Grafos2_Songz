"use client";

import React, { createContext, useContext, useState } from "react";
import { Graph, Link, Node } from "../types/graph";

interface GraphContextType {
  relatedNodes: string[];
  matchingNodes: Node[];
  path: { nodes: Node[]; links: Link[] };
  findRelatedNodes: (searchTerm: string) => { [layer: number]: string[] };
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<{
  graph: Graph;
  children: React.ReactNode;
}> = ({ graph, children }) => {
  const [relatedNodes, setRelatedNodes] = useState<string[]>([]);
  const [matchingNodes, setMatchingNodes] = useState<Node[]>([]);
  const [path, setPath] = useState<{ nodes: Node[]; links: Link[] }>({
    nodes: [],
    links: [],
  });

  const findRelatedNodes = (searchTerm: string) => {
    setRelatedNodes([]);
    setPath({ nodes: [], links: [] });

    const visited = new Set<string>();
    const queue: [Node, number][] = []; // Adiciona camada como segundo item do array
    const foundNodes: Node[] = [];
    const foundLinks: Link[] = [];
    const neighborsByLayer: { [layer: number]: string[] } = {}; // Armazena nós por camada

    const initialNodes = graph.nodes.filter((node) =>
      node.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setMatchingNodes(initialNodes);

    initialNodes.forEach((node) => {
      if (!visited.has(node.id)) {
        visited.add(node.id);
        queue.push([node, 0]); // Define camada inicial como 0
        foundNodes.push(node);
      }
    });

    while (queue.length > 0) {
      const [currentNode, layer] = queue.shift()!;

      if (!neighborsByLayer[layer]) {
        neighborsByLayer[layer] = [];
      }
      neighborsByLayer[layer].push(currentNode.id);

      const directLinks = graph.links.filter(
        (link) =>
          link.source === currentNode.id || link.target === currentNode.id
      );

      directLinks.forEach((link) => {
        const targetNodeId =
          link.source === currentNode.id ? link.target : link.source;

        if (!visited.has(targetNodeId)) {
          visited.add(targetNodeId);

          const targetNodeData = graph.nodes.find((n) => n.id === targetNodeId);
          if (targetNodeData) {
            foundNodes.push(targetNodeData);
            queue.push([targetNodeData, layer + 1]);
          }

          foundLinks.push(link);
        }
      });
    }

    console.log("neighborsByLayer:", neighborsByLayer); // Adicione este log para verificar
    setRelatedNodes(Object.values(neighborsByLayer).flat());
    setPath({ nodes: foundNodes, links: foundLinks });
    return neighborsByLayer; // Retorna nós organizados por camada
  };

  return (
    <GraphContext.Provider
      value={{ relatedNodes, path, findRelatedNodes, matchingNodes }}
    >
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }
  return context;
};
