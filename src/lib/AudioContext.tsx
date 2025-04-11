'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioContextType {
  activeTrackId: string | null;
  setActiveTrackId: (id: string | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Provider component that will wrap the app
export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  return (
    <AudioContext.Provider value={{ activeTrackId, setActiveTrackId }}>
      {children}
    </AudioContext.Provider>
  );
};

// Hook for components to use the audio context
export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}; 