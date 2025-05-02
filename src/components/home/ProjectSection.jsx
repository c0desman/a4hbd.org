'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const slides = [
  {
    type: 'video',
    src: '/videos/slides/Community-impact.mp4',
    name: 'Mosque Project',
    href: '/projects/mosque',
  },
  {
    type: 'video',
    src: '/videos/slides/orphan-support.mp4',
    name: 'Ablution Centers',
    href: '/projects/ablution',
  },
  {
    type: 'image',
    src: '/images/gallery/tubewell-banner.JPG',
    name: 'Tubewell Project',
    href: '/projects/tubewell',
  },
  {
    type: 'image',
    src: '/images/gallery/orphan-sponsoring.JPG',
    name: 'Orphan Sponsoring',
    href: '/projects/orphan',
  },
  {
    type: 'image',
    src: '/images/gallery/qurbani-banner.png',
    name: 'Qurbani Project',
    href: '/projects/qurbani',
  },
  {
    type: 'image',
    src: '/images/gallery/zakat-banner.jpg',
    name: 'Zakaat Al Maal',
    href: '/projects/zakat',
  },
];

const ProjectSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full px-6 py-16 bg-white">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto mb-2 md:mb-8 lg:mb-12">
        <div className="md:w-1/2 mb-2 md:mb-0">
          <span className="uppercase font-bold text-primary inline-block">
            Our Top Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className='text-gradient'>Since 2017 —</span><br /> we are changing lives
          </h2>
        </div>
        <div className="md:w-1/2 flex flex-col gap-4 hidden xl:block">
          <p className="text-gray-600 text-base">
            We are working on various social indicators to improve people’s
            lives in Bangladesh, including orphan sponsorship, tube wells,
            toilets, and institutions.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/about"
              className="inline-block py-3 px-8 mt-4 rounded-lg text-white bg-primary font-bold border border-primary hover:bg-indigo-700 hover:text-primary transition"
            >
              Our Projects
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Desktop Slides */}
      <div className="hidden md:flex gap-4 overflow-hidden max-w-7xl mx-auto">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            layout
            transition={{ layout: { duration: 0.2, ease: 'easeInOut' } }}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => window.location.href = slide.href}
            className="relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 bg-gray-300 group"
            style={{
              width: activeIndex === index ? '50%' : '8.33%',
              height: '400px',
            }}
          >
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt={slide.name}
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

            {/* Project Name Overlay */}
            {activeIndex === index && (
              <div className="absolute bottom-0 w-full bg-[#0b98d5]/80 text-white text-center py-2 font-bold text-4xl">
                {slide.name}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile Swiper */}
      <div className="md:hidden mt-5">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          loop
          spaceBetween={20}
          slidesPerView={1}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Link href={slide.href} className="block">
                <div className="rounded-2xl overflow-hidden h-72 relative">
                  {slide.type === 'image' ? (
                    <img
                      src={slide.src}
                      alt={slide.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={slide.src}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 w-full bg-[#0b98d5]/80 text-white text-center py-2 font-bold text-lg">
                    {slide.name}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="md:hidden flex flex-col gap-4 mt-6">
        <p className="text-gray-600 text-base">
          We are working on various social indicators to improve people’s
          lives in Bangladesh, including orphan sponsorship, tube wells,
          toilets, and institutions.
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/about"
            className="inline-block py-3 px-8 rounded-lg text-white bg-primary font-bold border border-primary hover:bg-indigo-700 hover:text-primary transition"
          >
            Our Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectSection;