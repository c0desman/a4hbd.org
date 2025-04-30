'use client';

import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaMosque } from 'react-icons/fa';
import { GiTap } from 'react-icons/gi';
import { FaHandsHoldingChild } from 'react-icons/fa6';
import { BiSolidDonateHeart } from 'react-icons/bi';

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
  {
    icon: <FaHandsHoldingChild className="text-4xl transition-colors" />,
    title: 'Orphans Cared',
    number: 7900,
    suffix: '+',
    iconBg: 'bg-yellow-200',
  },
  {
    icon: <BiSolidDonateHeart className="text-4xl transition-colors" />,
    title: 'Financial Aid',
    number: 140000,
    suffix: '$',
    iconBg: 'bg-blue-200',
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

const AchievementSection = () => {
  return (
    <section className="py-20 lg:py-20 xs:py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-bold leading-tight text-3xl md:text-4xl">
            Our Impact in <span className='text-gradient'>Numbers</span>
          </h1>
          <p className="text-gray-600 text-base mt-4 hidden xl:block">
            We are working on various social indicators to improve people’s
            lives in Bangladesh, including orphan sponsorship, tube wells,
            toilets, and institutions.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, index) => (
            <AchievementCard key={index} item={item} />
          ))}
        </div>
        <p className="text-gray-600 text-base mt-10 md:hidden text-center">
          We are working on various social indicators to improve people’s
          lives in Bangladesh, including orphan sponsorship, tube wells,
          toilets, and institutions.
        </p>
      </div>
    </section>
  );
};

export default AchievementSection;
