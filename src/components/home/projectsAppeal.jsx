'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const appeals = [
  { id: 1, link: '/projects/4',  normal: '/images/gallery/Appeal-1.webp',  hover: '/images/gallery/Appeal-1-1.webp', alt: 'Restore Their Sight' },
  { id: 2, link: '/projects/2',  normal: '/images/gallery/Appeal-2.webp',  hover: '/images/gallery/Appeal-2-1.webp', alt: 'Build a Water Well' },
  { id: 3, link: '/projects/1',  normal: '/images/gallery/Appeal-3.webp',  hover: '/images/gallery/Appeal-3-1.webp', alt: 'Sponsor an Orphan' },
  { id: 4, link: '/projects/3',  normal: '/images/gallery/Appeal-4.webp',  hover: '/images/gallery/Appeal-4-1.webp', alt: 'Advocate for Gaza' },
];

export default function ProjectsAppeal() {
  return (
    <section className="w-full px-6 py-16 bg-white">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto mb-2 md:mb-8 lg:mb-12">
        <div className="md:w-1/2 mb-2 md:mb-0">
          <span className="uppercase font-bold text-primary inline-block">Our Top Projects</span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-gradient">Since 2017 —</span><br /> we are changing lives
          </h2>
        </div>

        <div className="md:w-1/2 flex flex-col gap-4 hidden xl:block">
          <p className="text-gray-600 text-base">
            We are working on various social indicators to improve people’s lives in Bangladesh including orphan sponsorship, tube wells, toilets and institutions.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/projects"
              className="inline-block py-3 px-8 mt-4 rounded-lg text-white bg-primary font-bold border border-primary hover:bg-indigo-700 hover:text-primary transition"
            >
              Our Projects
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Appeals Grid: 2 on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {appeals.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            aria-label={item.alt}
            className="group relative block rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B98D5]"
          >
            {/* Card height is controlled per breakpoint to keep full-height imagery */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="relative w-full h-[210px] sm:h-[240px] md:h-[280px] lg:h-[320px] rounded-2xl"
            >
              {/* Base image: full-bleed, full height */}
              <Image
                src={item.normal}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-bottom transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus:opacity-0"
                priority={item.id === 1}
              />
              {/* Hover image */}
              <Image
                src={item.hover}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover object-bottom opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus:opacity-100"
              />
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
