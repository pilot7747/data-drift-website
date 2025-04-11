// This file contains client-side safe code for handling content

export interface Track {
  title: string;
  artist: string;
  description: string;
  type: 'mix' | 'my' | 'friend';
  tags: string[];
  genre: string[];
  file: string;
}

// Static tracks data - used as a fallback or for static pages
const TRACKS_DATA: Track[] = [
  {
    title: "Wish List (Slowed + Reverbed)",
    artist: "Data Drift",
    description: "Chill phonk song",
    type: "my",
    tags: ["my", "mix", "master"],
    genre: ["phonk"],
    file: "Wish List (Slowed + Reverbed)"
  },
  {
    title: "Dark Dreams",
    artist: "Data Drift",
    description: "Old school phonk song",
    type: "my",
    tags: ["my", "mix", "master"],
    genre: ["phonk"],
    file: "Dark Dreams"
  },
  {
    title: "Comet",
    artist: "Ricky Legend",
    description: "Mix and master of a pop song",
    type: "mix",
    tags: ["mix", "master"],
    genre: ["pop", "indie", "electronic"],
    file: "Comet"
  }
];

// Function to load tracks data - client-side only implementation
export async function loadTracks(): Promise<Track[]> {
  try {
    const response = await fetch('/api/tracks');
    if (!response.ok) {
      throw new Error('Failed to fetch tracks data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return TRACKS_DATA; // Fallback to static data
  }
}

// Client-side compatible functions that work with pre-loaded data
export function getTracksByType(tracks: Track[], type: 'mix' | 'my' | 'friend'): Track[] {
  return tracks.filter(track => track.type === type);
}

export function getTracksByGenre(tracks: Track[], genre: string): Track[] {
  return tracks.filter(track => track.genre.includes(genre));
}

export function getAllGenres(tracks: Track[]): string[] {
  const genresSet = new Set<string>();
  
  tracks.forEach(track => {
    track.genre.forEach(genre => {
      genresSet.add(genre);
    });
  });
  
  return Array.from(genresSet);
} 