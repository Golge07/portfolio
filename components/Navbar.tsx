"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Mail, Phone } from "lucide-react";
import { AppButton, buttonClassName } from "@/components/ui/Button";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/projects", label: "Projelerim" },
  { href: "/cv", label: "CV" },
] as const;

export default function Navbar() {
  const data = usePortfolioData();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Sayfa değişince mobil menüyü kapat
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Modal açıkken sayfa kaydırma kilidi + ESC ile kapatma
  useEffect(() => {
    document.body.style.overflow = contactOpen ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [contactOpen]);

  const openContactModal = () => {
    setOpen(false);
    setContactOpen(true);
  };

  if (!data) {
    return null;
  }

  const { personalInfo } = data;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={[
          "fixed top-0 left-0 right-0 z-50 h-[72px]",
          "flex items-center justify-between px-5 md:px-8",
          "transition-all duration-500",
          scrolled ? "bg-bg/90 backdrop-blur-xl border-b border-border" : "border-b border-transparent",
        ].join(" ")}
      >
        <Link href="/" className="no-underline">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="font-display text-xl font-extrabold tracking-tight flex items-center gap-1"
          >
            <span className="gradient-text">{"<"}</span>
            <span className="text-text">dev</span>
            <span className="gradient-text">{"/>"}</span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="no-underline group">
              <span
                className={[
                  "nav-link",
                  pathname === link.href ? "text-text" : "hover:text-text",
                ].join(" ")}
              >
                {link.label}
                <span
                  className={[
                    "absolute -bottom-1 left-0 h-px bg-accent",
                    "transition-all duration-300",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full",
                  ].join(" ")}
                />
              </span>
            </Link>
          ))}

          <motion.button
            type="button"
            onClick={openContactModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={buttonClassName("primary", "text-sm px-5 py-2")}
          >
            İletişim
          </motion.button>
        </nav>

        <motion.button
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          className="md:hidden bg-transparent border-none text-text cursor-pointer p-2 rounded-lg"
          aria-label="Menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[72px] left-0 right-0 z-40 origin-top md:hidden"
            style={{ transformOrigin: "top" }}
          >
            <div className="mx-4 rounded-2xl bg-surface border border-border-2 overflow-hidden shadow-2xl">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "flex items-center justify-between",
                      "px-5 py-4 no-underline transition-colors duration-200",
                      "font-display text-sm font-semibold tracking-wide",
                      "border-b border-border last:border-b-0",
                      pathname === link.href
                        ? "text-accent bg-surface-2"
                        : "text-muted hover:text-text hover:bg-surface-2",
                    ].join(" ")}
                  >
                    {link.label}
                    {pathname === link.href && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </Link>
                </motion.div>
              ))}
              <div className="p-4">
                <AppButton type="button" className="w-full justify-center text-sm" onClick={openContactModal}>
                  İletişim
                </AppButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contactOpen && (
          <motion.div
            key="contact-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center px-4"
            onClick={() => setContactOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-md card p-6 md:p-7"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
            >
              <button
                type="button"
                onClick={() => setContactOpen(false)}
                className="absolute right-3 top-3 rounded-lg p-2 text-muted hover:text-text hover:bg-surface-2 transition-colors"
                aria-label="Kapat"
              >
                <X size={18} />
              </button>

              <div className="accent-line mb-4" />
              <h3
                id="contact-modal-title"
                className="font-display text-2xl font-extrabold tracking-tight mb-2"
              >
                İletişim
              </h3>
              <p className="text-muted text-sm mb-6">Bana ulaşmak için aşağıdaki kanalları kullanabilirsin.</p>

              <div className="space-y-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3 text-text no-underline hover:border-border-2 transition-colors"
                >
                  <span className="icon-box !w-9 !h-9 shrink-0">
                    <Mail size={16} />
                  </span>
                  <span className="text-sm md:text-base">{personalInfo.email}</span>
                </a>

                <a
                  href={`tel:${personalInfo.phone.replaceAll(" ", "")}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3 text-text no-underline hover:border-border-2 transition-colors"
                >
                  <span className="icon-box !w-9 !h-9 shrink-0">
                    <Phone size={16} />
                  </span>
                  <span className="text-sm md:text-base">{personalInfo.phone}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
