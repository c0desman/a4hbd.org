'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

const steps = [
  { step: 1, items: ['Site Selection'] },
  { step: 2, items: ['Concept Note', 'Project Proposal', 'Letter of Intent'] },
  { step: 3, items: ['Project Submission', 'Approval Letter'] },
  { step: 4, items: ['Operational Meeting', 'Employee Appointment', 'Division of Responsibility', 'Implementation Plan'] },
  { step: 5, items: ['Approval Letter Submission to Donor', 'Fund Transfer by Donor', 'Seeking Permission from Local Administration'] },
  { step: 6, items: ['Project Approval Submission for Fund Transaction', 'Forming a Purchase Committee'] },
  { step: 7, items: ['Budget Plan', 'Market Observation', 'Budget Verify & Work Order', 'Fund Withdrawal & Purchase'] },
  { step: 8, items: ['Project Visiting', 'Progress Report Submission', 'Completion Report Submission'] },
  { step: 9, items: ['Appoint a CA Firm for Financial Audit', 'VAT & TAX Payment', 'Seeking Local Administrative Certificate'] },
  { step: 10, items: ['Submission of Beneficiaries List', 'Submission of Local Administration Certificate', 'Submission of Financial Audit Report'] },
]

export default function ProjectImplementationRoadmap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [isInView, controls])

  const getVariant = (index) => ({
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: index * 0.1 },
    },
  })

  return (
    <section ref={ref} id="project-roadmap" className="w-full py-20 bg-[url(/images/gallery/objectives-bg.jpg)] bg-cover bg-top bg-no-repeat">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Project <span className='text-gradient'>Implementation</span> Roadmap
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {steps.map((step, index) => (
            <motion.div
                key={index}
                className="relative cursor-pointer bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:bg-blue-100 hover:shadow-lg"
                initial="hidden"
                animate={controls}
                variants={getVariant(index)}
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-bold shadow-lg">
                {step.step}
              </div>
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Step {step.step}</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-base md:text-lg leading-relaxed">
                {step.items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
