"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/Motion";
import { AppExternalButton } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import type { Project } from "@/types/portfolio";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="card p-7 h-full flex flex-col relative overflow-hidden"
      >
        <motion.div
          className="absolute top-0 left-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
          }}
          initial={{ width: 0 }}
          animate={{ width: "45%" }}
          transition={{ duration: 0.8, delay: index * 0.07 + 0.3 }}
        />

        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="tag">{project.category}</span>
            {project.featured && (
              <span
                className="tag"
                style={{
                  borderColor: `${project.accentColor}55`,
                  color: project.accentColor,
                }}
              >
                Öne Çıkan
              </span>
            )}
          </div>
          <span className="font-mono text-[0.7rem] text-subtle">{project.year}</span>
        </div>

        <h3 className="font-display font-bold text-xl tracking-tight text-text mb-3">{project.title}</h3>

        <p className="text-muted text-sm leading-relaxed flex-1 mb-5">{project.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-5">
          <motion.a
            href={project.github}
            whileHover={{ scale: 1.08 }}
            className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-text transition-colors no-underline"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={13} /> GitHub
          </motion.a>
          <motion.a
            href={project.link}
            whileHover={{ scale: 1.08 }}
            className="flex items-center gap-1.5 text-xs font-mono text-muted transition-colors no-underline"
            onMouseEnter={(event) => {
              event.currentTarget.style.color = project.accentColor;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = "var(--color-muted)";
            }}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={13} /> Canlı Demo
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const data = usePortfolioData();
  const [active, setActive] = useState("Tümü");

  if (!data) {
    return (
      <div className="min-h-screen px-5 md:px-8 pt-32 md:pt-36 pb-28 md:pb-32">
        <div className="max-w-5xl mx-auto text-muted">Veriler yükleniyor...</div>
      </div>
    );
  }

  const { personalInfo, projects, projectFilters } = data;

  useEffect(() => {
    if (!projectFilters.some((category) => category === active)) {
      setActive(projectFilters[0] ?? "Tümü");
    }
  }, [active, projectFilters]);

  const filtered = active === "Tümü" ? projects : projects.filter((project) => project.category === active);

  return (
    <div className="min-h-screen px-5 md:px-8 pt-32 md:pt-36 pb-28 md:pb-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="mb-12 md:mb-16">
            <SectionHeader
              title="Projelerim"
              subtitle="Geliştirdiğim projeler, open-source katkılar ve denemeler."
              className="max-w-md"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-12">
            {projectFilters.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActive(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={[
                  "px-5 py-2 rounded-full border text-sm font-display font-semibold cursor-pointer transition-all duration-250",
                  active === category
                    ? "border-accent bg-accent text-white"
                    : "border-subtle-2 bg-transparent text-muted hover:text-text",
                ].join(" ")}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </FadeIn>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-muted mb-5">Daha fazlası GitHub profilimde -&gt;</p>
          <AppExternalButton
            href={personalInfo.githubUrl}
            variant="ghost"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} /> GitHub'a Git <ArrowUpRight size={14} />
          </AppExternalButton>
        </motion.div>
      </div>
    </div>
  );
}
