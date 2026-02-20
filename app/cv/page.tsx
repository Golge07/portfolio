"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Download, MapPin, Mail, Globe, Briefcase, GraduationCap, Code } from "lucide-react";
import { FadeIn, ScrollReveal } from "@/components/Motion";
import { AppExternalButton } from "@/components/ui/Button";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import type { Skill } from "@/types/portfolio";

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="icon-box">{icon}</div>
      <h2 className="font-display font-bold text-xl tracking-tight">{label}</h2>
    </div>
  );
}

function TimelineItem({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="pl-6 relative mb-8 last:mb-0"
    >
      <div className="timeline-line" />
      <div className="timeline-dot absolute -left-1 top-1" />
      {children}
    </motion.div>
  );
}

function SkillBar({ label, level, delay }: Skill & { delay: number }) {
  const [animated, setAnimated] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setAnimated(true)}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="mb-5"
    >
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-text">{label}</span>
        <span className="font-mono text-xs text-accent">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: animated ? `${level}%` : "0%" }} />
      </div>
    </motion.div>
  );
}

export default function CVPage() {
  const data = usePortfolioData();

  if (!data) {
    return (
      <div className="min-h-screen px-5 md:px-8 pt-32 md:pt-36 pb-28 md:pb-32">
        <div className="max-w-5xl mx-auto text-muted">Veriler yükleniyor...</div>
      </div>
    );
  }

  const { personalInfo, experience, education, skills, languages } = data;
  const cvDownloadUrl =
    personalInfo.cvPdfUrl && personalInfo.cvPdfUrl !== "#" ? personalInfo.cvPdfUrl : "/cv.pdf";

  return (
    <div className="min-h-screen px-5 md:px-8 pt-32 md:pt-36 pb-28 md:pb-32">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="flex justify-between items-start flex-wrap gap-6 mb-12 md:mb-16">
            <div>
              <div className="accent-line mb-4" />
              <h1 className="font-display font-extrabold tracking-tight leading-[1.05] mb-3 text-[clamp(2.2rem,6vw,5rem)]">
                {personalInfo.name} <span className="gradient-text">-</span>
              </h1>
              <p className="font-display text-lg md:text-xl text-muted font-medium mb-5">{personalInfo.role}</p>

              <div className="flex flex-wrap gap-5">
                {[
                  { icon: <MapPin size={14} />, text: personalInfo.location },
                  { icon: <Mail size={14} />, text: personalInfo.email },
                  { icon: <Globe size={14} />, text: personalInfo.website },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-muted text-sm">
                    <span className="text-accent">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <AppExternalButton
              href={cvDownloadUrl}
              download
              className="self-start"
            >
              <Download size={16} /> CV İndir (PDF)
            </AppExternalButton>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="flex flex-col gap-6">
            <ScrollReveal>
              <div className="card p-8">
                <SectionTitle icon={<Briefcase size={18} />} label="Deneyim" />
                {experience.map((exp, index) => (
                  <TimelineItem key={index} delay={index * 0.1}>
                    <div className="flex justify-between flex-wrap gap-2 mb-1">
                      <h3 className="font-display font-bold text-lg">{exp.role}</h3>
                      <span className="font-mono text-xs text-accent">{exp.period}</span>
                    </div>
                    <p className="text-accent-2 text-sm mb-2">{exp.company}</p>
                    <p className="text-muted text-sm leading-relaxed mb-3">{exp.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TimelineItem>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="card p-8">
                <SectionTitle icon={<GraduationCap size={18} />} label="Eğitim" />
                {education.map((edu, index) => (
                  <TimelineItem key={index} delay={index * 0.1}>
                    <div className="flex justify-between flex-wrap gap-2 mb-1">
                      <h3 className="font-display font-bold text-lg">{edu.degree}</h3>
                      <span className="font-mono text-xs text-accent">{edu.period}</span>
                    </div>
                    <p className="text-accent-2 text-sm mb-2">{edu.school}</p>
                    <p className="text-muted text-sm leading-relaxed">{edu.desc}</p>
                  </TimelineItem>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="card p-7"
            >
              <SectionTitle icon={<Code size={18} />} label="Yetenekler" />
              {skills.map((skill, index) => (
                <SkillBar key={skill.label} {...skill} delay={index * 0.08} />
              ))}
            </motion.div>

            <ScrollReveal delay={0.2}>
              <div className="card p-7">
                <h2 className="font-display font-bold text-lg mb-6">Diller</h2>
                <div className="flex flex-col">
                  {languages.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-3 border-b border-subtle last:border-b-0"
                    >
                      <span className="text-sm">{item.lang}</span>
                      <span className="font-mono text-xs text-muted">{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
