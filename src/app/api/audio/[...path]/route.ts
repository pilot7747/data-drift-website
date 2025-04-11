import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// MP3 files have priority - this maps from the original file names to MP3 versions
const MP3_EXTENSIONS = ['.mp3', '.MP3'];
const WAV_EXTENSIONS = ['.wav', '.WAV'];
const OTHER_EXTENSIONS = ['.flac', '.ogg', '.aac', '.m4a'];

// Debug helper to log directory contents
function logDirectoryContents(dirPath: string): string {
  try {
    if (!fs.existsSync(dirPath)) {
      return `Directory does not exist: ${dirPath}`;
    }
    
    const files = fs.readdirSync(dirPath);
    return `Directory contents of ${dirPath}: ${files.join(', ')}`;
  } catch (error) {
    return `Error reading directory ${dirPath}: ${error}`;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Log some debug info
    const cwd = process.cwd();
    const publicDir = path.join(cwd, 'public');
    const filesDir = path.join(publicDir, 'files');
    
    console.log(`Current working directory: ${cwd}`);
    console.log(logDirectoryContents(publicDir));
    console.log(logDirectoryContents(filesDir));
    
    // Reconstruct the path from the path segments
    const filePath = path.join(cwd, 'public', 'files', ...params.path);
    console.log(`Looking for file: ${filePath}`);
    console.log(`File exists check: ${fs.existsSync(filePath)}`);
    
    // If a specific extension is requested
    if (path.extname(filePath)) {
      if (!fs.existsSync(filePath)) {
        console.log(`File not found with full path: ${filePath}`);
        return new NextResponse(`File not found: ${filePath}`, { status: 404 });
      }
      
      const fileBuffer = fs.readFileSync(filePath);
      const extension = path.extname(filePath).toLowerCase();
      
      let mimeType = 'audio/mpeg'; // Default MIME type
      
      if (extension === '.wav') {
        mimeType = 'audio/wav';
      } else if (extension === '.ogg') {
        mimeType = 'audio/ogg';
      } else if (extension === '.flac') {
        mimeType = 'audio/flac';
      }
      
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': mimeType,
          'Content-Length': fileBuffer.length.toString(),
          'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        },
      });
    }
    
    // If no extension, try to find the file with different extensions (mp3 first, then others)
    // First try MP3 (preferred format)
    for (const ext of MP3_EXTENSIONS) {
      const filePathWithExt = `${filePath}${ext}`;
      console.log(`Trying with extension: ${filePathWithExt}`);
      console.log(`File exists check: ${fs.existsSync(filePathWithExt)}`);
      
      if (fs.existsSync(filePathWithExt)) {
        const fileBuffer = fs.readFileSync(filePathWithExt);
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Length': fileBuffer.length.toString(),
            'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
          },
        });
      }
    }
    
    // Then try WAV (original, uncompressed format)
    for (const ext of WAV_EXTENSIONS) {
      const filePathWithExt = `${filePath}${ext}`;
      if (fs.existsSync(filePathWithExt)) {
        const fileBuffer = fs.readFileSync(filePathWithExt);
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': 'audio/wav',
            'Content-Length': fileBuffer.length.toString(),
            'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
          },
        });
      }
    }
    
    // Finally try other formats
    for (const ext of OTHER_EXTENSIONS) {
      const filePathWithExt = `${filePath}${ext}`;
      if (fs.existsSync(filePathWithExt)) {
        const fileBuffer = fs.readFileSync(filePathWithExt);
        let mimeType = 'audio/mpeg';
        
        if (ext === '.ogg') {
          mimeType = 'audio/ogg';
        } else if (ext === '.flac') {
          mimeType = 'audio/flac';
        } else if (ext === '.aac' || ext === '.m4a') {
          mimeType = 'audio/aac';
        }
        
        return new NextResponse(fileBuffer, {
          headers: {
            'Content-Type': mimeType,
            'Content-Length': fileBuffer.length.toString(),
            'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
          },
        });
      }
    }
    
    // If file not found, log the attempted path for debugging
    console.error(`File not found: ${filePath}`);
    console.error(`Params path: ${params.path.join('/')}`);
    return new NextResponse(`File not found: ${params.path.join('/')}. Checked directory contents: ${logDirectoryContents(filesDir)}`, { status: 404 });
  } catch (error) {
    console.error('Error serving audio file:', error);
    return new NextResponse(`Internal server error: ${error}`, { status: 500 });
  }
} 