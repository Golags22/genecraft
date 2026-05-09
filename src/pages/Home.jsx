import Whatsapp from "../components/Whatsapp";
import { Partiners } from "../sections/about";
import { AboutSection, CallToAction, FeaturedCourses, Hero, Testimonials } from "../sections/home";

export default function Home() {
  return (
    <div>
     <Hero />
      <AboutSection />
     <FeaturedCourses />
     <Testimonials />
     <CallToAction />
     <Partiners />
     <Whatsapp />
    </div>
  );
}


