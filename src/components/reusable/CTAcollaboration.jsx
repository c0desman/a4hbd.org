'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CTACollaboration = () => {
  return (
    <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white py-14">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row md:items-center gap-10">
        
        {/* Left: Text + Buttons */}
        <div className="flex-1 flex flex-col justify-between text-center md:text-left">
          <div>
            <h2 className="font-bold mb-4">
                Lets Join Hands
            </h2>
            <p className="mb-6 mx-auto md:mx-0 text-justify">
            Together, we can bring meaningful change to those who need it most. Whether you're a generous donor, an inspiring partner, or a compassionate supporter— your involvement fuels our mission. Let’s build hope, dignity, and a brighter future, side by side.
            </p>
          </div>
          
          {/* Buttons stay bottom of text section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-4">
            <Link href="/about/how-we-work">
              <span className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-gray-100 transition text-center">
                Discover How We Work
              </span>
            </Link>
            <Link href="/contact">
              <span className="inline-block px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition text-center">
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
  );
};

export default CTACollaboration;
