"use client";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import profileData from "@/data/profileData.json";

export default function Hero() {
  const { personal, socialLinks } = profileData;

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-purple-500/10 dark:from-primary-900/20 dark:to-purple-900/20" />

      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
        <div className="mb-6">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-white dark:bg-dark-bg flex items-center justify-center text-4xl font-bold text-primary-600 dark:text-primary-400">
              {personal.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
            {personal.name}
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          {personal.title}
        </p>

        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          {personal.summary.split(".")[0]}.
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <a
            href="#contact"
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors"
          >
            Get in Touch
          </a>
          <a
            href="#projects"
            className="px-8 py-3 border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 rounded-full font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            View Projects
          </a>
        </div>

        <div className="flex items-center justify-center gap-6">
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors text-2xl"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors text-2xl"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors text-2xl"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          )}
        </div>

        <button
          onClick={scrollToAbout}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 hover:text-primary-500 transition-colors animate-bounce-slow"
          aria-label="Scroll down"
        >
          <HiArrowDown className="text-3xl" />
        </button>
      </div>
    </section>
  );
}
