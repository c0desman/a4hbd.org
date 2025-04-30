import AboutUsSection from "@/components/home/AboutUsSection";
import HelpfulCardsSection from "@/components/home/HelpfulCardsSelection";
import HeroSection from "@/components/home/HeroSection";
import ProjectSection from "@/components/home/ProjectSection";
import AchievementSection from "@/components/home/AchievementSection";
import CTACollaboration from "@/components/home/CTAcollaboration";

export default function Home() {
  return (
    <div className="mx-auto bg-gray-100">
      <HeroSection />
      <HelpfulCardsSection />
      <AboutUsSection />
      <AchievementSection />
      <ProjectSection />
      <CTACollaboration />
    </div>
  );
}
