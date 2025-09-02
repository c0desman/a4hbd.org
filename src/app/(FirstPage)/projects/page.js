'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CTACollaboration from '@/components/reusable/CTACollaboration';
import axios from 'axios';

/**
 * Projects Page
 * - Fetches projects from backend (`/allprojects`).
 * - Displays in grid or list view with pagination.
 * - Cleaned up: no initiative filter, no keyword mapping, no extra initiative route.
 */
export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allprojects`);
        setProjects(res.data.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Helper: remove HTML tags and shorten text
  const cleanDescription = (html, maxLength = 80) => {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Pagination logic
  const POSTS_PER_PAGE = 15;
  const totalPages = Math.ceil(projects.length / POSTS_PER_PAGE);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  if (isLoading) {
    return (
      <main className="text-gray-800 pt-20">
        <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-24 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
        </section>
        <div className="max-w-screen-xl mx-auto py-20 text-center">
          <div className="animate-pulse text-lg text-gray-600">Loading projects...</div>
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
          <h1 className="text-3xl font-bold mb-4">
            Our <span className="live-gradient">Projects</span>
          </h1>
          <p className="text-lg text-white/90">
            Discover our impactful projects that are making a difference in communities across Bangladesh.
          </p>
        </motion.div>
      </section>

      {/* Projects Section (with view toggle merged) */}
      <section className="py-10 px-4 bg-gray-100">
        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end gap-2 mb-8 max-w-screen-xl mx-auto"
        >
          <button
            onClick={() => setIsGridView(true)}
            className={`cursor-pointer p-2 rounded-lg transition-colors ${
              isGridView ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Grid View"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`cursor-pointer p-2 rounded-lg transition-colors ${
              !isGridView ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="List View"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </motion.div>

        {/* Project Grid/List */}
        <motion.div
          layout
          className={`max-w-screen-xl mx-auto ${
            isGridView
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'flex flex-col gap-6'
          }`}
        >
          {paginatedProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No projects found.</p>
            </div>
          ) : (
            paginatedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 ${
                  isGridView ? 'h-[420px]' : 'flex flex-col sm:flex-row h-auto'
                }`}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className={`${isGridView ? 'flex flex-col h-full' : 'flex flex-col sm:flex-row w-full'} group`}
                >
                  {/* Project Image */}
                  <div className={`relative overflow-hidden ${isGridView ? 'w-full h-48' : 'sm:w-56 sm:h-48 w-full h-40'}`}>
                    {project.imagepath ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${project.imagepath.replace(/\\/g, "/")}`}
                        alt={project.title || 'Project Image'}
                        fill
                        sizes={isGridView ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : "(max-width: 640px) 100vw, 224px"}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        priority={index < 3}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className={`p-5 space-y-3 ${isGridView ? 'flex-1 flex flex-col' : 'flex-1'}`}>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {cleanDescription(project.description, 80)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 px-4 flex justify-center items-center gap-4"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 font-semibold rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-2 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500">
            Showing {paginatedProjects.length} of {projects.length} projects
          </p>
        </motion.div>
      </section>

      <CTACollaboration />
    </main>
  );
}
