'use client';

import Image from 'next/image';

const HeroSection = () => {
  return (
    <section
      className="relative bg-[url('/images/hero/hero-bg.jpg')] bg-cover bg-center bg-no-repeat w-full h-[500px] md:h-[700px]"
    >
      <div className="max-w-screen-xl mx-auto px-4 relative pt-[100px] md:pt-[150px] pb-[50px] md:pb-[100px]">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Text Section */}
          <div className="max-w-[615px] mb-5">
            <p
              className="text-secondary font-bold mb-4 md:mb-5 animate-fadeInUp"
              style={{ animationDelay: '0.0s' }}
            >
              Charity Is priority
            </p>
            <h1
              className="text-white mb-4 md:mb-6 font-bold animate-fadeInUp"
              style={{ animationDelay: '0.1s' }}
            >
              Giving help To Those Who Need It.
            </h1>
            <p
              className="max-w-[780px] text-white/80 mb-4 md:mb-6 animate-fadeInUp"
              style={{ animationDelay: '0.2s' }}
            >
              Involves donating one's body after death for medical research, education, or anatomical dissection. Body donation plays a crucial role in advancing medical science
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="/donation"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 sm:px-8 sm:py-3 rounded-full animate-fadeInLeft"
                style={{ animationDelay: '0.4s' }}
              >
                Donate Now
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex gap-6 items-center justify-end">
            <div className="relative group hidden md:block">
              <Image
                src="/images/hero/hero-2.png"
                alt="Aid For Humanity"
                width={239}
                height={388}
                className="w-[239px] h-[388px] object-cover transition-transform duration-500 group-hover:-translate-y-2"
              />
            </div>
            <div className="relative group hidden md:block">
              <Image
                src="/images/hero/hero-3.png"
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
