'use client';

import Image from 'next/image';

const HeroSection = () => {
  return (
    <section
      className="relative bg-[url('/images/hero/hero-bg.jpg')] bg-cover bg-center bg-no-repeat w-full h-[550px] md:h-[750px]"
    >
      <div className="max-w-screen-xl mx-auto px-4 relative pt-[100px] md:pt-[150px] pb-[50px] md:pb-[100px]">
        <div className="grid md:grid-cols-2 gap-4 items-center">
          {/* Text Section */}
          <div className="max-w-[615px] my-5">
            <p
              className="text-secondary font-bold mb-2 md:mb-3 animate-fadeInUp"
              style={{ animationDelay: '0.0s' }}
            >
              #HOPE #HELP #HUMANITY
            </p>
            <h1
              className="text-white mb-2 md:mb-3 font-bold animate-fadeInUp"
              style={{ animationDelay: '0.1s' }}
            >
              Empowering Lives<br />Transforming Futures
            </h1>
            <p
              className="max-w-[780px] text-white/80 mb-6 md:mb-8 animate-fadeInUp leading-4 justify"
              style={{ animationDelay: '0.2s' }}
            >
              We stand for a world where no one is left
              behind. With faith and compassion, we
              empower orphans, widows, refugees and
              vulnerable communities through education,
              healthcare, water, food relief and livelihood support.
              Our mission is simple: Serve with integrity, uplift with
              compassion and create lasting change. Every project reflects
              the generosity of our supporters and the resilience of those
              we help.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="/donation"
                className="bg-secondary hover:bg-indigo-700 hover:text-white text-black font-bold px-5 py-2.5 sm:px-8 sm:py-3 rounded-full animate-fadeInLeft"
                style={{ animationDelay: '0.4s' }}
              >
                See Our Projects
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex gap-6 items-center justify-end">
            <div className="relative group hidden md:block">
              <Image
                src="/images/hero/hero-21.png"
                alt="Aid For Humanity"
                width={239}
                height={388}
                className="w-[239px] h-[388px] object-cover transition-transform duration-500 group-hover:-translate-y-2"
              />
            </div>
            <div className="relative group hidden md:block">
              <Image
                src="/images/hero/hero-31.png"
                alt="Checking Images"
                width={316}
                height={514}
                className="w-[316px] h-[514px] object-cover transition-transform duration-500 group-hover:-translate-y-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
