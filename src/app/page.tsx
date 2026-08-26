import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundFX from "@/components/layout/BackgroundFX";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Achievements from "@/components/sections/Achievements";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import BlogTeaser from "@/components/sections/BlogTeaser";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <BackgroundFX />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Certifications />
        <Achievements />
        <Gallery />
        <Testimonials />
        <BlogTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
