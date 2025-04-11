'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-primary">Get in</span> Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? Let's work together to make your music sound incredible.
          </p>
        </header>

        <div className="bg-dark-400 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-dark-300 p-3 rounded-lg text-primary">
                  <FaEnvelope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-gray-400">
                    <a href="mailto:pilot7747@gmail.com" className="hover:text-primary transition-colors">
                      pilot7747@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-dark-300 p-3 rounded-lg text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Location</h3>
                  <p className="text-gray-400">Berlin, Germany</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-dark-300 p-3 rounded-lg text-primary">
                  <FaInstagram className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Instagram</h3>
                  <p className="text-gray-400">
                    <a href="https://instagram.com/datadriftmusic" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      @datadriftmusic
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-300 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">Get in Touch</h3>
              <p className="text-gray-300 mb-4">
                For inquiries about mixing, mastering, or production services, please reach out via Instagram or email.
              </p>
              <p className="text-gray-300 mb-4">
                I'll get back to you as soon as possible to discuss your project needs and how I can help make your music sound its best.
              </p>
              <div className="flex space-x-4 mt-6">
                <a 
                  href="mailto:pilot7747@gmail.com" 
                  className="bg-primary hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
                >
                  <FaEnvelope className="mr-2" /> Email Me
                </a>
                <a 
                  href="https://instagram.com/datadriftmusic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
                >
                  <FaInstagram className="mr-2" /> Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
} 