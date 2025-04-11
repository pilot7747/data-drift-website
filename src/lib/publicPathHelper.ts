// Helper functions for working with public paths

/**
 * Get the file URL for a track with the specified format
 * 
 * @param filename The filename from the track data (without extension)
 * @param format The audio format (default: 'mp3')
 * @returns The URL to the audio file
 */
export function getAudioUrl(filename: string, format: string = 'mp3'): string {
  return `/files/${filename}${format === 'original' ? '' : '.' + format}`;
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