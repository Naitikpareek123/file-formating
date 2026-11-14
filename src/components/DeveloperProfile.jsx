import React, { useState } from 'react';
import { Bot, Workflow, GraduationCap, Sparkles, ExternalLink } from 'lucide-react';
import naitikPhoto from '../assets/naitik.jpg';

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function DeveloperProfile() {
  const [imgError, setImgError] = useState(false);

  return (
    <footer className="no-print mt-12 mb-6 border-t border-slate-200/80 pt-8 pb-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Profile Card styled to match app's light emerald / slate theme */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
          {/* Subtle decorative glowing background accents */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-100/40 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
            {/* Avatar / Photo with vibrant gradient border ring */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 p-[2.5px] shadow-md shadow-emerald-500/15">
                <div className="w-full h-full bg-slate-50 rounded-[14px] overflow-hidden flex items-center justify-center">
                  {!imgError ? (
                    <img
                      src={naitikPhoto}
                      alt="Naitik Pareek"
                      width="96"
                      height="96"
                      loading="lazy"
                      decoding="async"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      NP
                    </span>
                  )}
                </div>
              </div>
              <span
                className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs"
                title="Active"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      Naitik Pareek
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Developer
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                    n8n Automation Engineer &bull; AI, ML &amp; Data Science Student
                  </p>
                </div>

                {/* GitHub link button */}
                <a
                  href="https://github.com/Naitikpareek123"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Naitik Pareek GitHub Profile"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-all active:scale-95 shrink-0 self-center sm:self-start"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-300" />
                </a>
              </div>

              {/* Bio summary */}
              <p className="text-xs sm:text-[13px] text-slate-600 max-w-2xl leading-relaxed mb-4">
                Specialized in building seamless n8n automation pipelines, developing machine learning &amp; artificial intelligence applications, and engineering user-friendly data solutions.
              </p>

              {/* Skill & Specialty Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50/80 border border-indigo-200/80 text-indigo-700 text-xs font-medium">
                  <Workflow className="w-3.5 h-3.5 text-indigo-600" />
                  <span>n8n Automation Engineer</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-emerald-700 text-xs font-medium">
                  <Bot className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Machine Learning (ML) &amp; AI</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50/80 border border-purple-200/80 text-purple-700 text-xs font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                  <span>Data Science (DS)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Rights Reserved Line */}
        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-slate-800">Naitik Pareek</span>. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Excel Print Studio &bull; Precision Auto-Formatter for India Post &amp; Business Reports
          </p>
        </div>
      </div>
    </footer>
  );
}
