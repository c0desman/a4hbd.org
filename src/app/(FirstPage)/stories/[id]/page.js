"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StorySinglePage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [storyRes, categoriesRes, projectsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/story/${id}`),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allcatagories`),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allprojects`)
        ]);

        setStory(storyRes.data.story);
        setCategories(categoriesRes.data.data || []);
        setProjects(projectsRes.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Link href="/stories" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Story not found</p>
          <Link href="/stories" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-24 px-4 text-center relative pt-30">
        <div className="max-w-screen-xl mx-auto">
          <Link
            href="/stories"
            className="text-white hover:underline flex items-center mb-4 px-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Stories
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mt-10">{story.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Content and Sidebar */}
      <div className="max-w-screen-xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        {/* Blog Content */}
        <div className="md:col-span-3">
          {story.imagepath && (
            <div className="w-full max-w-4xl mx-auto mb-6">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${story.imagepath.replace(/\\/g, "/")}`}
                alt={story.title}
                width={800}
                height={450}
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </div>
          )}

          {/* Category and Project Tags */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {story.catagory && (
              <div className="flex items-center gap-2">
                {story.catagory.imagepath && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${story.catagory.imagepath.replace(/\\/g, "/")}`}
                      alt={story.catagory.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <span className="text-sm font-semibold text-gray-600">Category</span>
                  <div className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                    {story.catagory.name}
                  </div>
                </div>
              </div>
            )}

            {story.project && (
              <div className="flex items-center gap-2">
                {story.project.imagepath && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${story.project.imagepath.replace(/\\/g, "/")}`}
                      alt={story.project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <span className="text-sm font-semibold text-gray-600">Project</span>
                  <div className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {story.project.title}
                  </div>
                </div>
              </div>
            )}

            <div className="text-gray-600 text-sm font-semibold">
              Date: {new Date(story.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <div
            className="prose max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-1 bg-gray-50 p-4 rounded-xl shadow-sm space-y-8">
          {/* Categories List */}
          <div>
            <h2 className="text-lg font-semibold mb-3 bg-primary px-3 py-2 text-white rounded">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                  {category.imagepath && (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${category.imagepath.replace(/\\/g, "/")}`}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <Link 
                    href={`/stories?category=${category.id}`}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects List */}
          <div>
            <h2 className="text-lg font-semibold mb-3 bg-primary px-3 py-2 text-white rounded">Projects</h2>
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
                  {project.imagepath && (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${project.imagepath.replace(/\\/g, "/")}`}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <Link 
                    href={`/stories?project=${project.id}`}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}