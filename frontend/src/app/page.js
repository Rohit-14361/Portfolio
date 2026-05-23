"use client";

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServiceSection from "./components/ServiceSection";
import ProjectSection from "./components/ProjectSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import OurTeamSection from "./components/OurTeamSection";
import FeedbackSection from "./components/FeedbackSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <ServiceSection limit={3} />
      <ProjectSection />

      <OurTeamSection />
      <FeedbackSection />

      <ContactSection />
      <Footer />
    </main>
  );
}



