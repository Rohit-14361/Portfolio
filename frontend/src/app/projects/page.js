"use client";

import Navbar from "../components/Navbar";
import ProjectSection from "../components/ProjectSection";
import Footer from "../components/Footer";

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-12 pb-24">
        <ProjectSection />
      </div>
      <Footer />
    </main>
  );
}
