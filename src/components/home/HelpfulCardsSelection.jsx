// components/HelpfulCardsSection.jsx
'use client';

import React, { useState } from 'react';
import {
  RiHandCoinLine,
  Ri24HoursLine,
  RiExchangeDollarLine,
  RiBookOpenLine,
} from 'react-icons/ri';

const cards = [
  {
    icon: <RiHandCoinLine className="text-4xl transition-colors" />,
    title: 'Fostering Equality',
    description: 'Fostering equality and inclusion for all communities',
    number: '01',
    iconBg: 'bg-red-200',
  },
  {
    icon: <Ri24HoursLine className="text-4xl transition-colors" />,
    title: 'Promoting Education',
    description: 'Empowering change through accessible learning for all',
    number: '02',
    iconBg: 'bg-green-200',
  },
  {
    icon: <RiExchangeDollarLine className="text-4xl transition-colors" />,
    title: 'Creating Opportunity',
    description: 'Unlocking potential by building better opportunities',
    number: '03',
    iconBg: 'bg-yellow-200',
  },
  {
    icon: <RiBookOpenLine className="text-4xl transition-colors" />,
    title: 'Inspiring Compassion',
    description: 'Cultivating change through acts of care and humanity',
    number: '04',
    iconBg: 'bg-blue-200',
  },
];

const HelpfulCardsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-28 lg:py-20 xs:py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <div className="group" key={index}>
                <div
                  className={`
                    relative rounded-2xl p-6 shadow-md md:shadow-xs transition-all duration-300 overflow-hidden cursor-pointer
                    ${isActive ? 'bg-primary' : 'bg-white'}
                    group-hover:bg-[#0B98D5]
                  `}
                  onClick={() => handleCardClick(index)}
                >
                  <div
                    className={`
                      w-15 h-15 rounded-full flex justify-center items-center mx-auto mb-4 transition-all duration-300
                      ${isActive ? 'bg-white text-primary' : `${card.iconBg} text-primary`}
                      group-hover:bg-white group-hover:text-primary
                    `}
                  >
                    {card.icon}
                  </div>

                  {/* Background Number */}
                  <div className="absolute bottom-6 right-4 z-0 pointer-events-none">
                    <h4
                      className={`text-[120px] font-extrabold transition-all duration-300 ${
                        isActive ? 'text-white/60' : 'text-gray-300/30'
                      } group-hover:text-white/60`}
                    >
                      {card.number}
                    </h4>
                  </div>

                  <div className="relative text-center z-[1]">
                    <h5
                      className={`font-bold mb-2 text-heading transition-colors ${
                        isActive ? 'text-white' : 'text-black'
                      } group-hover:text-white`}
                    >
                      {card.title}
                    </h5>
                    <p
                      className={`text-body line-clamp-3 transition-colors ${
                        isActive ? 'text-white' : 'text-gray-700'
                      } group-hover:text-white`}
                    >
                      {card.description}
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

export default HelpfulCardsSection;
