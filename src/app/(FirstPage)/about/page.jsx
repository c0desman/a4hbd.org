import AboutPage from "@/components/about/AboutPage";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import TimelineSection from "@/components/about/TimelineSection";
import CTACollaboration from "@/components/reusable/CTACollaboration";


export default function About() {
  return (
    <div className="mx-auto bg-gray-100">
        <AboutPage />
        <MissionVisionSection />
        <TimelineSection />
        <CTACollaboration />
    </div>
  );
}
