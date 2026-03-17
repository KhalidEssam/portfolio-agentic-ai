"use client";

import profileData from "@/data/profileData.json";

const categoryIcons: Record<string, string> = {
  Frontend: "🎨",
  Backend: "⚙️",
  "AI/ML": "🤖",
  DevOps: "☁️",
  Tools: "🛠️",
};

export default function Skills() {
  const { skills } = profileData;

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-dark-card">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Skills & Technologies
        </h2>
        <div className="w-20 h-1 bg-primary-500 mx-auto mb-12 rounded-full" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="bg-white dark:bg-dark-bg rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-border"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>{categoryIcons[category] ?? "📦"}</span>
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900/30 dark:hover:text-primary-300 transition-colors"
                  >
                    {skill}
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
