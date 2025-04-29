'use client';

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaMosque } from "react-icons/fa";
import { GiTap } from "react-icons/gi";
import { FaHandsHoldingChild } from "react-icons/fa6";
import { BiSolidDonateHeart } from "react-icons/bi";
import {
  Ri24HoursLine,
  RiExchangeDollarLine,
  RiBookOpenLine,
} from 'react-icons/ri';

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
    title: 'Water Platform Built',
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

const AchievementSection = () => {
  return (
    <section className="py-20 lg:py-20 xs:py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="font-bold leading-tight">
            Our Impact in Numbers
            </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {achievements.map((item, index) => {
            const { ref, inView } = useInView({
              triggerOnce: false, // re-triggers on scroll in/out
              threshold: 0.2, // visible threshold
            });

            return (
              <div className="group" key={index} ref={ref}>
                <div
                  className={`
                    relative rounded-2xl p-6 shadow-md md:shadow-xs transition-all duration-300 overflow-hidden cursor-pointer
                    bg-white group-hover:bg-[#0B98D5]
                  `}
                >
                  <div
                    className={`
                      w-15 h-15 rounded-full flex justify-center items-center mx-auto mb-4 transition-all duration-300
                      ${item.iconBg} text-primary group-hover:bg-white group-hover:text-primary
                    `}
                  >
                    {item.icon}
                  </div>

                  {/* Background Number */}
                  <div className="absolute bottom-6 right-4 z-0 pointer-events-none">
                    <h4 className="text-[120px] font-extrabold text-gray-300/30 group-hover:text-white/60">
                      0{index + 1}
                    </h4>
                  </div>

                  {/* Counter and Title */}
                  <div className="relative text-center z-[1]">
                    <strong className="block text-3xl font-extrabold text-primary group-hover:text-white mb-1">
                      {inView && (
                        <CountUp
                          end={item.number}
                          duration={2}
                          separator=","
                          suffix={item.suffix}
                          preserveValue={false}
                        />
                      )}
                    </strong>
                    <p className="text-black group-hover:text-white font-medium">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementSection;