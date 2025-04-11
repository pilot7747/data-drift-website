// Helper functions for working with public paths

// Check if we're in production mode
const isProd = process.env.NODE_ENV === 'production';

// You can replace this with a real CDN URL where you'll host your audio files
const CDN_BASE_URL = 'https://storage.googleapis.com/data-drift-audio';

/**
 * Get the file URL for a track with the specified format
 * 
 * @param filename The filename from the track data (without extension)
 * @param format The audio format (default: 'mp3')
 * @returns The URL to the audio file
 */
export function getAudioUrl(filename: string, format: string = 'mp3'): string {
  const fileExtension = format === 'original' ? '' : '.' + format;
  
  // In production, use the CDN URL
  if (isProd) {
    return `${CDN_BASE_URL}/${filename}${fileExtension}`;
  }
  
  // In development, use the local path
  return `/files/${filename}${fileExtension}`;
}

/**
 * Get the URL for an image asset
 * 
 * @param path The image path relative to public folder
 * @returns The URL to the image
 */
export function getImageUrl(path: string): string {
  return `/${path}`;
}

/**
 * Determine if a file has a specific extension
 * 
 * @param filename The filename to check
 * @param extension The extension to check for (without dot)
 * @returns True if the file has the specified extension
 */
export function hasExtension(filename: string, extension: string): boolean {
  return filename.toLowerCase().endsWith(`.${extension.toLowerCase()}`);
} 