import React from 'react';
import { Track } from '@/lib/content';
import AudioPlayer from './AudioPlayer';
import { motion } from 'framer-motion';
import { FaMusic, FaHeadphones, FaUserFriends } from 'react-icons/fa';

interface TrackCardProps {
  track: Track;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  // Get the right icon for the track type
  const getTrackTypeIcon = () => {
    switch (track.type) {
      case 'my':
        return <FaMusic className="mr-2 text-primary" />;
      case 'mix':
        return <FaHeadphones className="mr-2 text-primary" />;
      case 'friend':
        return <FaUserFriends className="mr-2 text-primary" />;
      default:
        return null;
    }
  };

  // Get the text description for the track type
  const getTrackTypeText = () => {
    switch (track.type) {
      case 'my':
        return 'Original Track';
      case 'mix':
        return 'Mixed & Mastered';
      case 'friend':
        return 'Friend Project';
      default:
        return '';
    }
  };

  return (
    <motion.div 
      className="border border-dark-200 bg-dark-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-display font-semibold text-light">{track.title}</h3>
            <p className="text-gray-400">{track.artist}</p>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            {getTrackTypeIcon()}
            <span className="hidden sm:inline">
              {getTrackTypeText()}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2 mb-3">
          {track.genre.map((genre) => (
            <span 
              key={genre} 
              className="text-xs px-2 py-0.5 bg-dark-400 text-secondary rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        
        <p className="text-gray-300 mb-4">{track.description}</p>
        
        <AudioPlayer track={track} compact={true} />
      </div>
    </motion.div>
  );
};

export default TrackCard; 