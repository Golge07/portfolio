"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Code2,
  Server,
  Database,
  Layers,
  ExternalLink,
} from "lucide-react";
import { FadeIn, ScrollReveal } from "@/components/Motion";
import { AppLinkButton } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePortfolioData } from "@/hooks/usePortfolioData";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}

interface StatCardProps {
  number: string;
  label: string;
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="gradient-text font-display text-5xl font-extrabold leading-none">{number}</div>
      <div className="text-muted text-sm mt-1.5">{label}</div>
    </div>
  );
}

function ServiceCard({ icon, title, desc, delay }: ServiceCardProps) {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        className="card p-8 h-full flex flex-col gap-5 cursor-default"
      >
        <div className="icon-box">{icon}</div>
        <h3 className="font-display text-lg font-bold text-text">{title}</h3>
        <p className="text-muted text-sm leading-relaxed">{desc}</p>
      </motion.div>
    </ScrollReveal>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ x: -3 }}
      className="text-subtle hover:text-accent transition-colors duration-200"
      target="_blank"
      rel="noreferrer"
    >
      {icon}
    </motion.a>
  );
}

export default function Home() {
  const data = usePortfolioData();
  if (!data) {
    return (
      <div className="min-h-screen px-5 md:px-10 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-muted">Veriler yükleniyor...</div>
      </div>
    );
  }

  const { projects } = data;
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-5 md:px-10 pt-28 pb-16 overflow-hidden"
      >
        <motion.div
          className="glow-orb w-150 h-150 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-4xl w-full text-center z-10"
        >
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-subtle-2 bg-surface mb-8">
              <span className="status-dot" />
              <span className="font-mono text-xs text-muted">Açık pozisyonlara bakıyorum</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h1 className="font-extrabold leading-[1.08] tracking-tight mb-6 text-[clamp(2.4rem,6vw,5.5rem)]">
              <span className="block font-body font-light text-[clamp(1rem,2.5vw,1.4rem)] tracking-[0.18em] uppercase text-muted mb-3">
                Merhaba, ben
              </span>
              <span className="font-display block gradient-text">Full Stack</span>
              <span className="font-display block text-text">Developer</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 px-2 md:px-0">
              Modern web uygulamaları tasarlıyor ve geliştiriyorum. Frontend&apos;den backend&apos;e,
              tasarımdan deploy&apos;a kadar her adımda çözüm üretiyorum.
            </p>
          </FadeIn>

          <FadeIn delay={0.55}>
            <div className="flex gap-4 justify-center flex-wrap mb-14">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <AppLinkButton href="/projects">
                  Projelerimi Gör <ArrowRight size={16} />
                </AppLinkButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <AppLinkButton href="/cv" variant="ghost">
                  CV İncele
                </AppLinkButton>
              </motion.div>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"].map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-5 z-10"
        >
          <SocialLink href="#" icon={<Github size={18} />} />
          <SocialLink href="#" icon={<Linkedin size={18} />} />
          <SocialLink href="#" icon={<Twitter size={18} />} />
          <div className="w-px h-16 bg-linear-to-b from-subtle to-transparent" />
        </motion.div>
      </section>

      <section className="px-5 md:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="card p-7 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <StatCard number="5+" label="Yıl Deneyim" />
              <StatCard number="40+" label="Tamamlanan Proje" />
              <StatCard number="20+" label="Mutlu Müşteri" />
              <StatCard number="∞" label="Kahve Bardağı" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-5 md:px-8 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              title="Ne Yapıyorum?"
              subtitle="Fikirden ürüne, tasarımdan sunucuya kadar uçtan uca çözümler üretiyorum."
              className="mb-12"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <ServiceCard
              delay={0.1}
              icon={<Code2 size={20} />}
              title="Frontend Geliştirme"
              desc="React, Next.js ve TypeScript ile modern, hızlı ve erişilebilir kullanıcı arayüzleri."
            />
            <ServiceCard
              delay={0.2}
              icon={<Server size={20} />}
              title="Backend ve API"
              desc="Node.js, Express, Fastify ve NestJS ile ölçeklenebilir REST ve GraphQL API'ları."
            />
            <ServiceCard
              delay={0.3}
              icon={<Database size={20} />}
              title="Veritabanı Tasarımı"
              desc="PostgreSQL, MongoDB ve Redis ile sağlam veri modelleri ve optimizasyon."
            />
            <ServiceCard
              delay={0.4}
              icon={<Layers size={20} />}
              title="DevOps ve Cloud"
              desc="Docker, CI/CD ve AWS/Vercel ile güvenilir deployment pipeline'ları."
            />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-16 md:py-20 pb-28 md:pb-32">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <SectionHeader title="Öne Çıkan Proje" className="mb-10" />
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="card p-7 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div>
                <span className="tag mb-5">{featuredProject?.category ?? "Full Stack"}</span>
                <h3 className="font-display font-extrabold tracking-tight text-[1.9rem] leading-tight mb-4">
                  {featuredProject?.title ?? "Öne Çıkan Proje"}
                </h3>
                <p className="text-muted leading-relaxed mb-6 text-sm">
                  {featuredProject?.desc ?? "Proje bilgisi JSON dosyasından okunamadı."}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {(featuredProject?.tags ?? []).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <AppLinkButton href="/projects">
                    Tüm Projeleri Gör <ExternalLink size={14} />
                  </AppLinkButton>
                </motion.div>
              </div>

              <div className="rounded-xl overflow-hidden aspect-video bg-surface-2 border border-subtle flex items-center justify-center">
                <div className="w-4/5 flex flex-col gap-3">
                  {[100, 70, 85, 55, 90].map((w, i) => (
                    <motion.div
                      key={i}
                      className={[
                        "h-1.5 rounded-full",
                        i % 2 === 0 ? "bg-linear-to-r from-accent to-accent-2" : "bg-border-2",
                      ].join(" ")}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${w}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
