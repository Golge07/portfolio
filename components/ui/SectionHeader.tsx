interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className="accent-line mb-4" />
      <h2 className="font-display font-extrabold tracking-tight text-[clamp(1.8rem,4vw,3rem)]">
        {title}
      </h2>
      {subtitle && <p className="text-muted mt-3 text-sm md:text-base">{subtitle}</p>}
    </div>
  );
}
