export type Node = {
  id: string;
  group?: number;
  genre?: string;
  artist?: string;
};

export type Link = {
  source: string;
  target: string;
};

export type Graph = {
  nodes: Node[];
  links: Link[];
};
