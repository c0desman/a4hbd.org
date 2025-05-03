"use client";

import CTACollaboration from "@/components/reusable/CTACollaboration";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const partners = [
  {
    name: "Sourire d'Orphalines",
    logo: "/images/partners/sourirdorphaline.png",
    projects: [
      "Orphan Sponsorship",
      "Mosque Building",
      "Ablution Construction",
      "Water Well",
    ],
  },
  {
    name: "Association Salsabil",
    logo: "/images/partners/salsabil.png",
    projects: [
      "Water Well",
      "Zakaat Al Maal Project",
      "Food Pack Distribution",
    ],
  },
  {
    name: "Plenitude France",
    logo: "/images/partners/plenitude.png",
    projects: [
      "Mosque Building",
      "Water Well Drilling",
      "Ramadan Iftar Project",
    ],
  },
  {
    name: "Amanaty",
    logo: "/images/partners/amanaty.png",
    projects: [
      "Sadaqah Project",
      "Teacher's Sponsorship Project",
      "Madrasha Construction",
    ],
  },
  {
    name: "Let Your Heart Speak ASBL",
    logo: "/images/partners/asbl.png",
    projects: [
      "Orphan Sponsoring",
      "Orphanage Home Construction",
    ],
  },
  {
    name: "El Habib-ONG",
    logo: "/images/partners/habibONG.png",
    projects: [
      "Education",
      "Orphan Sponsoring",
      "Hot Meal Project",
    ],
  },
  {
    name: "MHM-Hlife",
    logo: "/images/partners/mhm-hife.png",
    projects: [
      "Water Well",
      "Zakaat Al Maal Project",
      "Food Pack Distribution",
      "Building Mosque",
    ],
  },
];

const testimonials = [
    {
      name: "Sourire d'Orphalines",
      quote:
        "We are honored to work with Aid For Humanity. Their dedication to orphans and building mosques is deeply inspiring.",
      logo: "/images/partners/sourirdorphaline.png",
    },
    {
      name: "Plenitude France",
      quote:
        "Together, we’ve created lasting change. From water wells to iftar meals, their impact is undeniable.",
      logo: "/images/partners/plenitude.png",
    },
    {
      name: "Let Your Heart Speak ASBL",
      quote:
        "Our partnership has brought joy and safety to orphan children. Their commitment is genuine and effective.",
      logo: "/images/partners/asbl.png",
    },
    {
      name: "El Habib-ONG",
      quote:
        "Aid For Humanity’s efforts in education and hot meals have deeply impacted communities. We’re proud collaborators.",
      logo: "/images/partners/habibONG.png",
    },
  ];

export default function HowWeWork() {
  return (
    <div className="w-full overflow-x-hidden bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 text-white">
        <div className="max-w-screen-xl mx-auto px-4 pt-36 lg:pt-44 pb-5 lg:pb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Our Partners & <span className="live-gradient">Collaborators</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-300 max-w-3xl mx-auto font-bold">
            We are proud to collaborate with a diverse range of partners who
            share our vision for a better future. Our partners are various
            dedicated non-profits organizations, all working together to create
            impactful solutions.
          </p>
        </div>
      </section>

      {/* Partners Section */}
      <section className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-24 h-24 mb-4">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {partner.name}
              </h4>
              <p className="text-sm text-gray-600 font-medium">
                <span className="font-semibold text-gray-800">
                  Collaborated Projects:
                </span>{" "}
                {partner.projects.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Make A Testimonials Section */}
      {/* Testimonials Section */}
        <section className="py-16 bg-[url(/images/gallery/objectives-bg.jpg)] bg-cover bg-top bg-no-repeat">
        <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
            What Our Partners Say
            </h2>
            <TestimonialsCarousel />
        </div>
        </section>
      {/* Call to Action Section */}
      <CTACollaboration />
    </div>
  );
}


export function TestimonialsCarousel() {
    return (
      <div className="relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            el: ".testimonial-caresoul",
            clickable: true,
          }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="max-w-5xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center text-center px-4 sm:px-8 lg:px-24">
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={testimonial.logo}
                    alt={testimonial.name}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <p className="text-lg italic text-gray-700 max-w-2xl mb-4">
                  {testimonial.quote}
                </p>
                <h4 className="text-md font-semibold text-gray-800">
                  {testimonial.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
  
        {/* Custom pagination dots container */}
        <div className="testimonial-caresoul flex justify-center mt-4" />
      </div>
    );
  }