"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import singleProject from "@/data/single-project";
import { useState } from "react";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaMosque } from 'react-icons/fa';
import { GiTap } from 'react-icons/gi';
import { FaHandsHoldingChild } from 'react-icons/fa6';
import { BiSolidDonateHeart } from 'react-icons/bi';
import CTACollaboration from "../../../components/reusable/CTACollaboration";

const achievements = [
  {
    icon: <FaMosque className="text-4xl transition-colors" />,
    title: 'Mosque Built',
    number: 513,
    suffix: '+',
    iconBg: 'bg-red-200',
  },
  {
    icon: <GiTap className="text-4xl transition-colors" />,
    title: 'Water Wells',
    number: 22600,
    suffix: '+',
    iconBg: 'bg-green-200',
  },
];


const AchievementCard = ({ item }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false, // Allow re-triggering
  });

  const [viewed, setViewed] = useState(false);

  if (inView && !viewed) {
    setViewed(true);
  }

  if (!inView && viewed) {
    // Reset view state when leaving viewport (optional, comment if you don't want it to re-trigger)
    setViewed(false);
  }

  return (
    <div ref={ref} className="group h-full flex flex-col">
      <div className="flex-1 relative rounded-2xl p-6 shadow-md transition-all duration-300 overflow-hidden cursor-pointer bg-white group-hover:bg-[#0B98D5] flex flex-col justify-between">
        {/* Icon */}
        <div
          className={`w-15 h-15 rounded-full flex justify-center items-center mx-auto mb-4 transition-all duration-300
            ${item.iconBg} text-primary group-hover:bg-white group-hover:text-primary`}
        >
          {item.icon}
        </div>

        {/* Counter and Title */}
        <div className="relative text-center z-[1]">
          <strong className="block text-3xl font-extrabold text-primary group-hover:text-white mb-1">
            {inView ? (
              <CountUp
                start={0}
                end={item.number}
                duration={2}
                separator=","
                suffix={item.suffix}
                redraw={true}
              />
            ) : (
              '0'
            )}
          </strong>
          <p className="text-black group-hover:text-white font-medium">
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
};


export default function ProjectSingle() {
  const [popupImgIndex, setPopupImgIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white overflow-x-hidden">
        <div className="max-w-screen-xl mx-auto px-4 pt-36 lg:pt-44 pb-5 mb-10 lg:pb-8 grid md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {singleProject.hero.title}
            </h1>
            <p className="text-lg max-w-xl">
              {singleProject.hero.description}
            </p>
            {/* Counters Section */}
            <div className="grid grid-cols-2 lg:pr-10 gap-4 text-sm mt-10 mb-10">
            {achievements.map((item, index) => (
            <AchievementCard key={index} item={item} />
          ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src={singleProject.hero.image}
              alt="Hero Image"
              width={800}
              height={450}
              className="rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Importance Section */}
      <section
        className="overflow-x-hidden bg-cover bg-bottom-center py-12"
        style={{ backgroundImage: "url(/images/gallery/objectives-bg.jpg)" }}
      >
        <div className="max-w-screen-xl px-4 mx-auto pt-10 lg:pt-15 pb-5 lg:pb-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl text-black font-bold mb-4"
          >
            Importance of the Project
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl font-medium text-black text-justify"
          >
            {singleProject.importance}
          </motion.p>
        </div>
      </section>

      {/* What We Do Section */}
      {singleProject.whatWeDo && (
        <section className="overflow-x-hidden">
          <div className="max-w-screen-xl mx-auto px-4 pt-10 lg:pt-15 pb-5 lg:pb-8 grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                {singleProject.whatWeDo.title}
              </h2>
              <p className="text-lg text-gray-700">
                {singleProject.whatWeDo.description}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {singleProject.whatWeDo.image && (
                <Image
                  src={singleProject.whatWeDo.image}
                  alt="What We Do"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      <section className="overflow-x-hidden bg-gray-100 relative">
        <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {singleProject.photoGallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                onClick={() => setPopupImgIndex(i)}
                className="cursor-pointer overflow-hidden rounded-md aspect-[4/3] relative"
              >
                <Image
                  src={img}
                  alt={`Gallery ${i}`}
                  fill
                  className="object-cover rounded-md"
                />
              </motion.div>
            ))}
          </div>

          {popupImgIndex !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              {/* Close Button */}
              <button
                onClick={() => setPopupImgIndex(null)}
                className="absolute top-4 right-6 text-white text-3xl hover:text-red-400 cursor-pointer transition"
              >
                &times;
              </button>

              {/* Previous Button */}
              <button
                onClick={() =>
                  setPopupImgIndex((prev) => (prev > 0 ? prev - 1 : prev))
                }
                className="absolute left-4 text-white text-4xl hover:text-gray-300 cursor-pointer transition"
              >
                &#10094;
              </button>

              {/* Full Image */}
              <div className="max-w-4xl w-full px-4">
                <Image
                  src={singleProject.photoGallery[popupImgIndex]}
                  alt="Full Image"
                  width={1200}
                  height={800}
                  className="rounded-lg w-full h-auto object-contain max-h-[90vh]"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setPopupImgIndex((prev) =>
                    prev < singleProject.photoGallery.length - 1 ? prev + 1 : prev
                  )
                }
                className="absolute right-4 text-white text-4xl hover:text-gray-300 cursor-pointer transition"
              >
                &#10095;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video Gallery */}
      <section className="overflow-x-hidden bg-white">
        <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Video Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {singleProject.videoGallery.map((videoUrl, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="aspect-video overflow-hidden rounded-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoUrl.split('v=')[1]}?controls=0`}
                  title={`Video ${i}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      {singleProject.projectTypes && (
        <section className="project-type overflow-x-hidden bg-gray-100 py-12">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Project Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {singleProject.projectTypes.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={400}
                    height={300}
                    className="rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p>{card.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="overflow-x-hidden bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {singleProject.faq.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                layout // Add layout animation
              >
                <div 
                  className="cursor-pointer p-4"
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <motion.span
                      className="ml-2 text-gray-600"
                      animate={{ rotate: activeIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    height: activeIndex === i ? 'auto' : 0
                  }}
                  transition={{ 
                    duration: 0.2,
                    opacity: { duration: 0.15 }, // Faster opacity transition
                    layout: { duration: 0.2 } // Smooth layout transitions
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <CTACollaboration />
    </>
  );
}