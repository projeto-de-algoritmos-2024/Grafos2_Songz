export const mockData = {
  nodes: [
    { id: "Song 1", genre: "Pop", artist: "Artist A" },
    { id: "Song 2", genre: "Pop", artist: "Artist B" },
    { id: "Song 3", genre: "Rock", artist: "Artist C" },
    { id: "Song 4", genre: "Rock", artist: "Artist D" },
    { id: "Song 5", genre: "Jazz", artist: "Artist E" },
    { id: "Song 6", genre: "Jazz", artist: "Artist F" },
    { id: "Song 7", genre: "Classical", artist: "Artist G" },
    { id: "Song 8", genre: "Classical", artist: "Artist H" },
  ],
  links: [
    { source: "Song 1", target: "Song 2" }, // Conexão entre músicas Pop
    { source: "Song 2", target: "Song 3" }, // Transição entre Pop e Rock
    { source: "Song 3", target: "Song 4" }, // Conexão entre músicas Rock
    { source: "Song 4", target: "Song 5" }, // Transição entre Rock e Jazz
    { source: "Song 5", target: "Song 6" }, // Conexão entre músicas Jazz
    { source: "Song 6", target: "Song 7" }, // Transição entre Jazz e Classical
    { source: "Song 7", target: "Song 8" }, // Conexão entre músicas Classical
    { source: "Song 8", target: "Song 1" }, // Cíclico, conexão de volta ao Pop
  ],
};
