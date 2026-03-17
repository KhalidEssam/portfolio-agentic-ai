"use client";

import profileData from "@/data/profileData.json";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  const { projects } = profileData;

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Featured Projects
        </h2>
        <div className="w-20 h-1 bg-primary-500 mx-auto mb-12 rounded-full" />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-dark-border"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.name}
                </h3>
                <div className="flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                      aria-label={`${project.name} source code`}
                    >
                      <FaGithub className="text-xl" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                      aria-label={`${project.name} live demo`}
                    >
                      <FaExternalLinkAlt className="text-lg" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-md text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
