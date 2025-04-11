import React from 'react';
import Link from 'next/link';
import { FaGithub, FaSoundcloud, FaInstagram, FaSpotify } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-dark-500 text-light">
      <header className="sticky top-0 z-50 bg-dark-400 border-b border-dark-300 backdrop-blur-md bg-opacity-80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-10 h-10">
                  <motion.div 
                    className="absolute inset-0 bg-primary rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                  />
                  <motion.div 
                    className="absolute inset-2 bg-dark-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      repeatType: "reverse",
                      delay: 0.5
                    }}
                  />
                </div>
                <span className="font-display text-2xl font-bold tracking-tight">
                  <span className="text-primary">Data</span>
                  <span className="text-secondary">Drift</span>
                </span>
              </Link>
            </motion.div>
            
            <nav className="hidden md:flex space-x-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/portfolio">Portfolio</NavLink>
              <NavLink href="/services">Services</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </nav>
            
            <div className="md:hidden">
              {/* Mobile menu button would go here */}
              <button className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-dark-400 border-t border-dark-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <div className="font-display text-xl font-bold mb-2">
                <span className="text-primary">Data</span>
                <span className="text-secondary">Drift</span>
              </div>
              <p className="text-gray-400 text-sm">
                Mixing, Mastering & Music Production
              </p>
            </div>
            
            <div className="flex space-x-6">
              <SocialLink href="https://github.com/pilot7747" icon={<FaGithub size={20} />} />
              <SocialLink href="https://soundcloud.com/data-drift" icon={<FaSoundcloud size={20} />} />
              <SocialLink href="https://instagram.com/datadriftmusic" icon={<FaInstagram size={20} />} />
              <SocialLink href="https://open.spotify.com/artist/3iuFNiMtaGXvLuXLb1IeBP?si=jL9wLXjTQbCDRie2haOgGg" icon={<FaSpotify size={20} />} />
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-dark-300 text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} Data Drift. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} className="text-gray-300 hover:text-white relative group py-2">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
    </Link>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-primary transition-colors duration-300"
    >
      {icon}
    </a>
  );
};

export default Layout; 