import Navbar           from "@/components/Navbar";
import Hero             from "@/components/Hero";
import About            from "@/components/About";
import Founder          from "@/components/Founder";
import Skills           from "@/components/Skills";
import Projects         from "@/components/Projects";
import Experience       from "@/components/Experience";
import Contact          from "@/components/Contact";
import Footer           from "@/components/Footer";
import ChatWidget       from "@/components/ChatWidget";
import ScrollProgressPill from "@/components/ui/ScrollProgressPill";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Founder />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <ScrollProgressPill />
    </>
  );
}
