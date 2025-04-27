'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { type: 'image', src: '/images/gallery/about3.png' },
    { type: 'image', src: '/images/gallery/about3.png' },
    { type: 'image', src: '/images/gallery/about3.png' },
    { type: 'image', src: '/images/gallery/about3.png' },
    { type: 'image', src: '/images/gallery/about3.png' },
  ];

  const handleActivate = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="w-full px-6 py-16">
      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto mb-12">
        
        {/* Left Title */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">
            Our Projects
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Since 2017 —<br /> we are changing lives
          </h2>
        </div>

        {/* Right Description */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <p className="text-gray-600 text-base md:text-lg">
          We are working on various social indicators to improve the people’s
            life in Bangladesh. Our activities are orphan sponosring, orphanage
            construciton and maintainance, constructing and sponsoring
            educational and religious institutions, installation of tube well and
            toilets etc.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full transition-all">
            Read more →
          </button>
        </div>

      </div>

      {/* Bottom slides */}
      <div className="flex gap-4 overflow-hidden max-w-7xl mx-auto">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            layout
            transition={{ layout: { duration: 0.6, ease: 'easeInOut' } }}
            onMouseEnter={() => handleActivate(index)}
            onClick={() => handleActivate(index)}
            className="relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 bg-gray-300"
            style={{
              width: activeIndex === index ? '50%' : '10%',
              height: '400px',
            }}
          >
            {/* Content inside */}
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <video
                src={slide.src}
                muted
                autoPlay
                loop
                className="object-cover w-full h-full"
              />
            )}
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default ProjectSection;
