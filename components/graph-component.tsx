"use client";

import { useGraph } from "@/hooks";
import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

const GraphComponent = () => {
  const { path } = useGraph();

  const graphData = {
    nodes: path.nodes.map((node) => ({ ...node })),
    links: path.links.map((link) => ({ ...link })),
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-2/3 flex justify-center items-center">
        <ForceGraph2D
          graphData={graphData}
          nodeLabel={(node) => `${node.id} (${node.genre})`}
          nodeAutoColorBy="genre"
          linkColor={() => "gray"}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          enableZoomInteraction={false}
          enableNodeDrag={false}
        />
      </div>
    </div>
  );
};

export default GraphComponent;
