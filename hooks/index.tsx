"use client";
import React, { createContext, useContext, useState } from "react";
import { Graph } from "../types/graph";

interface GraphContextType {
  relatedNodes: string[];
  findRelatedNodes: (startNode: string) => string[];
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<{
  graph: Graph;
  children: React.ReactNode;
}> = ({ graph, children }) => {
  const [relatedNodes, setRelatedNodes] = useState<string[]>([]);

  const findRelatedNodes = (startNode: string) => {
    const neighbors = graph.links
      .filter((link) => link.source === startNode || link.target === startNode)
      .map((link) => (link.source === startNode ? link.target : link.source));

    setRelatedNodes(neighbors);
    return neighbors;
  };

  return (
    <GraphContext.Provider value={{ relatedNodes, findRelatedNodes }}>
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
