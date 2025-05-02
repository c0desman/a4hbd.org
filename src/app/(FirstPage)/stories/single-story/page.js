"use client";

import { blogData, allCategories, allInitiatives } from "@/data/sampleBlog";
import Badge from "@/components/reusable/Badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogSinglePage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mt-10">{blogData.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Content and Sidebar */}
      <div className="max-w-screen-xl mx-auto p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        {/* Blog Content */}
        <div className="md:col-span-3">
        <div className="w-full max-w-4xl mx-auto mb-6">
            <Image
              src={blogData.imageUrl}
              alt={blogData.title}
              width={800}
              height={300}
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            {new Date(blogData.publishedAt).toDateString()}
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-sm font-semibold text-gray-800">Category:</span>
            <Badge variant="default" className="bg-indigo-100 text-indigo-800">
              {blogData.category}
            </Badge>

            <span className="text-sm font-semibold text-gray-800 ml-4">Initiative:</span>
            <Badge variant="default" className="bg-green-100 text-green-800">
              {blogData.initiative}
            </Badge>
          </div>

          <div
            className="prose max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogData.content }}
          />
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-1 bg-gray-50 p-4 rounded-xl shadow-sm space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-2 bg-primary px-1 py-2 text-white">Categories</h2>
            <ul className="space-y-1 text-gray-700">
              {allCategories.map((cat) => (
                <li key={cat} className="hover:text-blue-600 pl-2 font-semibold cursor-pointer">
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 bg-primary px-1 py-2 text-white">Initiatives</h2>
            <ul className="space-y-1 text-gray-700">
              {allInitiatives.map((init) => (
                <li key={init} className="hover:text-blue-600 pl-2 font-semibold cursor-pointer">
                  {init}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
