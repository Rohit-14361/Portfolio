"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "../../../utils/axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      // Fetching all projects and filtering since there is no /portfolio/:id endpoint
      const res = await api.get("/portfolio");
      const found = res.data.find((p) => p._id === id);
      setProject(found);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-black min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16 px-6 max-w-5xl mx-auto w-full text-white">
        <Link href="/" className="inline-block mb-8 text-zinc-400 hover:text-white transition-colors">
          ← Back to Portfolio
        </Link>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : !project ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-white mb-4">Project Not Found</h2>
            <p className="text-zinc-400">The project you're looking for doesn't exist.</p>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
            <div className="relative w-full bg-zinc-800">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full h-64 md:h-[400px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-5xl font-black">
                  Project
                </div>
              )}
            </div>

            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
              
              <div className="mb-8 flex flex-wrap gap-3">
                {project.techStack?.split(',').map((tech, idx) => (
                  <span key={idx} className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium">
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4">About the Project</h3>
                <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 border-t border-white/10 pt-8">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white text-black hover:bg-zinc-200 font-bold py-4 rounded-xl transition-colors text-lg"
                  >
                    View Live Project
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-colors text-lg"
                  >
                    View Source on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
