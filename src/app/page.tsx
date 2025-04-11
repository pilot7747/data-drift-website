'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TrackCard from '@/components/TrackCard';
import { Track, loadTracks, getTracksByType } from '@/lib/content';

export default function Home() {
  const [myTracks, setMyTracks] = useState<Track[]>([]);
  const [featuredMixTracks, setFeaturedMixTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const allTracks = await loadTracks();
        const myTracksData = getTracksByType(allTracks, 'my');
        const mixTracksData = getTracksByType(allTracks, 'mix').slice(0, 3); // Get first 3 mix tracks

        setMyTracks(myTracksData);
        setFeaturedMixTracks(mixTracksData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading tracks:', error);
        setIsLoading(false);
      }
    }
    
    fetchTracks();
  }, []);

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
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-primary">Mixing</span> & <span className="text-secondary">Mastering</span>
              <br />
              <span className="text-light">for Modern Music</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Professional audio engineering services to make your music sound its absolute best.
              Specializing in indie, electronic, and rock productions.
            </p>
            <div className="flex space-x-4">
              <Link href="/portfolio" className="bg-primary hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                View Portfolio
              </Link>
              <Link href="/contact" className="border border-secondary text-secondary hover:bg-secondary hover:text-dark-500 font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Get in Touch
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-64 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 to-secondary-700/40 rounded-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 md:w-64 md:h-64 relative">
                  <motion.div
                    className="w-full h-full rounded-full bg-primary-900/50 absolute"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-3/4 h-3/4 rounded-full bg-primary-800/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="w-1/2 h-1/2 rounded-full bg-primary-700/50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  />
                  <div className="w-1/4 h-1/4 rounded-full bg-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-secondary/50" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Original Tracks Section */}
      <section className="py-16 bg-dark-400 rounded-xl p-8 mb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold mb-2">My Original Tracks</h2>
          <p className="text-gray-400">Check out my own music productions</p>
        </div>
        <div className="grid gap-6">
          {myTracks.map((track) => (
            <TrackCard key={track.file} track={track} />
          ))}
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold mb-2">Featured Work</h2>
          <p className="text-gray-400">A selection of my recent mixing and mastering projects</p>
        </div>
        <div className="grid gap-6">
          {featuredMixTracks.map((track) => (
            <TrackCard key={track.file} track={track} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/portfolio" className="text-primary hover:text-primary-300 inline-flex items-center">
            View all projects
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-dark-400 rounded-xl p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold mb-2">Services</h2>
          <p className="text-gray-400">Professional audio services to elevate your music</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard 
            title="Mixing" 
            description="Blend your tracks together into a cohesive, balanced sound that brings your vision to life."
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <ServiceCard 
            title="Mastering" 
            description="Polish your mixed tracks to sound professional on all playback systems and streaming platforms."
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-2.828a3 3 0 00-4.243 0m8.485-8.486a3 3 0 00-4.242 0m0 4.243a3 3 0 004.242-4.243" />
              </svg>
            }
          />
          <ServiceCard 
            title="Production" 
            description="Full-service music production from concept to final master, tailored to your artistic vision."
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            }
          />
        </div>
      </section>
    </Layout>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div 
      className="bg-dark-300 p-6 rounded-lg border border-dark-200"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(98, 0, 234, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}; 