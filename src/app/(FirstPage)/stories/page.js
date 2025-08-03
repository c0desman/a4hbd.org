'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import CTACollaboration from '@/components/reusable/CTACollaboration';
import axios from 'axios';

export default function BlogPage() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState({});
  const [categoryDetails, setCategoryDetails] = useState({});

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [storiesRes, categoriesRes, projectsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stories`, {
            params: { page: currentPage, limit: 10 }
          }),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allcatagories`),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allprojects`)
        ]);

        const storiesData = storiesRes.data.stories || [];
        setStories(storiesData);
        setCategories(categoriesRes.data.data || []);
        setProjects(projectsRes.data.data || []);

        // Fetch details for each unique project and category
        const projectPromises = storiesData.map(story => 
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${story.projectId}`)
            .then(res => ({ id: story.projectId, data: res.data?.project || res.data }))
            .catch(() => ({ id: story.projectId, data: null }))
        );

        const categoryPromises = storiesData.map(story => 
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/catagory/${story.catagoryId}`)
            .then(res => ({ id: story.catagoryId, data: res.data?.data || res.data }))
            .catch(() => ({ id: story.catagoryId, data: null }))
        );

        const [projectResults, categoryResults] = await Promise.all([
          Promise.all(projectPromises),
          Promise.all(categoryPromises)
        ]);

        const projectMap = {};
        projectResults.forEach(({ id, data }) => {
          if (data) projectMap[id] = data;
        });

        const categoryMap = {};
        categoryResults.forEach(({ id, data }) => {
          if (data) categoryMap[id] = data;
        });

        setProjectDetails(projectMap);
        setCategoryDetails(categoryMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Prepare filter options
  const allCategories = ['All', ...categories.map(cat => cat.name)];
  const allProjects = ['All', ...projects.map(proj => proj.title)];

  // Filter stories based on selected filters
  const filteredStories = stories.filter(story => {
    const categoryMatch = categoryFilter === 'All' || 
      (categoryDetails[story.catagoryId]?.name === categoryFilter);
    const projectMatch = projectFilter === 'All' || 
      (projectDetails[story.projectId]?.title === projectFilter);
    return categoryMatch && projectMatch;
  });

  const POSTS_PER_PAGE = 10;
  const totalPages = stories.totalPages || 1;

  if (isLoading) {
    return (
      <main className="text-gray-800 pt-20">
        <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-24 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Updates & Stories</h1>
        </section>
        <div className="max-w-screen-xl mx-auto py-20 text-center">
          Loading stories...
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
          <h1 className="text-4xl font-bold mb-4">Our <span className='live-gradient'>Updates</span> & <span className='live-gradient'>Stories</span></h1>
          <p className="text-lg text-white/90">
            Dive into stories of hope, transformation, and humanity. Explore our latest updates, initiatives, and the impact we are making together.
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
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="cursor-pointer px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={projectFilter}
              onChange={(e) => {
                setProjectFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="cursor-pointer px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {allProjects.map(project => (
                <option key={project} value={project}>{project}</option>
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

      {/* Stories Section */}
      <section className="py-10 px-4 mb-15 bg-gray-100">
        <motion.div
          layout
          className={`max-w-screen-xl mx-auto ${
            isGridView 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-6'
          }`}
        >
          {filteredStories.map((story) => {
            const project = projectDetails[story.projectId];
            const category = categoryDetails[story.catagoryId];
            
            return (
              <motion.div
                key={story.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <Link href={`/stories/${story.id}`} className="block h-full">
                  {/* 1. Photo */}
                  <div className="relative w-full h-48">
                    {story.imagepath && (
                      <Image 
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${story.imagepath.replace(/\\/g, "/")}`}
                        alt={story.title} 
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    {/* 2. Project name tag */}
                    {project?.title && (
                      <span className="inline-block text-xs bg-blue-600 text-white font-medium px-2 py-1 rounded-full">
                        {project.title}
                      </span>
                    )}

                    {/* 3. Title of the story */}
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                      {story.title}
                    </h3>

                    {/* 4. 1 line of description */}
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {story.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}...
                    </p>

                    {/* Bottom section */}
                    <div className="flex justify-between items-center pt-2">
                      {/* 5. Category tag */}
                      {category?.name && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                          {category.name}
                        </span>
                      )}

                      {/* 6. Publish Date (using updatedAt) */}
                      <span className="text-xs text-gray-500">
                        {new Date(story.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
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