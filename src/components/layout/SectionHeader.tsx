import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
}

const SectionHeader = ({ title, subtitle, className, align = "center" }: SectionHeaderProps) => (
  <div className={cn("mb-12 sm:mb-16", align === "center" && "text-center", className)}>
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground text-balance opacity-0 animate-fade-up">
      {title}
    </h2>
    {subtitle && (
      <p
        className={cn(
          "mt-4 sm:mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed opacity-0 animate-fade-up",
          align === "center" && "max-w-xl mx-auto",
        )}
        style={{ animationDelay: "80ms" }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;
