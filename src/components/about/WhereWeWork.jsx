'use client'

import Image from 'next/image'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

const districtData = [
  {
    region: 'Northern East',
    districts: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Netrakona', 'Kishorganj'],
  },
  {
    region: 'North West',
    districts: ['Panchagarh', 'Thakurgaon', 'Dinajpur', 'Nilphamari', 'Lalmonirhat', 'Rangpur', 'Kurigram', 'Gaibandha', 'Bogura'],
  },
  {
    region: 'Central',
    districts: ['Dhaka', 'Jamalpur', 'Sherpur', 'Mymensingh', 'Gazipur', 'Narshingdi', 'Tangail', 'Pabna'],
  },
  {
    region: 'South East',
    districts: ['Cumilla', 'Chandpur', 'Noakhali', 'Feni', 'Chittagong', 'Bandarban', 'Cox\'s Bazar'],
  },
]

const offices = ['Dhaka', 'Cox\'s Bazar', 'Rangpur', 'Thakurgaon']

export default function WhereWeWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const mapControls = useAnimation()
  const listControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      mapControls.start({ x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } })
      listControls.start({ x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } })
    } else {
      mapControls.start({ x: -100, opacity: 0, transition: { duration: 0.4 } })
      listControls.start({ x: 100, opacity: 0, transition: { duration: 0.4 } })
    }
  }, [isInView, mapControls, listControls])

  return (
    <section ref={ref} className="w-full py-16 bg-gray-50" id="where-we-work">
      <div className="max-w-screen-xl mx-auto px-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Where We Work</h2>
          <p className="text-lg mb-6">
            We operate in most regions of Bangladesh, most specifically in the norther regions.
            Aid For Humanity covers almost all the districts in Bangladesh except the south western regions and implementing various development projects. We want to expand our reach to the southern regions as well.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Map Animation */}
          <motion.div
            className="w-full h-auto rounded-lg overflow-hidden shadow"
            initial={{ x: -100, opacity: 0 }}
            animate={mapControls}
          >
            <Image
              src="/images/gallery/bd-maps.png"
              alt="Map of Bangladesh"
              width={450}
              height={200}
              className="h-auto object-cover"
            />
          </motion.div>

          {/* District List Animation */}
          <motion.div
            className="space-y-6"
            initial={{ x: 100, opacity: 0 }}
            animate={listControls}
          >
            {districtData.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold mb-2">{group.region}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.districts.map((district, i) => {
                    const isOffice = offices.includes(district)
                    return (
                      <motion.li
                        key={i}
                        whileHover={{ scale: 1.05, boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-200 ${
                          isOffice
                            ? 'bg-blue-100 text-blue-800 font-semibold border border-blue-300'
                            : 'bg-white text-gray-700 border border-gray-300'
                        }`}
                      >
                        {district}
                        {isOffice && <span className="ml-2 text-xs font-medium">(Office)</span>}
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
