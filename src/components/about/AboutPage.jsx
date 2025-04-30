'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

export default function AboutPage() {
  const sliderRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sliderRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.08]) // progressive scaling

  return (
    <main className="bg-gradient-to-br from-black via-zinc-900 to-[#1a1a1a] text-white">
      {/* Hero Section */}
      <section className="max-w-screen-xl mx-auto px-4 pt-36 pb-24 text-center mt-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Changing lives through <br />
          <span className="text-gradient">vision & initiative</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
          A little description about your mission and values that resonates with your audience.
        </p>
      </section>

      {/* Animated Slider Section */}
      <motion.section
        ref={sliderRef}
        style={{ scale }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="py-5"
      >
        <div className="max-w-screen-xl mx-auto">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="rounded-xl overflow-hidden"
          >
            {[1, 2, 3, 4].map((item) => (
              <SwiperSlide key={item}>
                <div className="bg-white text-black p-20 rounded-2xl shadow-2xl min-h-[500px] flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold">Slide {item} Title</h3>
                    <p className="mt-4 text-lg text-gray-700">Engaging description for slide {item} goes here.</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>
    </main>
  )
}
