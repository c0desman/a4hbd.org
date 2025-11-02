'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Keyboard, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const slides = [
  { id: 1, img: '/images/hero/slide-1.webp', ctaHref: '/projects/4' },
  { id: 2, img: '/images/hero/slide-2.webp', ctaHref: '/projects/19' },
  { id: 3, img: '/images/hero/slide-3.webp', ctaHref: '/projects/2' },
  { id: 4, img: '/images/hero/slide-4.webp', ctaHref: '/projects/5' },
  { id: 5, img: '/images/hero/slide-5.webp', ctaHref: '/projects/6' },
  { id: 6, img: '/images/hero/slide-6.webp', ctaHref: '/projects/2' },
  { id: 7, img: '/images/hero/slide-7.webp', ctaHref: '/projects/4' },
  { id: 8, img: '/images/hero/slide-8.webp', ctaHref: '/projects/1' },
  { id: 9, img: '/images/hero/slide-9.webp', ctaHref: '/projects/6' },
  { id: 10, img: '/images/hero/slide-10.webp', ctaHref: '/projects/5' },
  { id: 11, img: '/images/hero/slide-11.webp', ctaHref: '/projects/8' },
];

export default function HeroCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative w-full aspect-[1790/750] overflow-hidden" style={{ marginTop: 'var(--header-height)' }}>
      {/* Prev/Next Buttons */}
      <button
        ref={prevRef}
        aria-label="Previous slide"
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      <button
        ref={nextRef}
        aria-label="Next slide"
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Autoplay, Keyboard, A11y]}
        loop
        keyboard
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="w-full h-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="relative w-full aspect-[1790/901]">
              <Link href={s.ctaHref} aria-label="Project link">
                <Image
                  src={s.img}
                  alt="Aid For Humanity Project"
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain object-center bg-black"
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* Hide pagination completely */
        .swiper-pagination,
        .swiper-pagination-bullets,
        .swiper-pagination-bullet {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
