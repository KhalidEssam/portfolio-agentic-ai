"use client";

import profileData from "@/data/profileData.json";
import { HiLocationMarker, HiBriefcase, HiAcademicCap } from "react-icons/hi";

export default function About() {
  const { personal, availability, languages, certifications } = profileData;

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          About Me
        </h2>
        <div className="w-20 h-1 bg-primary-500 mx-auto mb-12 rounded-full" />

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {personal.summary}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <HiLocationMarker className="text-primary-500 text-xl flex-shrink-0" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <HiBriefcase className="text-primary-500 text-xl flex-shrink-0" />
                <span>
                  {availability.status} &middot;{" "}
                  {availability.remote ? "Remote OK" : "On-site only"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <HiAcademicCap className="text-primary-500 text-xl flex-shrink-0" />
                <span>
                  {languages
                    .map((l) => `${l.language} (${l.proficiency})`)
                    .join(", ")}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Certifications
            </h3>
            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {cert}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Looking For
            </h3>
            <div className="flex flex-wrap gap-2">
              {availability.preferredRoles.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
