import { motion } from "framer-motion";
import Image from "next/image";
import singleProject from "@/data/single-project";

export default function ProjectSingle() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white overflow-x-hidden">
        <div className="max-w-screen-xl mx-auto px-4 pt-36 lg:pt-44 pb-5 lg:pb-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="text-4xl lg:text-5xl font-bold mb-4"
          >
            {singleProject.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg max-w-2xl mx-auto"
          >
            {singleProject.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10"
          >
            <Image 
            src={singleProject.hero.image} 
            alt="Hero Image" 
            width={800} 
            height={450} 
            className="rounded-xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="overflow-x-hidden bg-cover bg-center" style={{ backgroundImage: "url(/images/gallery/objectives-bg.jpg)" }}>
        <div className="backdrop-brightness-90 max-w-screen-xl mx-auto px-4 pt-10 lg:pt-15 pb-5 lg:pb-8">
          <motion.p 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }}
            className="text-lg md:text-xl font-medium text-white text-justify"
          >
            {singleProject.importance}
          </motion.p>
        </div>
      </section>

      {/* What We Do Section */}
      {singleProject.whatWeDo && (
        <section className="overflow-x-hidden">
            <div className="max-w-screen-xl mx-auto px-4 pt-10 lg:pt-15 pb-5 lg:pb-8 grid md:grid-cols-2 gap-8 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold mb-4">
                {singleProject.whatWeDo.title}
                </h2>
                <p className="text-lg text-gray-700">
                {singleProject.whatWeDo.description}
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                {singleProject.whatWeDo.image && (
                <Image
                    src={singleProject.whatWeDo.image}
                    alt="What We Do"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                />
                )}
            </motion.div>
            </div>
        </section>
        )}

      {/* Photo Gallery */}
      <section className="overflow-x-hidden bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {singleProject.photoGallery.map((img, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <Image 
                    src={img} 
                    alt={`Gallery ${i}`} 
                    width={300} 
                    height={200} 
                    className="rounded-md cursor-pointer" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="overflow-x-hidden bg-white">
        <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
          <h2 className="text-2xl font-bold text-center mb-6">Video Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {singleProject.videoGallery.map((videoUrl, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="aspect-video overflow-hidden rounded-xl">
                <iframe
                  src={`${videoUrl}?controls=0`}
                  title={`Video ${i}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      {singleProject.types && singleProject.types.image && (
        <section className="overflow-x-hidden bg-cover bg-center" style={{ backgroundImage: "url(/images/gallery/objectives-bg.jpg)" }}>
            <div className="backdrop-brightness-95 max-w-screen-xl mx-auto px-4 pt-10 pb-8 grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <Image src={singleProject.types.image} alt="Project Type" width={500} height={400} className="rounded-xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold mb-4">{singleProject.types.title}</h2>
                <p>{singleProject.types.description}</p>
            </motion.div>
            </div>
        </section>
        )}

      {/* FAQ Section */}
        <section className="overflow-x-hidden bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 pt-10 pb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
            {singleProject.faq.map((faq, i) => (
                <motion.div 
                key={i} 
                className="bg-white p-4 rounded shadow-md"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                >
                <details>
                    <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                    <p className="mt-2 text-gray-700">{faq.answer}</p>
                </details>
                </motion.div>
            ))}
            </div>
        </div>
        </section>
    </>
  );
}
