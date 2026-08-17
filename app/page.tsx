import AboutSection from "@/components/about";
import PlacementsSection from "@/components/companies";
import Courses from "@/components/courses";
import GallerySection from "@/components/gallery";
import HeroVideoSection from "@/components/Hero";
import LatestUpdatesSection from "@/components/latest-section";
import ManagementSection from "@/components/placement";
import TestimonialSection from "@/components/testimonial";
import WhyChooseSection from "@/components/whyChoose";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* <HeroVideoSection videoSrc="/test.mp4" /> */}
      <HeroVideoSection
        videoSrc="/home1.mp4"
        //   onMenuOpen={() => setMenuOpen(true)}
      />
      <LatestUpdatesSection />
      <Courses />
      <AboutSection />
      <GallerySection />
      <WhyChooseSection />
      <TestimonialSection />
      <PlacementsSection />
      <ManagementSection />
    </div>
  );
}
