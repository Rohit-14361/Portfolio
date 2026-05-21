"use client";

import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Link from "next/link";
import Image from "next/image";

export default function ProjectsSection({ limit }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/portfolio");
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 text-white" id="projects">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-6">
          Featured Projects
        </h2>
        {limit && (
          <Link 
            href="/projects" 
            className="inline-block bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
          >
            Explore All Projects →
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project) => (
          <div
            key={project._id}
            className="rounded-[2rem] border border-white/10 bg-white/5 overflow-hidden flex flex-col"
          >
            <div className="relative h-52 w-full bg-zinc-800">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-3xl font-black">
                  Project
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow items-center text-center">
              <h3 className="text-2xl font-bold mb-4">
                {project.title}
              </h3>
              
              <div className="mb-6 flex flex-wrap justify-center gap-2">
                {project.techStack?.split(',').map((tech, idx) => (
                  <span key={idx} className="text-xs font-medium bg-white/10 text-white px-3 py-1.5 rounded-full">
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <div className="mt-auto w-full pt-4 border-t border-white/10">
                <Link
                  href={`/project/${project._id}`}
                  className="block w-full bg-white text-black hover:bg-zinc-200 font-bold py-3 rounded-xl transition-colors text-center"
                >
                  Explore Project
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
