import ActionSection from "@/components/homepage/ActionSection";
import ContactForm from "@/components/homepage/ContactForm";
import FeatureSection from "@/components/homepage/FeatureSection";
import BannerSection from "@/components/homepage/HomeBanner";
import TestimonialSlider from "@/components/homepage/TestiMonialSlider";

export const metadata = {
  title: "Home : Work Manager",
};

export default function Home() {
  return (
    <div>
      <BannerSection />
      <FeatureSection />
      <ActionSection />
      <TestimonialSlider />
      <ContactForm />
    </div>
  );
}
