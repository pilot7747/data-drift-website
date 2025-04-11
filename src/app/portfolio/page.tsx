'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TrackCard from '@/components/TrackCard';
import { motion } from 'framer-motion';
import { Track, loadTracks, getAllGenres } from '@/lib/content';

export default function Portfolio() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const allTracks = await loadTracks();
        const allGenres = getAllGenres(allTracks);
        
        setTracks(allTracks);
        setFilteredTracks(allTracks);
        setGenres(allGenres);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading tracks:', error);
        setIsLoading(false);
      }
    }
    
    fetchTracks();
  }, []);

  const filterByType = (type: 'all' | 'mix' | 'my' | 'friend') => {
    setActiveFilter(type);
    
    if (type === 'all') {
      setFilteredTracks(tracks);
    } else {
      setFilteredTracks(tracks.filter(track => track.type === type));
    }
  };

  const filterByGenre = (genre: string) => {
    setActiveFilter(genre);
    setFilteredTracks(tracks.filter(track => track.genre.includes(genre)));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-primary text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-primary">Music</span> Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my complete collection of mixing, mastering, and production work
          </p>
        </header>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <FilterButton 
              label="All Projects" 
              active={activeFilter === 'all'} 
              onClick={() => filterByType('all')} 
            />
            <FilterButton 
              label="Mixing & Mastering" 
              active={activeFilter === 'mix'} 
              onClick={() => filterByType('mix')} 
            />
            <FilterButton 
              label="Original Music" 
              active={activeFilter === 'my'} 
              onClick={() => filterByType('my')} 
            />
            <FilterButton 
              label="Friend Projects" 
              active={activeFilter === 'friend'} 
              onClick={() => filterByType('friend')} 
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <FilterButton 
                key={genre}
                label={genre} 
                active={activeFilter === genre} 
                onClick={() => filterByGenre(genre)} 
              />
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredTracks.length > 0 ? (
            filteredTracks.map((track) => (
              <TrackCard key={track.file} track={track} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 col-span-full">
              No tracks found with the selected filter.
            </div>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        active
          ? 'bg-primary text-white'
          : 'bg-dark-300 text-gray-300 hover:bg-dark-200'
      }`}
    >
      {label}
    </button>
  );
}; 