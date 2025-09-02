'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CTACollaboration from '@/components/reusable/CTACollaboration';

export default function ProjectTypeSingle({ params }) {
  const { id } = params;
  const [projectType, setProjectType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupImgIndex, setPopupImgIndex] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjectType = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projecttype/${id}`);
        setProjectType(response.data.projectType);
      } catch (err) {
        console.error('Error fetching project type:', err);
        setError('Failed to load project type');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectType();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading project type details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl">{error}</p>
          <button 
            onClick={() => router.push('/projects')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  if (!projectType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Project type not found</p>
          <button 
            onClick={() => router.push('/projects')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const renderImage = (src, alt, className = "", width, height) => (
    <div className={`relative ${width && height ? '' : 'w-full h-full'}`}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${src.replace(/\\/g, "/")}`}
        alt={alt}
        {...(width && height ? { width, height } : { fill: true })}
        className={`object-cover ${className}`}
        sizes={width && height ? undefined : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      />
    </div>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white overflow-x-hidden">
        <div className="max-w-screen-xl mx-auto px-4 pt-36 lg:pt-44 pb-5 mb-10 lg:pb-8 grid md:grid-cols-2 items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {projectType.projects?.[0] && (
              <div className="flex items-center gap-2 mb-4">
                {projectType.projects[0].imagepath && (
                  <div className="relative w-10 h-10">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${projectType.projects[0].imagepath.replace(/\\/g, "/")}`}
                      alt={projectType.projects[0].title}
                      fill
                      className="rounded-full object-cover"
                      sizes="40px"
                    />
                  </div>
                )}
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {projectType.projects[0].title}
                </span>
              </div>
            )}
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {projectType.title}
            </h1>
            <p className="text-lg max-w-xl">
              {projectType.shortdescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {projectType.seo?.imagepath && (
              renderImage(
                projectType.seo.imagepath,
                projectType.title,
                "rounded-xl w-full",
                800,
                450
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Long Description Section */}
      {projectType.longdescription && (
        <section className="overflow-x-hidden py-12 bg-white">
          <div className="text-lg max-w-screen-xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: projectType.longdescription.replace(/\r\n/g, '<br/>') }}
            />
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {projectType.images?.length > 0 && (
        <section className="overflow-x-hidden bg-gray-100 relative py-12">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projectType.images.map((img, i) => (
                <motion.div
                  key={img.id || i}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  onClick={() => setPopupImgIndex(i)}
                  className="cursor-pointer overflow-hidden rounded-md aspect-[4/3] relative"
                >
                  {renderImage(
                    img.imagepath,
                    img.alt || img.title || `Gallery Image ${i}`,
                    "object-cover rounded-md"
                  )}
                </motion.div>
              ))}
            </div>

            {popupImgIndex !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <button
                  onClick={() => setPopupImgIndex(null)}
                  className="absolute top-4 right-6 text-white text-3xl hover:text-red-400 cursor-pointer transition"
                >
                  &times;
                </button>

                <button
                  onClick={() =>
                    setPopupImgIndex((prev) => (prev > 0 ? prev - 1 : prev))
                  }
                  className="absolute left-4 text-white text-4xl hover:text-gray-300 cursor-pointer transition"
                >
                  &#10094;
                </button>

                <div className="max-w-4xl w-full px-4">
                  {renderImage(
                    projectType.images[popupImgIndex].imagepath,
                    projectType.images[popupImgIndex].alt || `Gallery Image ${popupImgIndex}`,
                    "rounded-lg w-full h-auto object-contain max-h-[90vh]",
                    1200,
                    800
                  )}
                </div>

                <button
                  onClick={() =>
                    setPopupImgIndex((prev) =>
                      prev < projectType.images.length - 1 ? prev + 1 : prev
                    )
                  }
                  className="absolute right-4 text-white text-4xl hover:text-gray-300 cursor-pointer transition"
                >
                  &#10095;
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Video Gallery */}
      {projectType.videos?.length > 0 && (
        <section className="overflow-x-hidden bg-white py-12">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Video Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {projectType.videos.map((video, i) => (
                <motion.div
                  key={video.id || i}
                  whileHover={{ scale: 1.02 }}
                  className="aspect-video overflow-hidden rounded-xl relative cursor-pointer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  onClick={() => setCurrentVideo(video)}
                >
                  {video.videourl?.includes('youtube.com') ? (
                    <iframe
                      src={video.videourl.replace('watch?v=', 'embed/')}
                      title={video.title || `Video ${i}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="bg-black w-full h-full flex items-center justify-center">
                      <span className="text-white">Video Preview</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Popup */}
      {currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={() => setCurrentVideo(null)}
            className="absolute top-4 right-6 text-white text-3xl hover:text-red-400 cursor-pointer transition"
          >
            &times;
          </button>
          <div className="max-w-4xl w-full px-4 aspect-video">
            {currentVideo.videourl?.includes('youtube.com') ? (
              <iframe
                src={currentVideo.videourl.replace('watch?v=', 'embed/')}
                title={currentVideo.title || "Video"}
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls className="w-full h-full rounded-xl">
                <source src={currentVideo.videourl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}

      <CTACollaboration />
    </>
  );
}