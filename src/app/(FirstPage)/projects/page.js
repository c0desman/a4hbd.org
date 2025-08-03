'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CTACollaboration from '@/components/reusable/CTACollaboration';
import axios from 'axios';

export default function Projects() {
  const [initiativeFilter, setInitiativeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const [projects, setProjects] = useState([]);
  const [initiatives, setInitiatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [projectsRes, initiativesRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allprojects`),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allinitiative`)
        ]);

        setProjects(projectsRes.data.data || []);
        setInitiatives(initiativesRes.data.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare filter options
  const allInitiatives = ['All', ...initiatives.map(init => init.name)];

  // Filter projects based on selected initiative
  const filteredProjects = projects.filter(project => {
    if (initiativeFilter === 'All') return true;
    return project.initiatives?.some(init => init.name === initiativeFilter);
  });

  const POSTS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredProjects.length / POSTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (isLoading) {
    return (
      <main className="text-gray-800 pt-20">
        <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-24 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Projects & Initiatives</h1>
        </section>
        <div className="max-w-screen-xl mx-auto py-20 text-center">
          Loading projects...
        </div>
      </main>
    );
  }

  return (
    <main className="text-gray-800 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-24 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-4">Our <span className='live-gradient'>Projects & Initiatives</span></h1>
          <p className="text-lg text-white/90">
            Dive into our impactful projects and initiatives that are making a difference in communities around Bangladesh.
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
              {allInitiatives.map(init => (
                <option key={init} value={init}>{init}</option>
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

      {/* Projects Section */}
      <section className="py-10 px-4 mb-15 bg-gray-100">
        <motion.div
          layout
          className={`max-w-screen-xl mx-auto ${
            isGridView 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'flex flex-col gap-6'
          }`}
        >
          {paginatedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-white rounded-xl overflow-hidden border border-gray-300 hover:border-gray-500 transition ${
                isGridView ? 'h-[400px]' : 'flex flex-col sm:flex-row h-auto'
              }`}
            >
              <Link 
                href={`/projects/${project.id}`} 
                className={`${isGridView ? 'flex flex-col h-full' : 'flex flex-col sm:flex-row w-full'}`}
              >
                <div className={`relative ${isGridView ? 'w-full h-1/2' : 'sm:w-48 sm:h-48 w-full h-40'}`}>
                  {project.imagepath && (
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${project.imagepath.replace(/\\/g, "/")}`}
                      alt={project.title} 
                      fill
                      sizes={isGridView ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : "(max-width: 640px) 100vw, 200px"}
                      className="object-cover w-full h-full"
                      priority={index < 3} // Only prioritize first 3 images for LCP
                    />
                  )}
                </div>
                <div className={`p-4 space-y-2 ${isGridView ? 'h-1/2 flex flex-col' : 'flex-1'}`}>
                  <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {project.description.replace(/<[^>]*>?/gm, '')}
                  </p>
                  {initiatives.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {initiatives.map((initiative) => (
                        <span key={initiative.id} className="text-xs bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded">
                          {initiative.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-auto pt-2">
                    {new Date(project.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
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