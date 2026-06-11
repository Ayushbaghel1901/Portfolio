import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import TechStack from "@/components/site/TechStack";
import Projects from "@/components/site/Projects";
import Education from "@/components/site/Education";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import Admin from "@/pages/Admin";
import { AnimatedBackground, ScrollProgress } from "@/components/site/BackgroundFx";
import ResumeModal from "@/components/site/ResumeModal";
import { ResumeModalProvider } from "@/lib/ResumeModalContext";

function Portfolio() {
  return (
    <ResumeModalProvider>
      <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
        <ScrollProgress />
        <AnimatedBackground />
        <div className="grain-overlay" />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
        <ResumeModal />
      </div>
    </ResumeModalProvider>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#0e0e0e",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff",
            },
          }}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
