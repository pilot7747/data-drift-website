import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { Track } from '@/lib/content';

// Fallback tracks if file loading fails
const FALLBACK_TRACKS: Track[] = [
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
  }
];

// Server-side only function to load from YAML file
async function loadTracksFromFile(): Promise<Track[]> {
  try {
    const filePath = path.join(process.cwd(), 'content_meta.yaml');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return yaml.parse(fileContents) as Track[];
  } catch (error) {
    console.error('Error loading tracks from file:', error);
    return FALLBACK_TRACKS;
  }
}

export async function GET() {
  try {
    const tracks = await loadTracksFromFile();
    return NextResponse.json(tracks);
  } catch (error) {
    console.error('Error in tracks API:', error);
    return NextResponse.json(
      { error: 'Failed to load tracks data' },
      { status: 500 }
    );
  }
} 