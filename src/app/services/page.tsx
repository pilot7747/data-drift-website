'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Services() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-primary">Professional</span> Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Elevate your music with expert mixing, mastering, and production services
          </p>
        </header>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <ServiceCard
            title="Mixing"
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <ServiceCard
            title="Mastering"
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-2.828a3 3 0 00-4.243 0m8.485-8.486a3 3 0 00-4.242 0m0 4.243a3 3 0 004.242-4.243" />
              </svg>
            }
          />
          <ServiceCard
            title="Production"
            icon={
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            }
          />
        </div>

        {/* Mixing Service */}
        <ServiceSection
          title="Mixing"
          description="Transform your raw tracks into a balanced, professional mix that enhances your artistic vision."
          features={[
            "EQ and compression to make every instrument sit perfectly in the mix",
            "Automation and dynamics processing to bring emotion and movement",
            "Spatial effects (reverb, delay) to create depth and dimension",
            "Vocal treatment to make voices clear and present",
            "Stem mixing available for more control over the final product"
          ]}
          image="/mixing-desk.jpg"
        />

        {/* Mastering Service */}
        <ServiceSection
          title="Mastering"
          description="The final polish that ensures your music sounds incredible on any playback system."
          features={[
            "Loudness optimization for streaming platforms and physical media",
            "Tonal balance to ensure consistent sound across different systems",
            "Stereo enhancement for wider, more immersive sound",
            "Dynamic control to balance louder and quieter sections",
            "Final quality check to catch any issues before release"
          ]}
          image="/mastering-studio.jpg"
          reversed
        />

        {/* Production Service */}
        <ServiceSection
          title="Production"
          description="Full-service music production from concept to completion, tailored to your vision."
          features={[
            "Arrangement and composition assistance to develop your ideas",
            "Sound design and instrument selection for unique sonic character",
            "Session musician coordination for live instrument recordings",
            "Vocal production including comping, tuning, and processing",
            "Complete mixing and mastering for a ready-to-release product"
          ]}
          image="/production-studio.jpg"
        />

        {/* CTA Section */}
        <div className="bg-dark-400 rounded-xl p-8 mt-16 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Let's work together to make your music sound its absolute best. Get in touch for a free consultation.
          </p>
          <Link href="/contact" className="bg-primary hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 inline-block">
            Contact Me
          </Link>
        </div>
      </motion.div>
    </Layout>
  );
}

interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, icon }) => {
  return (
    <motion.div
      className="bg-dark-400 rounded-xl p-8 text-center h-full flex flex-col border border-dark-300"
      whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-primary mx-auto mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 flex-grow">
        Professional {title.toLowerCase()} services tailored to your music's needs.
      </p>
      <Link href="/contact" className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-2 px-4 rounded-lg transition-colors duration-200 inline-block mt-auto">
        Get Started
      </Link>
    </motion.div>
  );
};

interface ServiceSectionProps {
  title: string;
  description: string;
  features: string[];
  image: string;
  reversed?: boolean;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ title, description, features, image, reversed = false }) => {
  return (
    <section className={`py-16 ${reversed ? 'bg-dark-400 rounded-xl' : ''}`}>
      <div className={`grid md:grid-cols-2 gap-12 items-center ${reversed ? 'md:flex-row-reverse' : ''}`}>
        <div className={reversed ? 'order-2 md:order-1' : ''}>
          <h2 className="text-3xl font-display font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-300 mb-6">{description}</p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-secondary mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={reversed ? 'order-1 md:order-2' : ''}>
          <div className="relative rounded-lg overflow-hidden bg-dark-200 h-64 md:h-80">
            {/* Placeholder for image - in production would use next/image */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 to-secondary-700/40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-light font-medium">{title} Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 