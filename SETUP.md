# Data Drift Website Setup Guide

This document provides instructions for setting up and running the Data Drift mixing and mastering portfolio website.

## Setup Instructions

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Quick Start

1. Run the start script:

```bash
./start.sh
```

This will:
- Install dependencies if needed
- Create necessary directories
- Start the development server

2. Open [http://localhost:3000](http://localhost:3000) in your browser

### Manual Setup

If the start script doesn't work for you, follow these steps:

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

## Project Structure

- `src/app/` - Next.js app pages and routes
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and data handling
- `files/` - Audio files referenced in content_meta.yaml
- `public/` - Static assets like images
- `content_meta.yaml` - Content data for tracks

## Working with Audio Files

The website can handle multiple audio formats:
- MP3
- WAV
- FLAC
- OGG

The audio player will first try to use an MP3 version, then fall back to the original format.

## Adding New Tracks

1. Add the audio file to the `files/` directory
2. Add the track metadata to `content_meta.yaml` with the following format:

```yaml
- title: "Track Title"
  artist: "Artist Name"
  description: "Description of the track"
  type: "mix" # Can be "mix", "my", or "friend"
  tags:
    - tag1
    - tag2
  genre:
    - genre1
    - genre2
  file: "filename-without-extension" # Must match the filename in files/ directory
```

## Building for Production

To create a production build:

```bash
npm run build
```

You can then serve the production build:

```bash
npm start
``` 