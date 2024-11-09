"use client";

import React, { createContext, useContext, useState } from "react";
import { Graph, Link, Node } from "../types/graph";

interface GraphContextType {
  relatedNodes: string[];
  matchingNodes: Node[];
  path: { nodes: Node[]; links: Link[] };
  findRelatedNodes: (searchTerm: string) => string[];
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
    // Reset estado para cada nova busca
    setRelatedNodes([]);
    setPath({ nodes: [], links: [] });

    const visited = new Set<string>();
    const foundNodes: Node[] = [];
    const foundLinks: Link[] = [];
    const neighbors: string[] = [];

    // Filtra os nós que contêm o termo de busca (parcial)
    const matchingNodes = graph.nodes.filter((node) =>
      node.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Adiciona cada nó correspondente à fila de busca
    matchingNodes.forEach((node) => {
      // Adiciona o nó inicial ao caminho, se ainda não estiver incluído
      if (!visited.has(node.id)) {
        visited.add(node.id);
        foundNodes.push(node);
      }

      setMatchingNodes(matchingNodes);

      // Encontra apenas as conexões diretas dos nós encontrados
      const directLinks = graph.links.filter(
        (link) =>
          (link.source === node.id || link.target === node.id) &&
          (matchingNodes.some((n) => n.id === link.source) ||
            matchingNodes.some((n) => n.id === link.target))
      );

      directLinks.forEach((link) => {
        const targetNode = link.source === node.id ? link.target : link.source;

        // Adiciona ao caminho se o nó alvo não foi visitado e faz parte das recomendações
        if (!visited.has(targetNode)) {
          visited.add(targetNode);
          neighbors.push(targetNode);

          const targetNodeData = graph.nodes.find((n) => n.id === targetNode);
          if (targetNodeData) {
            foundNodes.push(targetNodeData);
          }

          // Adiciona o link ao caminho
          foundLinks.push(link);
        }
      });
    });

    // Atualiza o estado com os nós relacionados e o caminho
    setRelatedNodes(neighbors);
    setPath({ nodes: foundNodes, links: foundLinks });
    return neighbors;
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
