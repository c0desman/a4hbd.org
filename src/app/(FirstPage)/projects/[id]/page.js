'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import CTACollaboration from '@/components/reusable/CTACollaboration';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AchievementCard = ({ item }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [viewed, setViewed] = useState(false);

  if (inView && !viewed) setViewed(true);
  if (!inView && viewed) setViewed(false);

  return (
    <div ref={ref} className="group h-full flex flex-col">
      <div className="flex-1 relative rounded-2xl p-6 shadow-md transition-all duration-300 overflow-hidden cursor-pointer bg-white group-hover:bg-[#0B98D5] flex flex-col justify-between">
        <div className={`w-15 h-15 rounded-full flex justify-center items-center mx-auto mb-4 transition-all duration-300 bg-blue-100 text-primary group-hover:bg-white group-hover:text-primary`}>
          {item.icon && (
            <div className="relative w-10 h-10">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.icon.replace(/\\/g, "/")}`}
                alt={item.title}
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
          )}
        </div>

        <div className="relative text-center z-[1]">
          <strong className="block text-3xl font-extrabold text-primary group-hover:text-white mb-1">
            {inView ? (
              <CountUp
                start={0}
                end={item.number}
                duration={2}
                separator=","
                suffix={item.suffix}
                redraw={true}
              />
            ) : (
              '0'
            )}
          </strong>
          <p className="text-black group-hover:text-white font-medium">
            {item.title}
          </p>
          {item.text && (
            <p className="text-sm text-black/70 group-hover:text-white/70">
              {item.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProjectSingle({ params }) {
  // Proper params access with destructuring
  const { id } = params;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupImgIndex, setPopupImgIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentMedia, setCurrentMedia] = useState('image');
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}`);
        setProject(response.data.project);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (popupImgIndex === null || !project?.images) return;

      if (e.key === 'ArrowRight') {
        setPopupImgIndex(prev => (prev < project.images.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowLeft') {
        setPopupImgIndex(prev => (prev > 0 ? prev - 1 : prev));
      }
      if (e.key === 'Escape') {
        setPopupImgIndex(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [popupImgIndex, project?.images]);

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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Project not found</p>
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

  // Helper function for image rendering
  const renderImage = (src, alt, className = "", width, height) => (
    <div className={`relative ${width && height ? '' : 'w-full h-full'}`}>
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${src.replace(/\\/g, "/")}`}
        alt={alt}
        {...(width && height ? { width, height } : { fill: true })}
        className={`object-cover ${className}`}
        sizes={width && height ? undefined : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        priority={currentMedia === 'image'}
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
            {project.initiatives?.[0] && (
              <Link href={`/initiative/${project.initiatives[0].id}`}>
                <div className="flex items-center gap-2 mb-4">
                  {project.initiatives[0].imagepath && (
                    <div className="relative w-10 h-10">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${project.initiatives[0].imagepath.replace(/\\/g, "/")}`}
                        alt={project.initiatives[0].name}
                        fill
                        className="rounded-full object-cover"
                        sizes="40px"
                      />
                    </div>
                  )}
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {project.initiatives[0].name}
                  </span>
                </div>
              </Link>
            )}
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-lg max-w-xl">
              {project.description}
            </p>
            
            {project.cards?.length > 0 && (
              <div className="grid grid-cols-2 lg:pr-10 gap-4 text-sm mt-10 mb-10">
                {project.cards.map((card, index) => (
                  <AchievementCard 
                    key={card.id || index} 
                    item={{
                      ...card,
                      icon: card.icon,
                      iconBg: index % 2 === 0 ? 'bg-red-200' : 'bg-green-200'
                    }} 
                  />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex gap-2 mb-2">
              {project.imagepath && (
                <button
                  onClick={() => setCurrentMedia('image')}
                  className={`px-3 py-1 rounded transition-colors ${
                    currentMedia === 'image'
                      ? 'bg-white text-blue-500'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  Image
                </button>
              )}

              {project.videourl && project.videourl.toLowerCase() !== 'no' && ( // Only show if valid videourl
                <button
                  onClick={() => setCurrentMedia('video')}
                  className={`px-3 py-1 rounded transition-colors ${
                    currentMedia === 'video'
                      ? 'bg-white text-blue-500'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  Video
                </button>
              )}
            </div>
            
            {currentMedia === 'image' && project.imagepath ? (
              renderImage(project.imagepath, project.title, "rounded-xl w-full", 800, 450)
            ) : currentMedia === 'video' && project.videourl && project.videourl.toLowerCase() !== 'no' ? (
              <div className="aspect-video w-full">
                <iframe
                  src={project.videourl}
                  title={project.title}
                  className="w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null}
          </motion.div>
        </div>
      </section>

      {/* Importance Section */}
      {project.importance && (
        <section
          className="overflow-x-hidden bg-cover bg-bottom-center py-12"
          style={{ backgroundImage: "url(/images/gallery/objectives-bg.jpg)" }}
        >
          <div className="max-w-screen-xl px-4 mx-auto pt-10 lg:pt-15 pb-5 lg:pb-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-black font-bold mb-4"
            >
              Importance of the Project
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl font-medium text-black text-justify space-y-2"
              dangerouslySetInnerHTML={{ __html: project.importance }}
            />
          </div>
        </section>
      )}

      {/* What We Do Section */}
      {project.whatwedo && (
        <section className="overflow-x-hidden">
          <div className="max-w-screen-xl mx-auto px-4 pt-10 lg:pt-15 pb-5 lg:pb-8 grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">
                What We Do
              </h2>
              <div
                className="text-lg text-gray-700 space-y-2"
                dangerouslySetInnerHTML={{ __html: project.whatwedo }}
              />
            </motion.div>

            {project.filepath && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {renderImage(project.filepath, "What We Do", "rounded-lg shadow-lg w-full", 600, 400)}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {project.images?.length > 0 && (
        <section className="overflow-x-hidden bg-gray-100 relative">
          <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Photo Gallery</h2>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.images.map((img, i) => (
                <motion.div
                  key={img.id || i}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  onClick={() => setPopupImgIndex(i)}
                  className="cursor-pointer overflow-hidden rounded-md aspect-square relative"
                >
                  {renderImage(img.imagepath, img.alt || img.title || `Gallery Image ${i}`, "object-cover rounded-md")}
                </motion.div>
              ))}
            </div>

            {/* Popup Modal */}
            {popupImgIndex !== null && (
              <div
                className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                onClick={() => setPopupImgIndex(null)}
              >
                {/* Close Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setPopupImgIndex(null); }}
                  className="absolute top-4 right-6 text-white text-3xl hover:text-red-400 cursor-pointer transition"
                >
                  &times;
                </button>

                {/* Left Arrow */}
                <button
                  onClick={(e) => { e.stopPropagation(); setPopupImgIndex(prev => (prev > 0 ? prev - 1 : prev)); }}
                  className="absolute left-4 text-white text-4xl hover:text-gray-300 cursor-pointer transition"
                >
                  &#10094;
                </button>

                {/* Image */}
                <div className="max-w-4xl w-full px-4">
                  {renderImage(
                    project.images[popupImgIndex].imagepath,
                    project.images[popupImgIndex].alt || `Gallery Image ${popupImgIndex}`,
                    "rounded-lg w-full h-auto object-contain max-h-[90vh]",
                    1200,
                    800
                  )}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={(e) => { e.stopPropagation(); setPopupImgIndex(prev => (prev < project.images.length - 1 ? prev + 1 : prev)); }}
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
      {project.videos?.length > 0 && (
        <section className="overflow-x-hidden bg-white">
          <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Video Gallery</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.videos.map((video, i) => {
                if (!video?.videourl) return null; // skip videos with no URL
                
                const isYouTube = video.videourl.includes('youtube.com');
                const embedUrl = isYouTube ? video.videourl.replace('watch?v=', 'embed/') : video.videourl;

                return (
                  <motion.div
                    key={video.id || i}
                    whileHover={{ scale: 1.02 }}
                    className="aspect-video overflow-hidden rounded-xl relative cursor-pointer bg-black flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    onClick={() => {
                      setCurrentMedia('video');
                      // open YouTube or local video in new tab
                      window.open(video.videourl, '_blank');
                    }}
                  >
                    {isYouTube ? (
                      <iframe
                        src={embedUrl}
                        title={video.title || `Video ${i}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="bg-black w-full h-full flex items-center justify-center">
                        <span className="text-white text-center px-2">
                          {video.title || `Video ${i}`}<br />
                          (Preview unavailable)
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Project Types */}
      {project.projecttypes?.length > 0 && (
        <section className="project-type overflow-x-hidden bg-gray-100 py-12">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Project Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.projecttypes.map((type) => {
                // Strip HTML tags and truncate to 80 characters
                const plainDescription = type.shortdescription
                  ? type.shortdescription.replace(/<\/?[^>]+(>|$)/g, "")
                  : "";
                const truncatedDescription = plainDescription.length > 80
                  ? plainDescription.slice(0, 77) + "..."
                  : plainDescription;

                return (
                  <Link 
                    href={`/projecttype/${type.id}`} 
                    key={type.id}
                    passHref
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col h-full"
                    >
                      {type.seo?.imagepath && (
                        renderImage(
                          type.seo.imagepath,
                          type.title,
                          "rounded-lg mb-4 w-full aspect-video object-cover",
                          400,
                          300
                        )
                      )}
                      <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                      <p className="text-gray-600 flex-1">{truncatedDescription}</p>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {project.faqs?.length > 0 && (
        <section className="overflow-x-hidden bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="mx-auto space-y-4">
              {project.faqs.map((faq, i) => (
                <motion.div
                  key={faq.id || i}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  layout
                >
                  <div 
                    className="cursor-pointer p-4"
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{faq.question}</span>
                      <motion.span
                        className="ml-2 text-gray-600"
                        animate={{ rotate: activeIndex === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▼
                      </motion.span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeIndex === i ? 1 : 0,
                      height: activeIndex === i ? 'auto' : 0
                    }}
                    transition={{ 
                      duration: 0.2,
                      opacity: { duration: 0.15 },
                      layout: { duration: 0.2 }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      <CTACollaboration />
    </>
  );
}