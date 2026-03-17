"use client";

import profileData from "@/data/profileData.json";

export default function Experience() {
  const { experience, education } = profileData;

  return (
    <section
      id="experience"
      className="py-20 px-4 bg-gray-50 dark:bg-dark-card"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Experience
        </h2>
        <div className="w-20 h-1 bg-primary-500 mx-auto mb-12 rounded-full" />

        {/* Work Experience Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800" />

          {experience.map((exp, i) => (
            <div
              key={i}
              className={`relative mb-10 md:w-1/2 ${
                i % 2 === 0
                  ? "md:pr-12 md:ml-0"
                  : "md:pl-12 md:ml-auto"
              }`}
            >
              <div
                className={`absolute top-1 w-3 h-3 rounded-full bg-primary-500 border-4 border-white dark:border-dark-card ${
                  i % 2 === 0
                    ? "left-[10px] md:left-auto md:-right-[6.5px]"
                    : "left-[10px] md:-left-[6.5px]"
                }`}
              />

              <div className="ml-10 md:ml-0 bg-white dark:bg-dark-bg rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {exp.period}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {exp.role}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  {exp.company} &middot; {exp.location}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mt-20 mb-4">
          Education
        </h2>
        <div className="w-20 h-1 bg-primary-500 mx-auto mb-12 rounded-full" />

        {education.map((edu, i) => (
          <div
            key={i}
            className="bg-white dark:bg-dark-bg rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-border max-w-2xl mx-auto"
          >
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              {edu.period}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
              {edu.degree}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              {edu.institution}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {edu.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
