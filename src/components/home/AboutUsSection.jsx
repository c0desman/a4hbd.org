'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiHandHeartLine, RiUserLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoOpen = () => setIsVideoOpen(true);
  const handleVideoClose = () => setIsVideoOpen(false);

  return (
    <section className="py-15 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <div className="max-w-[575px] mx-auto md:mx-0">
              <div className="mb-5">
                <span className="uppercase font-bold text-primary inline-block">
                  About Us
                </span>
                <h2 className="font-bold mb-2">
                  Hand in Hand, <span className='text-gradient'>We Light the Way</span>
                </h2>
                <p className="mb-3 text-gray-600">
                  Every hand we hold, every life we touch, brings us closer to a world filled with hope. 
                  Through support, education, and care, we light the way for those who deserve a chance.
                </p>
              </div>

              {/* Info Items */}
              <div className="grid gap-4">
                {/* Item 1 */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-14 h-14 min-w-14 rounded-full bg-red-100 flex items-center justify-center text-2xl text-gray-800 group-hover:bg-primary transition">
                    <RiHandHeartLine />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2 group-hover:text-primary transition">
                      Mission and Vision
                    </h5>
                    <p className="text-gray-600">
                      Empowering Bangladesh's Underprivileged through education, healthcare and community support.
                    </p>
                  </div>
                </motion.div>

                {/* Item 2 */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-14 h-14 min-w-14 rounded-full bg-green-200 flex items-center justify-center text-2xl text-gray-800 group-hover:bg-primary transition">
                    <RiUserLine />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2 group-hover:text-primary transition">
                      Collaboration to Succeed
                    </h5>
                    <p className="text-gray-600">
                      We believe in the power of collaboration. By working together, we can create a brighter future for all.
                    </p>
                  </div>
                </motion.div>

                {/* Button */}
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    href="/about"
                    className="inline-block py-3 px-8 mt-4 rounded-lg text-white bg-primary font-bold border border-primary hover:bg-indigo-700 hover:text-primary transition"
                  >
                    Read More
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Image and Video Button */}
          <div className="relative w-full h-full">
            <motion.div
              className="relative w-full overflow-hidden rounded-lg"
            >
              <Image
                src="/images/gallery/about-4.png"
                alt="About Us"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />

              {/* Correct Play Button */}
              {/* Correct Play Button with Bounce Animation */}
              <div className="absolute inset-0 flex items-center ml-17">
              <motion.button
                onClick={handleVideoOpen}
                className="bg-secondary text-white rounded-full p-5 hover:scale-110 transition"
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                  {/* Proper Play Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {/* Video Modal */}
            {isVideoOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                <div className="relative w-full max-w-3xl aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/3VzyY0njYPM?autoplay=1"
                  title="Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
                ></iframe>
                  <button
                    onClick={handleVideoClose}
                    className="absolute -top-4 -right-4 bg-primary text-white rounded-full p-2 text-2xl hover:bg-white hover:text-primary transition"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;