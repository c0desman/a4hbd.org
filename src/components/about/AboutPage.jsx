'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import 'swiper/css'
import AboutCard from './AboutCard'

const sliderData = [
  {
    type: 'video',
    src: '/videos/slides/volunteer-in-action.mp4',
    footer: 'Volunteer in action',
  },
  {
    type: 'video',
    src: '/videos/slides/Community-impact.mp4',
    footer: 'Community Impact Story',
  },
  {
    type: 'video',
    src: '/videos/slides/orphan-support.mp4',
    footer: 'Orphan Support Program',
  },
  {
    type: 'image',
    src: '/images/gallery/food-pack-project.JPG',
    footer: 'Food Distribution Drive',
  },
]

export default function AboutPage() {
  const sliderRef = useRef(null)
  const swiperRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sliderRef,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.2])

  const [progress, setProgress] = useState(0)
  const delay = 10000 // 10 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 100 / (delay / 100)))
    }, 100)

    const swiper = swiperRef.current
    if (swiper) {
      swiper.on('slideChange', () => setProgress(0))
    }

    return () => {
      clearInterval(interval)
      if (swiper) swiper.off('slideChange', () => setProgress(0))
    }
  }, [])

  return (
    <main className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-screen-xl mx-auto px-4 pt-36 lg:pt-44 pb-5 lg:pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Changing lives through <br />
          <span className="live-gradient">vision & initiative</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-300 max-w-3xl mx-auto font-bold">
          At Aid For Humanity, we empower vulnerable communities through food,
          education, and medical aid. Join us in creating lasting change and a
          more compassionate future.
        </p>
      </section>

      {/* Slider Section */}
      <div className="overflow-hidden px-4">
        <motion.section
          ref={sliderRef}
          style={{ scale, transformOrigin: 'center' }}
          transition={{ duration: 0.5 }}
          className="py-16"
        >
          <div className="max-w-screen-xl mx-auto">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay, disableOnInteraction: false }}
              modules={[Autoplay]}
              className="rounded-xl overflow-hidden"
            >
              {sliderData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="rounded-2xl shadow-2xl overflow-hidden bg-white text-black relative">
                    {/* Media */}
                    {item.type === 'image' ? (
                      <Image
                        src={item.src}
                        alt={`Slide ${index + 1}`}
                        width={1200}
                        height={675}
                        className="w-full h-auto object-cover aspect-video lg:h-[600px] lg:aspect-auto"
                      />
                    ) : (
                      <video
                        src={item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-auto object-cover aspect-video lg:h-[600px] lg:aspect-auto"
                      />
                    )}

                    {/* Caption + Arrows */}
                    <div className="flex justify-between items-center bg-blue-600 text-white py-4 px-4 relative">
                      <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="cursor-pointer hover:text-gray-200 transition"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <div className="text-lg font-semibold text-center flex-1">
                        {item.footer}
                      </div>
                      <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="cursor-pointer hover:text-gray-200 transition"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>

                      {/* Timeline Bar */}
                      <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
                        <div
                          className="h-1 bg-white transition-all duration-100 linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.section>
      </div>

      {/* A4H: At a Glance */}
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-white">
        <h1 className="font-bold mb-8">A4H: At a Glance</h1>
        <p className="text-gray-200 mx-auto text-justify mb-6">
          Aid For Humanity is a non-profit organization based in Cox’s Bazar,
          Bangladesh, dedicated to uplifting vulnerable communities through
          compassion and faith. We are registered organization under the NGO Affairs Bearu of Bangladesh. Registration Number is 2217. Our mission is to improve lives, restore
          dignity, and bring hope to those affected by poverty, displacement,
          and disaster.
          <br />
          <br />
          We focus on education, healthcare, clean water, orphan care, food
          security, and economic development—implementing sustainable projects
          that empower individuals and foster lasting change. We believe that
          true progress starts with access to basic needs, knowledge, and moral
          values.
          <br />
          <br />
          Led by passionate volunteers, educators, and philanthropists, Aid For
          Humanity remains non-governmental and non-political. We are committed
          to transparency, integrity, and impact—working together to build a
          more just and compassionate future where no one is left behind.
        </p>
      </div>

      {/* About Us Card */}
      <AboutCard />
    </main>
  )
}
