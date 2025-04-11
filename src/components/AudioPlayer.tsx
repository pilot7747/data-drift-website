import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Track } from '@/lib/content';
import { getAudioUrl } from '@/lib/publicPathHelper';

interface AudioPlayerProps {
  track: Track;
  compact?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ track, compact = false }) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const requestRef = useRef<number>();
  
  // Try to load the file as an MP3 first, then fall back to original format if needed
  const [fileUrl, setFileUrl] = useState(getAudioUrl(track.file));

  useEffect(() => {
    setLoaded(false);
    setError(false);
    setSeek(0); // Reset seek position when track changes
    
    // Clean up previous Howl instance
    if (soundRef.current) {
      soundRef.current.unload();
    }

    // Create new Howl instance
    const sound = new Howl({
      src: [fileUrl],
      html5: true, // Use HTML5 Audio to support larger files
      volume: volume,
      onload: () => {
        setLoaded(true);
        setDuration(sound.duration());
        setError(false);
      },
      onloaderror: () => {
        console.error(`Error loading audio file: ${fileUrl}`);
        setError(true);
        
        // If MP3 fails, try with original format
        if (fileUrl === getAudioUrl(track.file)) {
          const originalUrl = getAudioUrl(track.file, 'original');
          console.log(`Trying original format: ${originalUrl}`);
          setFileUrl(originalUrl);
        }
      },
      onplay: () => {
        // No need to start animation frame here as it's handled in the useEffect
        setPlaying(true);
      },
      onpause: () => {
        // No need to cancel animation frame here as it's handled in the useEffect
        setPlaying(false);
      },
      onend: () => {
        setPlaying(false);
        // Animation frame will be canceled in the useEffect
      },
    });

    soundRef.current = sound;

    // Cleanup on unmount
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [fileUrl, track.file, volume]);

  // Separate effect to handle seek updates
  useEffect(() => {
    let animationId: number;
    
    const updateSeekPosition = () => {
      if (soundRef.current && playing) {
        try {
          const currentSeek = soundRef.current.seek();
          if (typeof currentSeek === 'number' && !isNaN(currentSeek)) {
            setSeek(currentSeek);
          }
        } catch (error) {
          console.error("Error updating seek position:", error);
        }
        animationId = requestAnimationFrame(updateSeekPosition);
      }
    };
    
    if (playing && loaded) {
      animationId = requestAnimationFrame(updateSeekPosition);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [playing, loaded]);

  const togglePlayPause = () => {
    if (!soundRef.current || !loaded) return;

    if (playing) {
      soundRef.current.pause();
      setPlaying(false);
    } else {
      soundRef.current.play();
      setPlaying(true);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSeek(value);

    if (soundRef.current) {
      soundRef.current.seek(value);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    setMuted(value === 0);

    if (soundRef.current) {
      soundRef.current.volume(value);
    }
  };

  const toggleMute = () => {
    if (!soundRef.current) return;

    if (muted) {
      soundRef.current.volume(volume);
      setMuted(false);
    } else {
      soundRef.current.volume(0);
      setMuted(true);
    }
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate waveform visualization
  const waveformBars = Array.from({ length: compact ? 5 : 10 }, (_, i) => (
    <motion.div
      key={i}
      className={`bg-primary-400 rounded-full mx-0.5 ${compact ? 'w-0.5' : 'w-1'}`}
      initial={{ height: '20%' }}
      animate={playing ? { 
        height: ['20%', '100%', '20%'],
        transition: { 
          duration: 1.2, 
          repeat: Infinity, 
          delay: i * 0.1 
        }
      } : { height: '20%' }}
    />
  ));

  // Render compact version
  if (compact) {
    return (
      <div className="bg-dark-400 rounded-lg p-2 flex items-center">
        <button 
          onClick={togglePlayPause} 
          disabled={!loaded || error}
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center disabled:bg-gray-700 disabled:cursor-not-allowed mr-3"
        >
          {playing ? <FaPause className="text-light text-sm" /> : <FaPlay className="text-light ml-0.5 text-sm" />}
        </button>
        
        <div className="flex-1 flex-col">
          <div className="flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={seek}
              onChange={handleSeekChange}
              disabled={!loaded || error}
              className="w-full h-1.5 bg-dark-300 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, #6200EA ${(seek / (duration || 1)) * 100}%, #1F1F1F ${(seek / (duration || 1)) * 100}%)`,
              }}
            />
            <button onClick={toggleMute} className="text-light ml-2" disabled={!loaded || error}>
              {muted ? <FaVolumeMute className="text-xs" /> : <FaVolumeUp className="text-xs" />}
            </button>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(seek)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {error ? (
          <div className="text-red-500 text-xs ml-2">Error</div>
        ) : !loaded ? (
          <div className="text-gray-400 text-xs ml-2">Loading...</div>
        ) : (
          <div className="flex items-end h-6 space-x-0.5 ml-2">
            {waveformBars}
          </div>
        )}
      </div>
    );
  }

  // Render full version
  return (
    <div className="bg-dark-400 rounded-xl p-4 w-full max-w-md shadow-lg">
      <div className="text-light">
        <h3 className="text-lg font-bold">{track.title}</h3>
        <p className="text-sm text-gray-400">{track.artist}</p>
      </div>
      
      <div className="flex items-center justify-center my-4 h-12">
        {error ? (
          <div className="text-red-500 text-sm">Error loading audio</div>
        ) : loaded ? (
          <div className="flex items-end h-full space-x-1">
            {waveformBars}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">Loading...</div>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={togglePlayPause} 
          disabled={!loaded || error}
          className="w-10 h-10 rounded-full bg-primary flex items-center justify-center disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          {playing ? <FaPause className="text-light" /> : <FaPlay className="text-light ml-1" />}
        </button>
        
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={seek}
            onChange={handleSeekChange}
            disabled={!loaded || error}
            className="w-full h-2 bg-dark-300 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(to right, #6200EA ${(seek / (duration || 1)) * 100}%, #1F1F1F ${(seek / (duration || 1)) * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(seek)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button onClick={toggleMute} className="text-light" disabled={!loaded || error}>
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            disabled={!loaded || error}
            className="w-16 h-1 bg-dark-300 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
            style={{
              background: `linear-gradient(to right, #03DAC6 ${(muted ? 0 : volume) * 100}%, #1F1F1F ${(muted ? 0 : volume) * 100}%)`,
            }}
          />
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {track.genre.map((genre) => (
          <span key={genre} className="text-xs px-2 py-1 bg-dark-300 text-secondary rounded-full">
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer; 