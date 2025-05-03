'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CTACollaboration from '@/components/reusable/CTACollaboration';

// ... (keep all the constant declarations same as original)
// 15 Sample blog posts
const projects = [
    {
      id: 1,
      title: 'Empowering Local Communities Through Education',
      description: 'Supporting education in remote areas.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['School Access', 'Teacher Training'],
      date: 'April 15, 2025',
      slug: 'projects/project-single',
    },
    {
      id: 2,
      title: 'Fighting Hunger with Sustainable Agriculture',
      description: 'Promoting local farming practices.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Local Farming', 'Sustainability'],
      date: 'March 28, 2025',
      slug: 'projects/project-single',
    },
    {
      id: 3,
      title: 'Healthcare Access for All',
      description: 'Basic medical aid to marginalized populations.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Mobile Clinics', 'Free Checkups'],
      date: 'March 10, 2025',
      slug: 'projects/project-single',
    },
    {
      id: 4,
      title: 'Nutrition for Children in Need',
      description: 'Our fight against malnutrition.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Nutrition Programs', 'Child Care'],
      date: 'Feb 12, 2025',
      slug: 'projects/project-single',
    },
    {
      id: 5,
      title: 'Greener Villages Project',
      description: 'Sustainability through tree planting.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Tree Planting', 'Awareness'],
      date: 'Jan 20, 2025',
      slug: 'projects/project-single',
    },
    {
      id: 6,
      title: 'Scholarships for Girls',
      description: 'Breaking barriers with education.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Scholarships', 'Girl Empowerment'],
      date: 'Jan 5, 2025',
      slug: 'projects/project-single',
    },
    {
      id: 7,
      title: 'Mobile Medical Vans',
      description: 'Taking healthcare on the road.',
      image: '/images/blog/healthcare.jpg',
      initiatives: ['Mobile Clinics', 'Rural Access'],
      date: 'Dec 25, 2024',
      slug: 'projects/project-single',
    },
    {
      id: 8,
      title: 'Organic Farming Revolution',
      description: 'Helping farmers go organic.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Organic Training', 'Sustainability'],
      date: 'Dec 10, 2024',
      slug: 'projects/project-single',
    },
    {
      id: 9,
      title: 'Bridging the Digital Divide',
      description: 'Tech access in schools.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Tech in Schools', 'Training'],
      date: 'Nov 18, 2024',
      slug: 'projects/project-single',
    },
    {
      id: 10,
      title: 'Emergency Healthcare Camps',
      description: 'Quick response medical aid.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Rapid Response', 'Medical Camps'],
      date: 'Nov 1, 2024',
      slug: 'projects/project-single',
    },
    {
      id: 11,
      title: 'Green Schools Movement',
      description: 'Eco-education initiatives.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Eco Learning', 'Gardening'],
      date: 'Oct 10, 2024',
      slug: 'projects/project-single',
    },
    {
      id: 12,
      title: 'Local Seed Banks',
      description: 'Preserving traditional seeds.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Seed Saving', 'Biodiversity'],
      date: 'Oct 1, 2024',
      slug: 'projects/project-single',
    },
    {
      id: 13,
      title: 'Village Clean Water Access',
      description: 'Clean water for every home.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Water Purifiers', 'Well Projects'],
      date: 'Sep 12, 2024',
      slug: 'projects/project-single',
    },
    {
      id: 14,
      title: 'Free Textbooks Drive',
      description: 'Supplying books to underprivileged kids.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Book Donation', 'Access to Education'],
      date: 'Aug 21, 2024',
      slug: 'projects/project-single',
    },
    {
      id: 15,
      title: 'Women-Led Farming Groups',
      description: 'Empowering women farmers.',
      image: '/images/gallery/qurbani-banner.png',
      initiatives: ['Women Empowerment', 'Training'],
      date: 'Aug 5, 2024',
      slug: 'projects/project-single',
    },
  ];
  

export default function Projects() {
  const [initiativeFilter, setInitiativeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);

  // Add these after the projects array
const allInitiatives = ['All Initiatives', ...new Set(projects.flatMap(p => p.initiatives))];

  const filteredPosts = projects.filter(post => {
    const initiativeMatch = initiativeFilter === 'All' || post.initiatives.includes(initiativeFilter);
    return initiativeMatch;
  });

  const POSTS_PER_PAGE = 6; // Number of posts per page

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <main className="text-gray-800 pt-20">
      {/* Hero Section - Keep same as original */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-4">Our <span className='live-gradient'>Projects</span> & <span className='live-gradient'>Initiatives</span></h1>
          <p className="text-lg text-white/90">
            Dive into our impactful projects and initiatives that are making a difference in communities around the bangladesh.
          </p>
        </motion.div>
      </section>
      {/* Filters Section */}
      <section className="bg-white py-8 px-4 max-w-screen-xl mx-auto mt-15">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 justify-between items-center"
        >
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              value={initiativeFilter}
              onChange={(e) => {
                setInitiativeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="cursor-pointer px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allInitiatives.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsGridView(true)}
              className={`cursor-pointer p-2 rounded-lg ${isGridView ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setIsGridView(false)}
              className={`cursor-pointer p-2 rounded-lg ${!isGridView ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-10 px-4 mb-15 bg-gray-100">
        <motion.div
          layout
          className={`max-w-screen-xl mx-auto ${
            isGridView 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'flex flex-col gap-6'
          }`}
        >
          {paginatedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-xl overflow-hidden border border-gray-300 hover:border-gray-500 transition ${
                !isGridView ? 'flex flex-col sm:flex-row' : ''
              }`}
            >
              <Link href={`/${post.slug}`} className={`${!isGridView ? 'flex-1 flex' : ''}`}>
                <div className={`relative ${isGridView ? 'w-full h-48' : 'sm:w-48 sm:h-48 w-full h-40'}`}>
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className={`p-4 space-y-2 ${!isGridView ? 'flex-1' : ''}`}>
                  <div className="inline-block text-xs font-semibold px-2 py-1 rounded 'bg-gray-300 text-gray-800">
                    {post.category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600">{post.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.initiatives.map((tag, i) => (
                      <span key={i} className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">{post.date}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination - Keep same as original */}
        {totalPages > 1 && (
          <div className="mt-10 px-4 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 font-bold rounded text-black hover:text-white hover:cursor-pointer bg-amber-300 hover:bg-sky-400"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-8 py-2 font-bold bg-primary rounded hover:bg-sky-600 text-white hover:cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </section>
      <CTACollaboration />
    </main>
  );
}