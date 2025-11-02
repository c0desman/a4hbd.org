import AboutUsSection from "@/components/home/AboutUsSection";
import HelpfulCardsSection from "@/components/home/HelpfulCardsSelection";
import HeroCarousel from "@/components/home/HeroCarousel";
import ProjectSection from "@/components/home/ProjectSection";
import AchievementSection from "@/components/home/AchievementSection";
import CTACollaboration from "@/components/reusable/CTACollaboration";
import ProjectsAppeal from "@/components/home/projectsAppeal";

export default function Home() {
  return (
    <div className="mx-auto bg-gray-100">
      {/* <HeroSection /> */}
      <HeroCarousel />
      {/* <HelpfulCardsSection /> */}
      <AboutUsSection />
      <AchievementSection />
      {/* <ProjectSection /> */}
      <ProjectsAppeal />
      <CTACollaboration />
    </div>
  );
}
