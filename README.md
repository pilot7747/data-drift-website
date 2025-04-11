# Data Drift - Mixing & Mastering Portfolio

A modern, beautiful portfolio website for mixing, mastering, and music production services.

## Features

- Modern UI design with smooth animations
- Interactive audio player for music samples
- Showcase of mixing, mastering, and production work
- Filter tracks by genre and project type
- Responsive layout for all devices
- Contact form for client inquiries
- Dark-themed music-centric design

## Tech Stack

- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Howler.js** - Audio playback
- **YAML** - Content management
- **React Icons** - SVG icons

## Project Structure

```
data-drift-website/
├── src/
│   ├── app/              # Next.js app routes
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   └── styles/           # Global styles
├── public/               # Static assets
├── files/                # Audio files
├── content_meta.yaml     # Content data
├── next.config.js        # Next.js configuration
└── package.json          # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/data-drift-website.git
cd data-drift-website
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Audio Files

The website is designed to work with various audio formats:
- MP3
- WAV
- FLAC
- OGG

Place your audio files in the `/files` directory with the same base name as specified in `content_meta.yaml`.

## Deployment

This site can be deployed on Vercel, Netlify, or any other Next.js-compatible hosting platform.

```bash
npm run build
# or
yarn build
```

## License

MIT

## Contact

For questions or inquiries, please reach out through the contact form on the website. 