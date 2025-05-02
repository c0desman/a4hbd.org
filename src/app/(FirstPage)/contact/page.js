'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiUser, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';
import { FaHouseFlag, FaBuildingColumns } from 'react-icons/fa6';
import { TbBuildingEstate } from 'react-icons/tb';
import Image from 'next/image';

const faqs = [
  {
    question: 'How can I apply for funding?',
    answer: 'You can apply by sending us an email with your proposal that aligns with our vision.',
  },
  {
    question: 'Do you work internationally?',
    answer: 'Yes, we collaborate with both national and international organizations.',
  },
  {
    question: 'Can I volunteer for your events?',
    answer: 'Absolutely! Send us a message via the contact form with your details.',
  },
  {
    question: 'How do you ensure transparency?',
    answer: 'We maintain transparent procedures and report regularly to stakeholders.',
  },
  {
    question: 'Can I suggest a project or idea?',
    answer: 'We welcome suggestions. Share your ideas through our contact form or email.',
  },
];

export default function ContactPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="text-gray-800 overflow-x-hidden">
      {/* Section 1: Contact Info + Form */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white py-15 pt-40 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-12 w-full items-center justify-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-2/3 w-full space-y-8"
          >
            <h1 className="live-gradient text-4xl font-bold">Contact Us</h1>
            <p className="leading-none text-sm">Email, Call or send us a message via the form so that we can contact you.</p>
            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                    <FiMail className="text-white" />
                    <Link href="mailto:chairman@a4hbd.org" className="hover:underline">
                    chairman@a4hbd.org
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <FiPhone className="text-white" />
                    <Link href="tel:0123456789" className="hover:underline">
                    0123456789
                    </Link>
                </div>
            </div>

            <div className='hidden md:block'>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="text-lg font-semibold mb-1">Need Fund</h4>
                <p className="text-gray-200">We fund to those whose works align with our vision.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">Collaborate</h4>
                <p className="text-gray-200">We seek national and international partnerships to fight poverty.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">Suggestion</h4>
                <p className="text-gray-200">Send your suggestions to help us improve and serve better.</p>
              </div>
            </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3 w-full bg-white p-6 rounded-xl shadow space-y-4 text-black text-sm hidden md:block"
          >
            <h3 className="text-xl font-bold mb-1">Get In Touch</h3>
            <p className="text-xs text-gray-500 mb-8">We’ll reach out to you shortly.</p>

            <div className="relative">
              <FiUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Name"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>

            <div className="relative">
              <FiMail className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="text-base w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>

            <div className="relative">
              <FiPhone className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="tel"
                placeholder="Phone"
                className="text-base w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>

            <div className="relative">
              <FiMessageSquare className="absolute top-3.5 left-3 text-gray-400" />
              <textarea
                rows="4"
                placeholder="Message"
                className="text-base w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none resize-none"
              ></textarea>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-xl text-sm transition">
              <p>Submit</p>
            </button>
          </motion.form>
        </div>
      </section>

      {/* Section 2: Map + Address */}
      <section className="py-20 px-4">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 w-full items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full overflow-hidden rounded-lg"
          >
            <iframe
              title="Aid For Humanity Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d614.162001441458!2d90.40520185451454!3d23.860069250964575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c50053e60b95%3A0xb9b743d393edad5f!2sAid%20For%20Humanity!5e1!3m2!1sen!2sbd!4v1746165144669!5m2!1sen!2sbd"
              className="w-full h-[500px]"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5">
                <span className="uppercase font-bold text-primary inline-block">
                Our Location
                </span>
                <h2 className="font-bold mb-6">
                Connecting <span className='text-gradient'>Near and Far</span>
                </h2>
                <p className="mb-3 text-gray-600">
                  Every hand we hold, every life we touch, brings us closer to a world filled with hope. 
                  Through support, education, and care, we light the way for those who deserve a chance.
                </p>
              </div>
              <hr className='text-gray-300 mb-5' />
              <div className="flex items-center gap-2 pb-3">
                    <FaHouseFlag className="text-primary" />
                    <p>
                    House 6, Road 2/B, Sector-4,
                    </p>
                </div>
                <div className="flex items-center gap-2 pb-3">
                    <TbBuildingEstate className="text-primary" />
                    <p>
                    Uttara, Dhaka-1207
                    </p>
                </div>
                <div className="flex items-center gap-2 pb-3">
                    <FaBuildingColumns className="text-primary" />
                    <p>
                    Bangladesh
                    </p>
                </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: FAQ */}
      <section className="bg-gray-100 py-20 px-4 bg-[url(/images/gallery/objectives-bg.jpg)] bg-cover bg-top bg-no-repeat">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 w-full">
          {/* Left - FAQ intro */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5">
                <span className="uppercase font-bold text-primary inline-block">
                FAQ
                </span>
                <h2 className="font-bold mb-6">
                Got <span className='text-gradient'>Questions</span>?
                </h2>
                <p className="mb-3 text-gray-600">
                  If you have any question? We’re here to help! Send us a message via the contact form or email us directly.
                  <br /> We’ll get back to you as soon as possible.
                </p>
              </div>
          </motion.div>

          {/* Right - FAQ List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="divide-y divide-gray-300"
          >
            {faqs.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left py-3 font-medium focus:outline-none"
                >
                  <span className='text-base'>{item.question}</span>
                  <span className="ml-2">
                    {activeIndex === index ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="pb-3 text-base text-gray-600">{item.answer}</div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 4: CTA Collaboration */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white py-14 overflow-x-hidden">
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
              <span className="inline-block px-4 py-3 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-gray-100 transition text-center">
                Discover How We Work
              </span>
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 overflow-hidden rounded-xl">
          <Image
            src="/images/gallery/collaboration-banner.jpg"
            alt="Collaborate with us"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
    </main>
  );
}