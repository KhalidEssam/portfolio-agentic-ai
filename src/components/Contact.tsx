"use client";

import profileData from "@/data/profileData.json";
import { HiMail, HiPhone, HiGlobe, HiLocationMarker } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const { personal, socialLinks, availability } = profileData;

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Get in Touch
        </h2>
        <div className="w-20 h-1 bg-primary-500 mx-auto mb-4 rounded-full" />
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-lg mx-auto">
          I&apos;m currently{" "}
          <span className="text-primary-600 dark:text-primary-400 font-medium">
            {availability.status.toLowerCase()}
          </span>
          . Feel free to reach out!
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-4 p-5 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
              <HiMail className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {personal.email}
              </p>
            </div>
          </a>

          <a
            href={`tel:${personal.phone}`}
            className="flex items-center gap-4 p-5 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
              <HiPhone className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {personal.phone}
              </p>
            </div>
          </a>

          <a
            href={personal.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
              <HiGlobe className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Website
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {personal.website}
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4 p-5 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-100 dark:border-dark-border">
            <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
              <HiLocationMarker className="text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Location
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {personal.location}
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Find me online
          </p>
          <div className="flex items-center justify-center gap-6">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-card flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors text-xl"
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
                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-card flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors text-xl"
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
                className="w-12 h-12 rounded-full bg-gray-100 dark:bg-dark-card flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
