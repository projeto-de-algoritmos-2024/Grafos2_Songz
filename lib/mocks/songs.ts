export const mockData = {
  nodes: [
    { id: "Song 1", group: 1, genre: "Pop", artist: "Artist A" },
    { id: "Song 2", group: 1, genre: "Pop", artist: "Artist B" },
    { id: "Song 3", group: 2, genre: "Rock", artist: "Artist C" },
    { id: "Song 4", group: 2, genre: "Rock", artist: "Artist D" },
    { id: "Song 5", group: 3, genre: "Jazz", artist: "Artist E" },
    { id: "Song 6", group: 3, genre: "Jazz", artist: "Artist F" },
  ],
  links: [
    { source: "Song 1", target: "Song 2" },
    { source: "Song 2", target: "Song 3" },
    { source: "Song 3", target: "Song 4" },
    { source: "Song 4", target: "Song 5" },
    { source: "Song 5", target: "Song 6" },
  ],
};
