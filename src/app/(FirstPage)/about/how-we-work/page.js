'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AiOutlineFundProjectionScreen,
  AiOutlineFileDone,
  AiOutlineFileSearch,
} from 'react-icons/ai';
import { PiFilesBold, PiMagnifyingGlassFill } from 'react-icons/pi';
import { MdManageAccounts } from 'react-icons/md';
import { LuHeartHandshake } from 'react-icons/lu';
import { FaUserShield, FaHandHoldingHeart } from 'react-icons/fa';
import { FcIdea } from 'react-icons/fc';
import { LiaTransgenderSolid } from 'react-icons/lia';
import { FaLeaf } from 'react-icons/fa6';
import WhereWeWork from '@/components/about/WhereWeWork';
import ProjectImplementationRoadmap from '@/components/about/ProjectImplementationRoadmap';

const cards = [
  {
    icon: <AiOutlineFileSearch className="text-4xl" />,
    description: 'Type and specifications of the project',
    number: '01',
    iconBg: 'bg-red-200',
  },
  {
    icon: <PiFilesBold className="text-4xl" />,
    description: 'Approve total cost of project to be implemented',
    number: '02',
    iconBg: 'bg-green-200',
  },
  {
    icon: <AiOutlineFundProjectionScreen className="text-4xl" />,
    description: 'Project implementation and monitoring',
    number: '03',
    iconBg: 'bg-yellow-200',
  },
  {
    icon: <AiOutlineFileDone className="text-4xl" />,
    description: 'Project completion and final report submission',
    number: '04',
    iconBg: 'bg-blue-200',
  },
];

const policy = [
  {
    icon: <PiMagnifyingGlassFill className="text-4xl" />,
    title: 'Transparency',
    number: '01',
    iconBg: 'bg-red-200',
  },
  {
    icon: <MdManageAccounts className="text-4xl" />,
    title: 'Accountability',
    number: '02',
    iconBg: 'bg-orange-200',
  },
  {
    icon: <FaHandHoldingHeart className="text-4xl" />,
    title: 'Honesty',
    number: '03',
    iconBg: 'bg-violet-200',
  },
  {
    icon: <FaUserShield className="text-4xl" />,
    title: 'Realiability',
    number: '04',
    iconBg: 'bg-blue-200',
  },
  {
    icon: <FcIdea className="text-4xl" />,
    title: 'Innovation',
    number: '05',
    iconBg: 'bg-purple-200',
  },
  {
    icon: <LuHeartHandshake className="text-4xl" />,
    title: 'Mutual Respect',
    number: '06',
    iconBg: 'bg-sky-200',
  },
  {
    icon: <LiaTransgenderSolid className="text-4xl" />,
    title: 'Gender & Diversity',
    number: '07',
    iconBg: 'bg-pink-200',
  },
  {
    icon: <FaLeaf className="text-4xl" />,
    title: 'Sustainability',
    number: '08',
    iconBg: 'bg-green-200',
  },
];

export default function HowWeWork() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleCardClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-full overflow-x-hidden bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white">
        <div className="max-w-screen-xl mx-auto px-4 pt-36 lg:pt-44 pb-5 lg:pb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Our Working <span className="live-gradient">Procedure</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-300 max-w-3xl mx-auto font-bold">
            The Aid For Humanity signs a contract agreement with the institution
            wishing to implement charitable projects in Bangladesh, and the
            agreement includes the following:
          </p>
        </div>
      </section>

      {/* Procedure Cards */}
      <section className="pb-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-4 pt-20">
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              return (
                <div className="group" key={index}>
                  <div
                    className={`relative rounded-2xl p-6 shadow-md transition-all duration-300 overflow-hidden cursor-pointer ${
                      isActive ? 'bg-primary' : 'bg-white'
                    } group-hover:bg-[#0B98D5]`}
                    onClick={() => handleCardClick(index)}
                  >
                    <div
                      className={`w-15 h-15 rounded-full flex justify-center items-center mx-auto mb-4 transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-primary'
                          : `${card.iconBg} text-primary`
                      } group-hover:bg-white group-hover:text-primary`}
                    >
                      {card.icon}
                    </div>
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
                      <p
                        className={`transition-colors line-clamp-3 ${
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
          <p className="text-center pt-10 text-gray-700">
            After both parties agree on all the items, the institution begins
            implementing its projects directly under the supervision of its
            specialised employees and trained workers and provides the
            financing party with the required periodic reports supported by
            photographs and videos. A delegation from the donor institution may
            make a field visit to the project.
          </p>
        </div>
      </section>

      {/* Where We Work Section */}
      <WhereWeWork />

      {/* Roadmap Section */}
      <ProjectImplementationRoadmap />

      {/* Policy Section */}
      <section className="pb-20 pt-15">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Our <span className="text-gradient">Policy</span>
          </h1>
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 pt-10">
            {policy.map((policy, index) => {
              const isActive = index === activeIndex;
              return (
                <div className="group" key={index}>
                  <div
                    className={`relative rounded-2xl p-6 shadow-md transition-all duration-300 overflow-hidden cursor-pointer ${
                      isActive ? 'bg-primary' : 'bg-white'
                    } group-hover:bg-[#0B98D5]`}
                    onClick={() => handleCardClick(index)}
                  >
                    <div
                      className={`w-15 h-15 rounded-full flex justify-center items-center mx-auto mb-4 transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-primary'
                          : `${policy.iconBg} text-primary`
                      } group-hover:bg-white group-hover:text-primary`}
                    >
                      {policy.icon}
                    </div>
                    <div className="absolute bottom-6 right-4 z-0 pointer-events-none">
                      <h4
                        className={`text-[120px] font-extrabold transition-all duration-300 ${
                          isActive ? 'text-white/60' : 'text-gray-300/30'
                        } group-hover:text-white/60`}
                      >
                        {policy.number}
                      </h4>
                    </div>
                    <div className="relative text-center z-[1]">
                      <h6
                        className={`transition-colors line-clamp-3 ${
                          isActive ? 'text-white' : 'text-gray-700'
                        } group-hover:text-white`}
                      >
                        {policy.title}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center pt-10 text-gray-700">
          We warmly invite you to collaborate with us in transforming lives through impactful and transparent humanitarian work. Each step we take is guided by accountability, compassion, and purpose. Together, let’s build a brighter, more just future.
          </p>
        </div>
      </section>
      <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white py-14">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row md:items-center gap-10">
        
        {/* Left: Text + Buttons */}
        <div className="flex-1 flex flex-col justify-between text-center md:text-left">
          <div>
            <h2 className="font-bold mb-4">
                Lets Join Hands
            </h2>
            <p className="mb-6 mx-auto md:mx-0 text-justify">
            Together, we can bring meaningful change to those who need it most. Whether you&apos;re a generous donor, an inspiring partner, or a compassionate supporter— your involvement fuels our mission. Let’s build hope, dignity, and a brighter future, side by side.
            </p>
          </div>
          
          {/* Buttons stay bottom of text section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <Link href="/contact">
              <span className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-gray-100 transition text-center">
              Let’s Talk Collaboration
              </span>
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <Image
            src="/images/gallery/collaboration-banner.jpg"
            alt="Collaborate with us"
            width={600}
            height={400}
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
    </div>
  );
}
