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
    <section className="py-20 bg-white">
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
                  We Are Best Treatment For Our Hospital
                </h2>
                <p className="mb-3">
                  When deciding which charity to donate to, it's important to do your research and
                  find one that aligns with your values and interests. Look for charities that are
                  transparent and focus on preventable diseases.
                </p>
              </div>

              {/* Info Items */}
              <div className="grid gap-4">
                {/* Item 1 */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-14 h-14 min-w-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-gray-800 group-hover:bg-primary transition">
                    <RiHandHeartLine />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2 group-hover:text-primary transition">
                      Quick Fundraising
                    </h5>
                    <p className="text-gray-600">
                      Fund programs that help children escape poverty by providing vocational training.
                    </p>
                  </div>
                </motion.div>

                {/* Item 2 */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-14 h-14 min-w-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl text-gray-800 group-hover:bg-primary transition">
                    <RiUserLine />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2 group-hover:text-primary transition">
                      Join Our Team
                    </h5>
                    <p className="text-gray-600">
                      Fund programs that help children escape poverty by providing vocational training.
                    </p>
                  </div>
                </motion.div>

                {/* Button */}
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    href="/about"
                    className="inline-block py-3 px-8 mt-4 rounded-lg text-white bg-primary font-bold border border-primary hover:bg-transparent hover:text-primary transition"
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
              whileHover={{ scale: 1.02 }}
              className="relative w-full overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src="/images/gallery/about-3.png"
                alt="About Us"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={handleVideoOpen}
                  className="bg-primary text-white rounded-full p-5 hover:scale-110 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.804 8.186l-4.804 2.647v-5.294l4.804 2.647zm1.196-.186c0-.708-.428-1.295-1.04-1.562l-5.824-3.08C4.515 3.118 4 3.756 4 4.5v7c0 .744.515 1.382 1.136 1.642l5.824 3.08c.612.267 1.04-.854 1.04-1.562V8z"/>
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Video Modal */}
            {isVideoOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className=""
                    ></iframe>
                  </div>
                  <button
                    onClick={handleVideoClose}
                    className="absolute top-2 right-2 text-white text-3xl hover:text-primary transition"
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