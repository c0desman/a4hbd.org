'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { sectionsData } from '@/app/(FirstPage)/about/data'

// Animation variants for fade-in effects
const fadeInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } } }
const fadeInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } } }

export default function MissionVisionSection() {
  return (
    <div className="w-full overflow-x-hidden">
      {sectionsData.map((section, index) => {
        const isFourth = index === 3
        const reverse = !isFourth && index % 2 === 1 // alternate for first 3 sections only
        return (
          <section
            key={index}
            className={`w-full py-16 ${isFourth ? 'text-black' : ''}`}
            style={isFourth && section.background ? { backgroundImage: `url(${section.background.src})`, backgroundSize: 'cover', backgroundPosition: 'center bottom' } : {}}
          >
            <div className="w-full max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
              {/* TEXT SIDE */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}
                variants={reverse ? fadeInRight : fadeInLeft}
                className={`space-y-4 ${isFourth ? 'order-1' : index === 0 || index === 2 ? 'md:order-1' : 'md:order-2'}`}
              >
                <h2 className="text-3xl md:text-4xl font-bold">{section.title}</h2>
                <p className="text-lg">{section.description}</p>
                {!isFourth && section.bulletpoints && (
                  <ul className="list-disc pl-5 space-y-2 pt-2 text-base leading-relaxed">
                    {section.bulletpoints.map((point, idx) => <li key={idx}>{point}</li>)}
                  </ul>
                )}
              </motion.div>

              {/* IMAGE or BULLETPOINT SIDE */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}
                variants={reverse ? fadeInLeft : fadeInRight}
                className={`${isFourth ? 'order-2' : index === 0 || index === 2 ? 'md:order-2' : 'md:order-1'}`}
              >
                {isFourth ? (
                  section.bulletpoints && (
                    <ul className="list-disc pl-5 space-y-2 pt-2 text-base leading-relaxed">
                      {section.bulletpoints.map((point, idx) => <li key={idx}>{point}</li>)}
                    </ul>
                  )
                ) : (
                  <Media media={section.media} />
                )}
              </motion.div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

// Function to render media (image or video)
function Media({ media }) {
  return media?.type === 'image' ? (
    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
      <Image src={media.src} alt={media.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
    </div>
  ) : media?.type === 'video' ? (
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
      <video src={media.src} controls className="w-full h-full object-cover rounded-xl" />
    </div>
  ) : null
}
