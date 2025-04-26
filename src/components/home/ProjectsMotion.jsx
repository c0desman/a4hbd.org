// components/ProjectCards.jsx
'use client';
import { motion, useMotionValue, useTransform, AnimatePresence, useAnimation } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const projects = [
  { name: "Courier App", image: "/projects/courier.png", url: "/projects/courier" },
  { name: "Inventory System", image: "/projects/inventory.png", url: "/projects/inventory" },
  { name: "Fleet Tracker", image: "/projects/fleet.png", url: "/projects/fleet" },
  { name: "Newspaper App", image: "/projects/newspaper.png", url: "/projects/newspaper" },
  { name: "Charity Site", image: "/projects/charity.png", url: "/projects/charity" },
  { name: "Accounting Tool", image: "/projects/accounting.png", url: "/projects/accounting" },
  { name: "More", image: null, url: "/projects" },
];

const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const textVariant = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const containerVariant = {
  animate: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const ProjectCards = () => {
  const [shuffledProjects, setShuffledProjects] = useState([]);
  const resetTrigger = useRef(null);

  useEffect(() => {
    const doShuffle = () => {
      const shuffled = shuffleArray(projects);
      setShuffledProjects(shuffled.map((proj, i) => ({ ...proj, id: i })));
    };

    doShuffle();
    resetTrigger.current = setInterval(() => {
      doShuffle();
    }, 10000);

    return () => clearInterval(resetTrigger.current);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-12">
        Explore Our Projects
      </h2>

      <div className="relative w-full h-[500px] md:h-[600px]">
        <AnimatePresence>
          {shuffledProjects.map((project, index) => (
            <DraggableCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const DraggableCard = ({ project, index }) => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const zIndex = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      controls.start({ x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 200 } });
    }, 10000);
    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <motion.div
      className="absolute top-0 left-0 cursor-grab active:cursor-grabbing touch-pan-x"
      drag
      dragElastic={0.8}
      style={{ x, y, rotate, zIndex: zIndex.current }}
      whileTap={{ scale: 1.05 }}
      animate={controls}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onDragStart={() => (zIndex.current = 10)}
      onDragEnd={() => (zIndex.current = 0)}
    >
      <Link
        href={project.url}
        className="flex items-center gap-2 px-4 py-2 rounded-md shadow-md border border-gray-200 bg-white hover:shadow-xl transition-transform duration-300"
      >
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            width={24}
            height={24}
            className="w-6 h-6 object-cover rounded-full"
          />
        )}

        <motion.span
          className="text-sm font-medium whitespace-nowrap flex gap-[1px]"
          variants={containerVariant}
          initial="initial"
          animate="animate"
        >
          {project.name.split("").map((char, i) => (
            <motion.span key={i} variants={textVariant}>
              {char === " " ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default ProjectCards;