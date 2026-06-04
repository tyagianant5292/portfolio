import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Classic scroll-based view, kept as an alternative to the terminal home page.
export default function ClassicPage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Awards />
      <Contact />
      <Footer />
    </main>
  );
}
