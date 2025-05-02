'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const timelineData = [
  { year: '2018', description: 'We launched platforms, expanded partnerships, and more.' },
  { year: '2019', description: 'Growth in outreach and successful collaborations.' },
  { year: '2020', description: 'Pandemic support, digital shift, and remote impact delivery.' },
  { year: '2021', description: 'Reinforced resilience, introduced new services.' },
  { year: '2022', description: 'Major milestones in team size and services.' },
  { year: '2023', description: 'Stability, UX improvements, and long-term partnerships.' },
  { year: '2024', description: 'Scaled globally. Collaborated with key partners.' },
  { year: '2025', description: 'Innovation, AI, and industry leadership in social impact.' },
]

export default function TimelineSection() {
  const sectionRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const [timelineInView, setTimelineInView] = useState(false)
  const [allowPageScroll, setAllowPageScroll] = useState(true)
  const [timelineScrollComplete, setTimelineScrollComplete] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(timelineData.length - 1) * 100}vw`])

  // Detect full intersection of the timeline section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setTimelineInView(entry.isIntersecting && entry.intersectionRatio === 1)
      },
      { threshold: 1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  // Monitor scroll progress to allow page scroll only after timeline fully scrolled
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const complete = progress >= 1
      const atStart = progress <= 0

      setTimelineScrollComplete(complete || atStart)
      setAllowPageScroll(complete || atStart)
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  // Lock/unlock scroll when inside timeline section
  useEffect(() => {
    const onWheel = (e) => {
      if (timelineInView && !allowPageScroll) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    const onTouchMove = (e) => {
      if (timelineInView && !allowPageScroll) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [timelineInView, allowPageScroll])

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-white">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Heading */}
        <div className="max-w-screen-xl mx-auto text-center px-4 mb-10">
          <span className="uppercase font-bold text-primary inline-block">Our Top Projects</span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-gradient">Since 2017 —</span>
            <br />
            we are changing lives
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative w-full overflow-hidden" ref={scrollContainerRef}>
          <motion.div
            style={{ x }}
            className="flex pl-4 sm:pl-8 md:pl-16 lg:pl-[calc((100vw-1280px)/2+1rem)] space-x-6 md:space-x-12"
          >
            {timelineData.map((item, index) => (
              <div
                key={index}
                className="min-w-[80vw] md:min-w-[40vw] lg:min-w-[30vw] flex justify-center relative"
              >
                <div className="relative flex flex-col items-center">
                  <div className="z-10 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-lg" />
                    <div className="w-180 h-1 bg-primary" />
                    <div className="w-1 h-6 bg-primary z-0" />
                  <div className="w-full flex justify-center">
                    <div className="transition duration-300 bg-[#0B98D5] text-white border-2 border-transparent rounded-lg p-4 w-72 text-center hover:bg-white hover:text-black hover:border-black shadow-lg">
                      <h3 className="text-xl font-bold">{item.year}</h3>
                      <p className="mt-2 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Closing Message */}
        <p className="text-gray-600 text-base max-w-screen-xl mx-auto text-center px-4 lg:mt-20 sm:mt-10 mt-6">
          We stand for a world where no one is left behind. With faith and compassion, we empower
          orphans, widows, refugees and vulnerable communities through education, healthcare, water,
          food relief and livelihood support. Our mission is simple:{' '}
          <span className="text-gradient">
            Serve with integrity, uplift with compassion and create lasting change
          </span>
          . Every project reflects the generosity of our supporters and the resilience of those we
          help.
        </p>
      </div>
    </section>
  )
}
